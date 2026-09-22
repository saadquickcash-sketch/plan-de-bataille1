/* ===== Comptes (Firebase Auth + Firestore) — Brio ===== */
(function(){
  var CFG = window.FIREBASE_CONFIG || {};
  function ok(v){ return v && String(v).indexOf('VOTRE_')!==0; }
  var configured = ok(CFG.apiKey) && ok(CFG.projectId);
  // ▶ Compte ADMIN (propriétaire) : le bouton « Générer des codes » n'apparaît que pour cet e-mail.
  var ADMIN_EMAIL = (window.PB_ADMIN_EMAIL || 'saad.quickcash@gmail.com').toLowerCase();
  var acctBtn=document.getElementById('acctBtn'), modal=document.getElementById('authModal');
  var forms=document.getElementById('authForms'), profile=document.getElementById('authProfile'), setup=document.getElementById('authSetup');
  function openModal(){ if(modal) modal.hidden=false; }
  function closeModal(){ if(modal) modal.hidden=true; }
  if(acctBtn) acctBtn.addEventListener('click', openModal);
  var xb=document.getElementById('authClose'); if(xb) xb.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', function(e){ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&modal&&!modal.hidden) closeModal(); });

  if(typeof firebase==='undefined' || !configured){
    if(forms) forms.hidden=true; if(profile) profile.hidden=true; if(setup) setup.hidden=false;
    return;
  }
  try{ firebase.initializeApp(CFG); }catch(e){}
  var auth=firebase.auth(), db=firebase.firestore();
  try{ auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); }catch(e){}
  window.PB_isAdmin=function(){ try{ var u=auth.currentUser; return !!(u && (u.email||'').toLowerCase()===ADMIN_EMAIL); }catch(e){ return false; } };

  var msg=document.getElementById('authMsg');
  function showMsg(t,good){ if(!msg)return; msg.textContent=t||''; msg.className='auth-msg'+(t?(good?' ok':' err'):''); }
  var mode='login';
  var nameWrap=document.getElementById('nameWrap'), resetBtn=document.getElementById('authReset'), submit=document.getElementById('authSubmit');
  document.querySelectorAll('.auth-tab').forEach(function(t){ t.addEventListener('click',function(){
    mode=t.getAttribute('data-tab'); document.querySelectorAll('.auth-tab').forEach(function(x){x.classList.toggle('on',x===t);});
    if(nameWrap) nameWrap.hidden=(mode!=='signup'); if(resetBtn) resetBtn.hidden=(mode!=='login');
    if(submit) submit.textContent=(mode==='signup'?'Créer mon compte':'Se connecter'); showMsg('');
  }); });
  function humanErr(e){ var c=(e&&e.code)||'';
    if(c.indexOf('email-already-in-use')>=0) return "Cet e-mail a déjà un compte. Connecte-toi plutôt.";
    if(c.indexOf('invalid-email')>=0) return "Adresse e-mail invalide.";
    if(c.indexOf('weak-password')>=0) return "Mot de passe trop court (6 caractères minimum).";
    if(c.indexOf('wrong-password')>=0||c.indexOf('invalid-credential')>=0||c.indexOf('invalid-login')>=0) return "E-mail ou mot de passe incorrect.";
    if(c.indexOf('user-not-found')>=0) return "Aucun compte pour cet e-mail.";
    if(c.indexOf('too-many-requests')>=0) return "Trop d'essais. Réessaie dans un moment.";
    if(c.indexOf('popup-closed')>=0||c.indexOf('cancelled-popup')>=0) return "Fenêtre Google fermée avant la fin.";
    if(c.indexOf('operation-not-allowed')>=0) return "Ce mode de connexion n'est pas activé dans Firebase (Authentication → Sign-in method).";
    if(c.indexOf('unauthorized-domain')>=0) return "Domaine non autorisé : ajoute ton domaine Netlify dans Firebase (Authentication → Settings → Authorized domains).";
    return (e&&e.message)||"Une erreur est survenue.";
  }
  if(submit) submit.addEventListener('click', function(){
    var email=((document.getElementById('authEmail')||{}).value||'').trim();
    var pass=(document.getElementById('authPass')||{}).value||'';
    var name=((document.getElementById('authName')||{}).value||'').trim();
    if(!email||!pass){ showMsg("Remplis l'e-mail et le mot de passe."); return; }
    submit.disabled=true; showMsg('Un instant…');
    var pr = (mode==='signup')
      ? auth.createUserWithEmailAndPassword(email,pass).then(function(cred){ if(name&&cred.user) return cred.user.updateProfile({displayName:name}); })
      : auth.signInWithEmailAndPassword(email,pass);
    pr.then(function(){ showMsg(''); closeModal(); }).catch(function(e){ showMsg(humanErr(e)); }).then(function(){ submit.disabled=false; });
  });
  var gbtn=document.getElementById('authGoogle');
  if(gbtn) gbtn.addEventListener('click', function(){
    var provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(){ closeModal(); }).catch(function(e){ showMsg(humanErr(e)); });
  });
  if(resetBtn) resetBtn.addEventListener('click', function(){
    var email=((document.getElementById('authEmail')||{}).value||'').trim();
    if(!email){ showMsg("Entre ton e-mail pour recevoir le lien."); return; }
    auth.sendPasswordResetEmail(email).then(function(){ showMsg("E-mail de réinitialisation envoyé.",true); }).catch(function(e){ showMsg(humanErr(e)); });
  });
  var lo=document.getElementById('authLogout'); if(lo) lo.addEventListener('click', function(){ auth.signOut(); });

  function docRef(uid){ return db.collection('users').doc(uid); }
  auth.onAuthStateChanged(function(user){
    if(user){
      if(forms) forms.hidden=true; if(profile) profile.hidden=false; if(setup) setup.hidden=true;
      var nm=user.displayName||(user.email?user.email.split('@')[0]:'Élève');
      window.PB_USERNAME=nm;
      var initial=(nm[0]||'E').toUpperCase();
      var pn=document.getElementById('profName'); if(pn) pn.textContent=nm;
      var pe=document.getElementById('profEmail'); if(pe) pe.textContent=user.email||'';
      var pa=document.getElementById('profAv'); if(pa) pa.textContent=initial;
      var av=document.getElementById('acctAv'); if(av){ av.textContent=initial; av.classList.add('on'); }
      var lbl=document.getElementById('acctLabel'); if(lbl) lbl.textContent=nm.split(' ')[0];
      var cfu=document.getElementById('cfUser'); if(cfu) cfu.textContent=nm+' · connecté';
      var isAdmin=(user.email||'').toLowerCase()===ADMIN_EMAIL;
      var adm=document.getElementById('authAdmin'); if(adm) adm.hidden=!isAdmin;
      try{ window.dispatchEvent(new CustomEvent('pb-admin')); }catch(e){}
      try{ if(window.PB_applyLocks) window.PB_applyLocks(); }catch(e){}
      docRef(user.uid).get().then(function(snap){
        var d=snap.exists?snap.data():null;
        if(d && Array.isArray(d.convos) && d.convos.length && window.PB_chat && window.PB_chat.setAll){ window.PB_chat.setAll(d.convos); }
        else if(window.PB_chat && window.PB_chat.getAll){ var local=window.PB_chat.getAll(); if(local&&local.length){ docRef(user.uid).set({convos:local.slice(0,40),updatedAt:Date.now(),email:user.email||''},{merge:true}); } }
        if(d && Array.isArray(d.pages) && d.pages.length && window.PB_pages && window.PB_pages.setAll){ window.PB_pages.setAll(d.pages); }
        else if(window.PB_pages && window.PB_pages.getAll){ var lp=window.PB_pages.getAll(); if(lp&&lp.length){ docRef(user.uid).set({pages:lp.slice(0,60),updatedAt:Date.now()},{merge:true}); } }
        if(d && d.profile && typeof d.profile==='object' && window.PB_profile && window.PB_profile.setAll){ window.PB_profile.setAll(d.profile); }
        else if(window.PB_profile && window.PB_profile.getAll){ var pf=window.PB_profile.getAll(); if(pf && Object.keys(pf).length){ docRef(user.uid).set({profile:pf,updatedAt:Date.now()},{merge:true}); } }
        if(d && d.custom && typeof d.custom==='object' && window.PB_custom && window.PB_custom.setAll){ window.PB_custom.setAll(d.custom); }
        else if(window.PB_custom && window.PB_custom.getAll){ var cu=window.PB_custom.getAll(); if(cu && Object.keys(cu).length){ docRef(user.uid).set({custom:cu,updatedAt:Date.now()},{merge:true}); } }
        if(window.PB_plan){ var remote=d && d.plan && typeof d.plan==='object' ? d.plan : null; var localp=window.PB_plan.getAll();
          var rActive=remote && remote.plan==='premium' && (!remote.until || remote.until>Date.now());
          var lActive=localp && localp.plan==='premium' && (!localp.until || localp.until>Date.now());
          // garde la formule la plus avantageuse (celle qui expire le plus tard)
          if(rActive && (!lActive || (Number(remote.until||0)>=Number(localp.until||0)))){ window.PB_plan.setAll(remote); }
          else if(lActive){ docRef(user.uid).set({plan:localp,updatedAt:Date.now()},{merge:true}); }
          try{ if(window.PB_updatePremiumBadges) window.PB_updatePremiumBadges(); }catch(e){}
        }
      }).catch(function(){});
      window.PB_onPlanChange=function(pl){ docRef(user.uid).set({plan:pl,updatedAt:Date.now()},{merge:true}).catch(function(){}); };
      window.PB_onChatChange=function(cv){ docRef(user.uid).set({convos:cv,updatedAt:Date.now(),email:user.email||''},{merge:true}).catch(function(){}); };
      window.PB_onPagesChange=function(pg){ docRef(user.uid).set({pages:pg.slice(0,60),updatedAt:Date.now()},{merge:true}).catch(function(){}); };
      window.PB_onProfileChange=function(pf){ docRef(user.uid).set({profile:pf,updatedAt:Date.now()},{merge:true}).catch(function(){}); };
      window.PB_onCustomChange=function(cu){ docRef(user.uid).set({custom:cu,updatedAt:Date.now()},{merge:true}).catch(function(){}); };
    } else {
      window.PB_onChatChange=null; window.PB_onPagesChange=null; window.PB_onProfileChange=null; window.PB_onCustomChange=null; window.PB_onPlanChange=null; window.PB_USERNAME=null;
      if(forms) forms.hidden=false; if(profile) profile.hidden=true; if(setup) setup.hidden=true;
      var av=document.getElementById('acctAv'); if(av){ av.textContent='\u{1F464}'; av.classList.remove('on'); }
      var lbl=document.getElementById('acctLabel'); if(lbl) lbl.textContent='Compte';
      var adm=document.getElementById('authAdmin'); if(adm) adm.hidden=true;
      try{ window.dispatchEvent(new CustomEvent('pb-admin')); }catch(e){}
      try{ if(window.PB_applyLocks) window.PB_applyLocks(); }catch(e){}
      var cfu=document.getElementById('cfUser'); if(cfu) cfu.textContent='Non connecté — clique « Compte »';
    }
  });
})();
