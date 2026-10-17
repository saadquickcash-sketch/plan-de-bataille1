/* ===== Brio — Mesure d'audience (respectueuse de la vie privée) =====
 * -----------------------------------------------------------------------
 * Enregistre l'USAGE du site pour le propriétaire (saad.quickcash) :
 *   • temps actif passé sur chaque onglet (page),
 *   • pages vues, nouveau vs visiteur récurrent,
 *   • appareil / système / navigateur, taille d'écran, langue, fuseau,
 *   • provenance (référent) et — si l'élève est CONNECTÉ — son compte
 *     (nom + e-mail qu'il a lui-même fournis).
 *
 * Ce que ce script NE collecte PAS : aucun numéro de téléphone, aucune
 * adresse, aucune géolocalisation précise, aucune donnée que le visiteur
 * n'a pas fournie. Le suivi est pseudonyme (identifiant aléatoire local)
 * tant que la personne ne se connecte pas.
 *
 * Tout est enveloppé dans des try/catch : en cas de souci, la page
 * continue de fonctionner normalement (et hors-ligne).
 * -----------------------------------------------------------------------*/
(function () {
  'use strict';
  try {
    if (window.__PB_ANALYTICS__) return; window.__PB_ANALYTICS__ = 1;

    var LS = { visitor: 'pb_vid', visitorMeta: 'pb_vmeta' };
    var page = (window.PB_PAGE && window.PB_PAGE.id) || (location.pathname.replace(/[^a-z0-9]/gi, '') || 'index');
    var pageLabel = (window.PB_PAGE && window.PB_PAGE.label) || document.title || page;

    /* ---------- identifiant visiteur pseudonyme (pas une identité) ---------- */
    function uuid() {
      try { if (crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
      return 'v-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
    }
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

    var visitorId = lsGet(LS.visitor);
    var isNewVisitor = false;
    if (!visitorId) { visitorId = uuid(); lsSet(LS.visitor, visitorId); isNewVisitor = true; }
    var sessionId = uuid();

    /* ---------- contexte technique (ce que le navigateur expose) ---------- */
    function detect() {
      var ua = navigator.userAgent || '';
      var mobile = /Mobi|Android|iPhone|iPod/i.test(ua);
      var tablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
      var device = tablet ? 'Tablette' : (mobile ? 'Mobile' : 'Ordinateur');
      var os = 'Autre';
      if (/Windows/i.test(ua)) os = 'Windows';
      else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
      else if (/Mac OS X/i.test(ua)) os = 'macOS';
      else if (/Android/i.test(ua)) os = 'Android';
      else if (/Linux/i.test(ua)) os = 'Linux';
      var br = 'Autre';
      if (/Edg\//i.test(ua)) br = 'Edge';
      else if (/OPR\/|Opera/i.test(ua)) br = 'Opera';
      else if (/SamsungBrowser/i.test(ua)) br = 'Samsung';
      else if (/Chrome\//i.test(ua)) br = 'Chrome';
      else if (/Firefox\//i.test(ua)) br = 'Firefox';
      else if (/Safari\//i.test(ua)) br = 'Safari';
      var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
      var standalone = false;
      try { standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true; } catch (e) {}
      var ref = '';
      try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
      if (ref && /(^|\.)(plan-de-bataille1\.pages\.dev|localhost)$/i.test(ref)) ref = '';
      return {
        device: device, os: os, browser: br,
        lang: (navigator.language || '').slice(0, 5),
        tz: tz,
        screen: (function () { try { return (screen.width || 0) + '×' + (screen.height || 0); } catch (e) { return ''; } })(),
        pwa: !!standalone,
        referrer: ref || 'direct'
      };
    }
    var ctx = detect();

    /* ---------- chrono du temps ACTIF sur cet onglet ---------- */
    var activeMs = 0, lastTick = Date.now(), visible = (document.visibilityState !== 'hidden');
    function tickAccumulate() {
      var now = Date.now();
      if (visible) activeMs += Math.min(now - lastTick, 60000); // garde-fou : max 60s par intervalle
      lastTick = now;
    }
    function onVis() {
      tickAccumulate();
      visible = (document.visibilityState !== 'hidden');
      lastTick = Date.now();
      if (!visible) flush('hidden'); else scheduleFlush();
    }
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('blur', function () { tickAccumulate(); visible = false; });
    window.addEventListener('focus', function () { visible = (document.visibilityState !== 'hidden'); lastTick = Date.now(); });

    function activeSeconds() { tickAccumulate(); return Math.round(activeMs / 1000); }

    /* ---------- écriture Firestore (si comptes activés) ---------- */
    var db = null, FV = null, authUser = null, wrote0 = false, flushT = null, lastWrite = 0;
    function tryInitDB() {
      try {
        if (db) return true;
        if (typeof firebase === 'undefined' || !firebase.firestore) return false;
        var cfg = window.FIREBASE_CONFIG || {};
        if (!cfg.apiKey || String(cfg.apiKey).indexOf('VOTRE_') === 0) return false;
        try { if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(cfg); } catch (e) {}
        db = firebase.firestore();
        try { FV = firebase.firestore.FieldValue; } catch (e) {}
        try {
          firebase.auth().onAuthStateChanged(function (u) {
            authUser = u || null;
            // dès qu'on connaît l'identité, on relie la session au compte
            if (authUser) flush('auth');
          });
        } catch (e) {}
        return true;
      } catch (e) { return false; }
    }

    function identity() {
      if (!authUser) return { signedIn: false };
      return {
        signedIn: true,
        uid: authUser.uid || '',
        email: (authUser.email || '').toLowerCase(),
        name: authUser.displayName || '',
        photo: authUser.photoURL || ''
      };
    }

    function flush(reason) {
      try {
        if (!tryInitDB()) return;
        var secs = activeSeconds();
        var now = Date.now();
        // anti-spam d'écritures : au plus 1 écriture / 12s (sauf fermeture/masquage/auth)
        if (reason === 'interval' && (now - lastWrite) < 12000) return;
        lastWrite = now;
        var id = identity();

        /* --- document de session (une ligne par visite) --- */
        var sess = {
          visitorId: visitorId,
          page: page, pageLabel: pageLabel,
          activeSec: secs,
          device: ctx.device, os: ctx.os, browser: ctx.browser,
          lang: ctx.lang, tz: ctx.tz, screen: ctx.screen, pwa: ctx.pwa,
          referrer: ctx.referrer,
          signedIn: id.signedIn,
          updatedAt: now
        };
        if (!wrote0) { sess.startedAt = now; sess.startedAtTs = FV ? FV.serverTimestamp() : now; }
        if (id.signedIn) { sess.uid = id.uid; sess.email = id.email; sess.name = id.name; sess.photo = id.photo; }
        db.collection('analytics_sessions').doc(sessionId).set(sess, { merge: true });

        /* --- document agrégé par visiteur (pour un tableau de bord rapide) --- */
        var deltaSec = secs - (flush._lastSecs || 0); flush._lastSecs = secs;
        if (deltaSec < 0) deltaSec = 0;
        var vdoc = {
          visitorId: visitorId,
          lastSeen: now,
          lastPage: pageLabel,
          device: ctx.device, os: ctx.os, browser: ctx.browser,
          lang: ctx.lang, tz: ctx.tz, screen: ctx.screen, pwa: ctx.pwa,
          referrer: ctx.referrer,
          signedIn: id.signedIn
        };
        if (!wrote0) { vdoc.firstSeen = isNewVisitor ? now : (Number(lsGet('pb_vfirst')) || now); if (isNewVisitor) lsSet('pb_vfirst', String(now)); }
        if (id.signedIn) { vdoc.uid = id.uid; vdoc.email = id.email; vdoc.name = id.name; vdoc.photo = id.photo; }
        if (FV) {
          if (deltaSec > 0) {
            vdoc.totalSec = FV.increment(deltaSec);
            vdoc.perPageSec = {}; vdoc.perPageSec[page] = FV.increment(deltaSec);
            vdoc.perPageLabel = {}; vdoc.perPageLabel[page] = pageLabel;
          }
          if (!wrote0) {
            vdoc.sessions = FV.increment(1);
            vdoc.perPageViews = {}; vdoc.perPageViews[page] = FV.increment(1);
          }
        }
        db.collection('analytics_visitors').doc(visitorId).set(vdoc, { merge: true });

        wrote0 = true;
      } catch (e) { /* silencieux : ne jamais gêner l'élève */ }
    }

    function scheduleFlush() {
      try { if (flushT) clearTimeout(flushT); flushT = setTimeout(function () { flush('interval'); scheduleFlush(); }, 15000); } catch (e) {}
    }

    /* premier enregistrement rapide (vue de page), puis périodique */
    function boot() { flush('start'); scheduleFlush(); }
    if (typeof firebase !== 'undefined') boot();
    else { var tries = 0, iv = setInterval(function () { tries++; if (typeof firebase !== 'undefined' || tries > 20) { clearInterval(iv); boot(); } }, 300); }

    /* à la fermeture / au changement de page : on sauvegarde le temps final */
    window.addEventListener('pagehide', function () { flush('pagehide'); });
    window.addEventListener('beforeunload', function () { flush('unload'); });

    /* petite API de confort pour marquer un usage de fonctionnalité (facultatif) */
    window.PB_track = function (eventName) {
      try {
        if (!tryInitDB() || !eventName) return;
        var payload = { lastSeen: Date.now() };
        if (FV) { var ev = {}; ev[String(eventName).replace(/[^\w-]/g, '_')] = FV.increment(1); payload.events = ev; }
        db.collection('analytics_visitors').doc(visitorId).set(payload, { merge: true });
      } catch (e) {}
    };
  } catch (e) { /* analytics ne doit jamais casser le site */ }
})();
