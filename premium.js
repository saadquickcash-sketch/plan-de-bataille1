/* ===== Brio — Moteur Premium (plan, quota, codes, upsell) ===== */
/* Fichier autonome : définit window.PB_plan, window.PB_quota, window.PB_redeemCode,
   window.PB_isPremium, window.PB_showUpsell, window.PB_premiumGate. Chargé avant app.js. */
(function(){
  var FREE_LIMIT = (typeof window!=='undefined' && window.PB_FREE_LIMIT) ? window.PB_FREE_LIMIT : 3; // messages IA / jour (gratuit)
  var PRICE = (typeof window!=='undefined' && window.PB_PRICE) ? window.PB_PRICE : '49 DH / mois';

  /* ---------- utilitaires purs (testables) ---------- */
  function normalizeCode(c){ return String(c==null?'':c).toUpperCase().replace(/[^A-Z0-9]/g,''); }
  function today(){ var d=new Date(); return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); }
  function planActive(plan, now){ now=now||Date.now(); if(!plan||plan.plan!=='premium') return false; return (!plan.until || plan.until===0 || plan.until>now); }
  // décide le résultat d'un code (logique pure) : renvoie {error} ou {days,newUntil,mark}
  function computeRedeem(codeDoc, uid, now, currentUntil){
    if(!codeDoc) return {error:'Code introuvable. Vérifie les lettres et réessaie.'};
    if(codeDoc.usedBy && codeDoc.usedBy!==uid) return {error:'Ce code a déjà été utilisé sur un autre compte.'};
    if(codeDoc.active===false && (!codeDoc.usedBy || codeDoc.usedBy!==uid)) return {error:'Ce code n’est plus valable.'};
    var days = Number(codeDoc.days || (codeDoc.months?codeDoc.months*30:0) || 0);
    if(!(days>0)) return {error:'Ce code est invalide (durée manquante).'};
    var base = Math.max(now, Number(currentUntil||0)||0); // prolonge si déjà premium
    var newUntil = base + days*86400000;
    return { days:days, newUntil:newUntil, mark:{ usedBy:uid, usedAt:now, active:false } };
  }
  function quotaCheck(q, limit, now){ // q = {date, used}; renvoie {allowed, used, left, limit}
    var d = today();
    if(!q || q.date!==d){ q={date:d, used:0}; }
    var left = Math.max(0, limit - q.used);
    return { allowed: q.used < limit, used:q.used, left:left, limit:limit, state:q };
  }

  /* ---------- export node pour tests (avant le code navigateur) ---------- */
  if(typeof module!=='undefined' && module.exports){ module.exports={ normalizeCode:normalizeCode, planActive:planActive, computeRedeem:computeRedeem, quotaCheck:quotaCheck }; }
  if(typeof window==='undefined') return;

  /* ---------- côté navigateur (localStorage + sync) ---------- */
  function lsGet(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } }
  function lsSet(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

  var PLAN_KEY='pb_plan', QUOTA_KEY='pb_quota';

  window.PB_plan = {
    getAll:function(){ var p=lsGet(PLAN_KEY)||{plan:'free',until:0}; if(p.plan!=='premium'){ p.plan='free'; } return p; },
    setAll:function(o){ if(o&&typeof o==='object'){ lsSet(PLAN_KEY, o); try{ updateBadges(); }catch(e){} try{ window.dispatchEvent(new CustomEvent('pb-plan',{detail:o})); }catch(e){} } },
    isPremium:function(){ return planActive(this.getAll(), Date.now()); },
    setPremiumUntil:function(until, code){ var o={plan:'premium', until:until||0, since:Date.now(), code:code||''}; this.setAll(o); if(window.PB_onPlanChange){ try{ window.PB_onPlanChange(o); }catch(e){} } return o; },
    reset:function(){ var o={plan:'free',until:0}; this.setAll(o); if(window.PB_onPlanChange){ try{ window.PB_onPlanChange(o); }catch(e){} } return o; }
  };
  window.PB_isPremium = function(){ try{ if(typeof window.PB_isAdmin==='function' && window.PB_isAdmin()) return true; }catch(e){} return window.PB_plan.isPremium(); };

  window.PB_quota = {
    freeLimit:function(){ return FREE_LIMIT; },
    _get:function(){ return lsGet(QUOTA_KEY)||{date:'',used:0}; },
    check:function(){ if(window.PB_plan.isPremium()) return {allowed:true, used:0, left:Infinity, limit:Infinity, premium:true}; var r=quotaCheck(this._get(), FREE_LIMIT); lsSet(QUOTA_KEY, r.state); return r; },
    inc:function(){ if(window.PB_plan.isPremium()) return; var r=quotaCheck(this._get(), FREE_LIMIT); r.state.used=(r.state.used||0)+1; lsSet(QUOTA_KEY, r.state); if(window.PB_onQuotaChange){ try{ window.PB_onQuotaChange(r.state); }catch(e){} } return r.state; },
    remaining:function(){ if(window.PB_plan.isPremium()) return Infinity; return this.check().left; }
  };

  /* ---------- échange d'un code (Firestore) ---------- */
  window.PB_redeemCode = function(rawCode){
    return new Promise(function(resolve){
      var code = normalizeCode(rawCode);
      if(code.length<4){ resolve({ok:false, error:'Entre un code valide.'}); return; }
      var fb = (typeof firebase!=='undefined') ? firebase : null;
      if(!fb || !fb.firestore){ resolve({ok:false, error:'Les codes nécessitent la connexion des comptes (Firebase).'}); return; }
      var user = null; try{ user = fb.auth().currentUser; }catch(e){}
      if(!user){ resolve({ok:false, error:'Connecte-toi d’abord (bouton « Compte »), puis entre ton code.'}); return; }
      var db = fb.firestore();
      var ref = db.collection('premium_codes').doc(code);
      var uid = user.uid, now = Date.now();
      var curUntil = 0; try{ curUntil = Number(window.PB_plan.getAll().until||0)||0; }catch(e){}
      db.runTransaction(function(tx){
        return tx.get(ref).then(function(snap){
          var doc = snap.exists ? snap.data() : null;
          var res = computeRedeem(doc, uid, now, curUntil);
          if(res.error){ throw new Error(res.error); }
          tx.update(ref, res.mark);
          return res;
        });
      }).then(function(res){
        window.PB_plan.setPremiumUntil(res.newUntil, code);
        resolve({ok:true, days:res.days, until:res.newUntil});
      }).catch(function(err){
        resolve({ok:false, error:(err&&err.message)?err.message:'Impossible de valider le code.'});
      });
    });
  };

  /* ---------- porte premium (gate) + upsell ---------- */
  window.PB_premiumGate = function(featureLabel){
    if(window.PB_plan.isPremium()) return true;
    window.PB_showUpsell(featureLabel||'');
    return false;
  };

  function fmtDate(ms){ try{ var d=new Date(ms); return d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}); }catch(e){ return ''; } }

  /* ---------- fenêtre d'incitation (upsell) ---------- */
  function ensurePremCss(){ if(!document.getElementById('pbPremCss')){ var st=document.createElement('style'); st.id='pbPremCss'; st.textContent=PREM_CSS; document.head.appendChild(st); } }
  var upsellEl=null;
  function ensureUpsell(){
    if(upsellEl) return upsellEl;
    ensurePremCss();
    var w=document.createElement('div'); w.className='pbu-back'; w.hidden=true;
    w.innerHTML='<div class="pbu-card" role="dialog" aria-modal="true">'
      +'<button class="pbu-x" aria-label="Fermer">&times;</button>'
      +'<div class="pbu-crown">★</div>'
      +'<h3 class="pbu-h">Passe à <b>Premium</b></h3>'
      +'<p class="pbu-sub" id="pbuReason">Débloque toute la puissance de ton tuteur.</p>'
      +'<ul class="pbu-list">'
      +'<li><span>⚡</span> Une IA <b>beaucoup plus puissante</b> (raisonnement, maths, corrections)</li>'
      +'<li><span>∞</span> Messages <b>illimités</b> — aucune limite quotidienne</li>'
      +'<li><span>🎯</span> Priorité, réponses plus longues et plus fiables</li>'
      +'<li><span>📚</span> Accès aux futures fonctions premium (examens, coach)</li>'
      +'</ul>'
      +'<a class="pbu-cta" href="premium.html">Voir Premium →</a>'
      +'<button class="pbu-later">Plus tard</button>'
      +'</div>';
    document.body.appendChild(w);
    function close(){ w.hidden=true; }
    w.addEventListener('click', function(e){ if(e.target===w) close(); });
    w.querySelector('.pbu-x').addEventListener('click', close);
    w.querySelector('.pbu-later').addEventListener('click', close);
    upsellEl=w; return w;
  }
  window.PB_showUpsell = function(reason){
    try{
      var w=ensureUpsell(); var r=w.querySelector('#pbuReason');
      if(reason==='limit'){ r.textContent='Tu as atteint ta limite gratuite du jour ('+FREE_LIMIT+' messages). Passe Premium pour continuer sans limite.'; }
      else if(reason){ r.textContent='« '+reason+' » est une fonction Premium.'; }
      else { r.textContent='Débloque toute la puissance de ton tuteur.'; }
      w.hidden=false;
    }catch(e){}
  };

  /* ---------- badges premium dans l'interface ---------- */
  function updateBadges(){
    try{ ensurePremCss(); }catch(e){}
    var prem = window.PB_plan.isPremium();
    // pastille dans la barre de compte
    var lbl=document.getElementById('acctLabel');
    document.querySelectorAll('.pb-prem-chip').forEach(function(c){ c.remove(); });
    if(prem){
      var nav=document.querySelector('.sitenav .in');
      if(nav && !nav.querySelector('.pb-prem-chip')){ var chip=document.createElement('span'); chip.className='pb-prem-chip'; chip.textContent='★ Premium'; chip.title='Compte Premium actif'; var sp=nav.querySelector('.sp'); if(sp) nav.insertBefore(chip, sp); else nav.appendChild(chip); }
    }
    // statut dans la fenêtre premium
    var stat=document.getElementById('pbPlanStatus');
    if(stat){ var p=window.PB_plan.getAll();
      if(prem){ stat.className='pb-status on'; stat.innerHTML='★ <b>Premium actif</b>'+(p.until?(' — jusqu’au '+fmtDate(p.until)):' (à vie)'); }
      else { stat.className='pb-status'; stat.innerHTML='Tu es en formule <b>Gratuite</b>. Entre un code ou choisis Premium pour tout débloquer.'; }
    }
    var rem=document.getElementById('pbQuotaLine');
    if(rem){ if(prem){ rem.textContent='Messages illimités ★'; } else { var c=window.PB_quota.check(); rem.textContent='Messages gratuits restants aujourd’hui : '+c.left+' / '+c.limit; } }
  }
  window.PB_updatePremiumBadges = updateBadges;

  /* ---------- Échecs & Éditeur de code = Premium (ou admin) ---------- */
  function isToolAllowed(){
    try{ if(window.PB_plan && window.PB_plan.isPremium()) return true; }catch(e){}
    try{ if(typeof window.PB_isAdmin==='function' && window.PB_isAdmin()) return true; }catch(e){}
    return false;
  }
  function ensureLock(){ if(document.getElementById('pbLockOv')) return; try{ ensurePremCss(); }catch(e){}
    var d=document.createElement('div'); d.id='pbLockOv'; d.className='pb-lockov';
    d.innerHTML='<div class="pb-lockcard"><div class="pb-lockic">🔒</div><h2>Fonctionnalité Premium</h2>'
      +'<p>Les Échecs et l’Éditeur de code sont réservés aux membres Premium. Débloque-les — avec l’IA puissante et les messages illimités.</p>'
      +'<a class="pb-lockbtn" href="premium.html">★ Voir Premium</a>'
      +'<a class="pb-lockback" href="index.html">← Retour à l’accueil</a></div>';
    document.body.appendChild(d);
  }
  function removeLock(){ var d=document.getElementById('pbLockOv'); if(d) d.remove(); }
  window.PB_applyLocks=function(){
    var ok=isToolAllowed();
    try{ Array.prototype.forEach.call(document.querySelectorAll('a[href="echecs.html"],a[href="code.html"]'),function(a){ a.style.display = ok?'':'none'; }); }catch(e){}
    var pid=(window.PB_PAGE&&window.PB_PAGE.id)||'';
    if(pid==='echecs'||pid==='code'){ if(ok) removeLock(); else ensureLock(); }
  };
  if(typeof window!=='undefined'){
    window.addEventListener('pb-plan', function(){ try{ window.PB_applyLocks(); }catch(e){} });
    window.addEventListener('pb-admin', function(){ try{ window.PB_applyLocks(); }catch(e){} });
  }

  var PREM_CSS = ''
    +'.pbu-back{position:fixed;inset:0;z-index:2147483600;background:rgba(18,16,28,.62);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:20px}'
    +'.pbu-card{position:relative;max-width:400px;width:100%;background:var(--card,#fff);color:var(--text,#1a1830);border:1px solid var(--border,#e6e3f0);border-radius:20px;padding:26px 24px 20px;box-shadow:0 24px 70px rgba(20,14,50,.4);text-align:center;font-family:inherit}'
    +'.pbu-x{position:absolute;top:12px;right:14px;border:0;background:transparent;font-size:1.5rem;line-height:1;color:var(--muted,#8a86a0);cursor:pointer}'
    +'.pbu-crown{font-size:2.2rem;color:#eab308;line-height:1}'
    +'.pbu-h{margin:6px 0 4px;font-size:1.35rem;font-weight:800}'
    +'.pbu-sub{margin:0 0 14px;color:var(--muted,#6b6880);font-size:.92rem;line-height:1.45}'
    +'.pbu-list{list-style:none;margin:0 0 18px;padding:0;text-align:left}'
    +'.pbu-list li{display:flex;gap:10px;align-items:flex-start;padding:7px 0;font-size:.9rem;line-height:1.4;border-bottom:1px solid var(--border,#eee)}'
    +'.pbu-list li:last-child{border-bottom:0}.pbu-list li span{flex:none;width:22px;text-align:center}'
    +'.pbu-cta{display:block;text-decoration:none;text-align:center;background:linear-gradient(135deg,#6c5ce7,#4b3fa7);color:#fff;font-weight:800;padding:13px;border-radius:12px;font-size:1rem;box-shadow:0 8px 22px rgba(108,92,231,.4)}'
    +'.pbu-cta:hover{filter:brightness(1.07)}'
    +'.pbu-later{display:block;width:100%;margin-top:8px;border:0;background:transparent;color:var(--muted,#8a86a0);cursor:pointer;font-size:.85rem;padding:6px}'
    +'.pb-prem-chip{display:inline-flex;align-items:center;gap:4px;background:linear-gradient(135deg,#eab308,#f59e0b);color:#3a2c00;font-weight:800;font-size:.72rem;padding:4px 10px;border-radius:20px;margin:0 6px;letter-spacing:.02em;white-space:nowrap}'
    +'.pb-status{padding:12px 14px;border-radius:12px;background:var(--card,#f6f5fb);border:1px solid var(--border,#e6e3f0);font-size:.92rem;margin:0 0 16px}'
    +'.pb-status.on{background:linear-gradient(135deg,rgba(234,179,8,.14),rgba(245,158,11,.08));border-color:rgba(234,179,8,.5)}'
    +'.lnk-prem{color:#eab308!important;font-weight:700}'
    +'.auth-prem{display:block;text-align:center;text-decoration:none;background:linear-gradient(135deg,#eab308,#f59e0b);color:#3a2c00;font-weight:800;padding:11px;border-radius:11px;margin:4px 0 12px;font-size:.9rem}'
    +'.auth-prem:hover{filter:brightness(1.05)}'
    +'.auth-admin{display:block;text-align:center;text-decoration:none;background:#4b3fa7;color:#fff;font-weight:700;padding:10px;border-radius:11px;margin:0 0 12px;font-size:.88rem}'
    +'.auth-admin:hover{filter:brightness(1.1)}'
    +'.pb-lockov{position:fixed;inset:0;z-index:60;background:var(--bg,#f4f3f8);display:flex;align-items:center;justify-content:center;padding:22px}'
    +'.pb-lockcard{max-width:440px;width:100%;text-align:center;background:var(--surface,#fff);border:1px solid var(--border,#e6e3f0);border-radius:20px;padding:34px 26px;box-shadow:0 20px 60px rgba(20,14,50,.18)}'
    +'.pb-lockic{font-size:2.6rem;line-height:1}'
    +'.pb-lockcard h2{font-family:Newsreader,serif;font-size:1.5rem;margin:12px 0 8px;color:var(--text,#211f2b)}'
    +'.pb-lockcard p{color:var(--muted,#6b6880);font-size:.95rem;line-height:1.6;margin:0 0 20px}'
    +'.pb-lockbtn{display:block;text-decoration:none;background:linear-gradient(135deg,#6c5ce7,#4b3fa7);color:#fff;font-weight:800;padding:13px;border-radius:12px;font-size:1rem;box-shadow:0 8px 22px rgba(108,92,231,.35)}'
    +'.pb-lockbtn:hover{filter:brightness(1.07)}'
    +'.pb-lockback{display:inline-block;margin-top:12px;color:var(--muted,#8a86a0);text-decoration:none;font-size:.86rem;font-weight:600}'
    +'.pb-lockback:hover{color:var(--royal,#4a3ea0)}';

  // initialisation quand le DOM est prêt
  function pbInit(){ try{ updateBadges(); }catch(e){} try{ window.PB_applyLocks(); }catch(e){} }
  if(typeof document!=='undefined'){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', pbInit);
    else pbInit();
  }

})();

/* ---------- tests (node) ---------- */
if(typeof module!=='undefined' && require.main===module){
  var m=module.exports, assert=require('assert'), ok=0; function T(n,c){ try{c();ok++;}catch(e){ console.error('FAIL '+n+': '+e.message); process.exitCode=1; } }
  T('normalizeCode', function(){ assert.equal(m.normalizeCode(' saad-2026 '),'SAAD2026'); assert.equal(m.normalizeCode('ab@#cd'),'ABCD'); });
  T('planActive', function(){ var now=1000000; assert.equal(m.planActive({plan:'premium',until:now+1},now),true); assert.equal(m.planActive({plan:'premium',until:now-1},now),false); assert.equal(m.planActive({plan:'premium',until:0},now),true); assert.equal(m.planActive({plan:'free',until:0},now),false); });
  T('computeRedeem ok', function(){ var r=m.computeRedeem({days:30,active:true,usedBy:null}, 'u1', 1000, 0); assert.equal(r.error,undefined); assert.equal(r.days,30); assert.equal(r.newUntil,1000+30*86400000); assert.equal(r.mark.usedBy,'u1'); assert.equal(r.mark.active,false); });
  T('computeRedeem extends existing premium', function(){ var now=5000, cur=now+10*86400000; var r=m.computeRedeem({months:1,active:true}, 'u1', now, cur); assert.equal(r.days,30); assert.equal(r.newUntil, cur+30*86400000); });
  T('computeRedeem missing/used', function(){ assert(m.computeRedeem(null,'u1',1,0).error); assert(m.computeRedeem({days:30,usedBy:'other'},'u1',1,0).error); assert(m.computeRedeem({days:30,active:false,usedBy:null},'u1',1,0).error); assert(m.computeRedeem({active:true},'u1',1,0).error); });
  T('computeRedeem same user idempotent-ish', function(){ var r=m.computeRedeem({days:30,active:false,usedBy:'u1'}, 'u1', 1000, 0); assert.equal(r.error,undefined); assert.equal(r.days,30); });
  T('quotaCheck resets by day + counts', function(){ var r=m.quotaCheck({date:'2000-01-01',used:99}, 25); assert.equal(r.used,0); assert.equal(r.allowed,true); var r2=m.quotaCheck(r.state,25); r2.state.used=25; var r3=m.quotaCheck(r2.state,25); assert.equal(r3.allowed,false); assert.equal(r3.left,0); });
  console.log('OK '+ok+' tests');
}

/* ===== Indicateur d'IA : badge permanent dans l'en-tête du chat ===== */
(function(){
  if(typeof window==='undefined' || typeof document==='undefined') return;
  function label(){
    if(window.PB_LAST_AI==='premium') return {t:'⚡ IA Premium (avancée)', ok:true};
    if(window.PB_LAST_AI==='free') return {t:'💬 IA gratuite', ok:false};
    var prem=false; try{ prem=!!(window.PB_isPremium && window.PB_isPremium()); }catch(e){}
    return prem ? {t:'⚡ IA Premium (avancée)', ok:true} : {t:'💬 IA gratuite', ok:false};
  }
  function paint(){
    try{
      var info=label();
      var heads=document.querySelectorAll('.cp-head h3, .cf-brand');
      for(var i=0;i<heads.length;i++){
        var h=heads[i], b=h.querySelector('.pb-aibadge');
        if(!b){ b=document.createElement('span'); b.className='pb-aibadge'; h.appendChild(b); }
        b.textContent=info.t;
        b.style.cssText='display:inline-block;margin-left:8px;padding:2px 9px;border-radius:20px;font:700 11px system-ui,-apple-system,sans-serif;vertical-align:middle;white-space:nowrap;color:'+(info.ok?'#fff':'#3a3a44')+';background:'+(info.ok?'linear-gradient(135deg,#7c5cff,#4b3fa7)':'#e6e3f0');
      }
    }catch(e){}
  }
  window.PB_paintAiBadge=paint;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', paint); else paint();
  window.addEventListener('pb-plan', paint);
  window.addEventListener('pb-admin', paint);
  setInterval(paint, 1500);
})();
