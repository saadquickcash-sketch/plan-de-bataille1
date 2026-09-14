
(function(){
  var root=document.documentElement;
  var STORE="planbataille_v1";
  function load(){try{return JSON.parse(localStorage.getItem(STORE))||{}}catch(e){return {}}}
  function save(o){try{localStorage.setItem(STORE,JSON.stringify(o))}catch(e){}}
  var state=load();

  /* ---- theme ---- */
  var icon=document.getElementById("themeIcon"), txt=document.getElementById("themeTxt");
  function applyTheme(t){
    if(t==="light"||t==="dark"){root.setAttribute("data-theme",t);}
    else{root.removeAttribute("data-theme");}
    var dark = t==="dark" || (t!=="light" && window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches);
    if(icon) icon.textContent = dark ? "☾" : "☀";
    if(txt) txt.textContent = dark ? "Sombre" : "Clair";
  }
  applyTheme(state.theme||"system");
  document.getElementById("themeBtn").addEventListener("click",function(){
    var cur=state.theme||"system";
    var next = cur==="system" ? "light" : (cur==="light" ? "dark" : "system");
    state.theme=next; save(state); applyTheme(next);
  });

  /* ---- tabs (timetable) ---- */
  var tabs=document.querySelectorAll(".tt-tab");
  tabs.forEach(function(tb){
    tb.addEventListener("click",function(){
      tabs.forEach(function(x){x.setAttribute("aria-selected","false");});
      tb.setAttribute("aria-selected","true");
      document.querySelectorAll(".tt-panel").forEach(function(p){p.classList.remove("on");});
      var el=document.getElementById(tb.dataset.tt); if(el) el.classList.add("on");
    });
  });

  /* ---- countdown ---- */
  var target=new Date("2026-10-18T00:00:00");
  var el=document.getElementById("countDays");
  if(el){
    var now=new Date();
    var diff=Math.ceil((target-now)/86400000);
    el.textContent = diff>0 ? diff : "—";
  }

  /* ---- ritual checkboxes ---- */
  if(!state.rituals) state.rituals={};
  document.querySelectorAll(".ritual").forEach(function(block){
    var key=block.dataset.ritual;
    if(!state.rituals[key]) state.rituals[key]={};
    var boxes=block.querySelectorAll('input[type="checkbox"]');
    var bar=block.querySelector(".prog > i");
    function refresh(){
      var done=0;
      boxes.forEach(function(b,i){ if(state.rituals[key][i]){b.checked=true;done++;} else {b.checked=false;} });
      if(bar) bar.style.width=(boxes.length? Math.round(done/boxes.length*100):0)+"%";
    }
    boxes.forEach(function(b,i){
      b.addEventListener("change",function(){
        state.rituals[key][i]=b.checked; save(state); refresh();
      });
    });
    var rb=block.querySelector("[data-reset]");
    if(rb) rb.addEventListener("click",function(){ state.rituals[key]={}; save(state); refresh(); });
    refresh();
  });

  /* ---- tuteur Claude : boutons "Demander à Claude" ---- */
  var toast=document.getElementById("toast"); var toastT;
  function showToast(msg){
    if(!toast) return;
    toast.textContent=msg; toast.classList.add("on");
    clearTimeout(toastT); toastT=setTimeout(function(){toast.classList.remove("on");},3400);
  }
  document.querySelectorAll("[data-ask]").forEach(function(b){
    b.addEventListener("click",function(){
      var p=b.getAttribute("data-ask")||"";
      if(window.PB_ASK){window.PB_ASK(p);}
    });
  });
})();

(function(){
  var T=document.getElementById('toast'),tt;
  function toast(m){ if(!T)return; T.textContent=m; T.classList.add('on'); clearTimeout(tt); tt=setTimeout(function(){T.classList.remove('on')},3200);}
  // accordions
  document.querySelectorAll('.lz-head').forEach(function(h){
    h.addEventListener('click',function(){
      var b=h.nextElementSibling, open=h.getAttribute('aria-expanded')==='true';
      h.setAttribute('aria-expanded', open?'false':'true');
      if(b) b.classList.toggle('open', !open);
    });
  });
  // subject tabs
  var stabs=document.querySelectorAll('.subject-tab');
  stabs.forEach(function(t){ t.addEventListener('click',function(){
    stabs.forEach(function(x){x.setAttribute('aria-selected','false')}); t.setAttribute('aria-selected','true');
    document.querySelectorAll('.subject-panel').forEach(function(p){p.classList.toggle('on', p.dataset.panel===t.dataset.subj)});
  });});
  // TTS
  var synth=window.speechSynthesis;
  document.querySelectorAll('.tts-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      if(!synth){ toast('Lecture vocale non disponible sur ce navigateur.'); return; }
      if(synth.speaking){ synth.cancel(); btn.textContent=btn.getAttribute('data-label'); return; }
      var el=document.getElementById(btn.getAttribute('data-target')); if(!el) return;
      var lang=btn.getAttribute('data-lang')||'fr-FR';
      var clone=el.cloneNode(true); var a=clone.querySelector('.lz-actions'); if(a)a.remove();
      var u=new SpeechSynthesisUtterance(clone.innerText); u.lang=lang; u.rate=.96;
      try{var vs=synth.getVoices();var v=vs.filter(function(x){return x.lang&&x.lang.slice(0,2)===lang.slice(0,2)})[0];if(v)u.voice=v;}catch(_){}
      u.onend=function(){btn.textContent=btn.getAttribute('data-label')};
      synth.cancel(); synth.speak(u); btn.textContent='⏸ Arrêter la lecture';
      toast('Lecture en cours — voix de ton appareil.');
    });
  });
  // ===== Tuteur IA — chat intégré (compact + plein écran, multi-conversations) =====
  var SYS="Tu es « Tuteur IA », le professeur particulier personnel de ton élève, en 1ère année du Baccalauréat Sciences Mathématiques (filière BIOF, programme marocain) au Groupe scolaire Fès City, région Fès-Meknès, Maroc. Objectif de l'élève : une moyenne générale supérieure à 17,5/20. Ton but n'est pas seulement de donner la réponse, mais de la lui faire COMPRENDRE en profondeur. MÉTHODE (à appliquer à chaque fois) : 1) Assure-toi d'avoir compris la question ; si elle est ambiguë, pose UNE courte question de clarification avant de te lancer. 2) Explique étape par étape, du plus simple au plus complexe, en définissant chaque terme ou notion nouvelle. 3) Illustre toujours par un exemple concret, puis propose un petit exercice d'application. 4) Quand c'est utile, guide l'élève par une question (méthode socratique) au lieu de tout donner d'un coup. 5) Termine par un récapitulatif court et une prochaine étape claire. RIGUEUR (très important) : avant de donner un résultat de calcul en maths ou en physique-chimie, REFAIS le calcul mentalement pour le vérifier, contrôle les unités et les cas particuliers. N'invente JAMAIS une formule, une définition, une date, une citation ou une source : si tu n'es pas sûr, dis-le honnêtement plutôt que d'inventer. Reste strictement dans le programme de 1ère Bac SM marocain (n'utilise pas de notions hors-programme). STYLE : réponds en français (ou en arabe si la question est en arabe), avec des paragraphes courts et une mise en forme claire ; écris les formules de façon lisible et mets en évidence le résultat important. Sois chaleureux, encourageant et jamais condescendant. ÉLÉGANCE (écris comme un excellent pédagogue) : commence par l'essentiel, va droit au but, aère ton texte ; n'emploie le gras que pour les points vraiment clés ; préfère des phrases fluides à une accumulation de puces ; une réponse soignée, précise et agréable à lire vaut mieux qu'une réponse longue et brouillonne. Priorité aux Maths (coef 9) et à la Physique-Chimie (coef 7), mais tu maîtrises aussi SVT, français (œuvres au programme : Le Dernier Jour d'un Condamné, La Boîte à Merveilles, Antigone), philosophie, histoire-géographie, arabe, éducation islamique et anglais. RÉFLEXION (ta manière de penser) : avant de répondre, prends un instant pour réfléchir en silence — identifie ce que l'élève sait déjà et où se situe PRÉCISÉMENT sa difficulté, décompose le problème en petites étapes, choisis la voie la plus simple, puis rédige une réponse claire. Anticipe l'erreur classique sur ce point et préviens-la. Si plusieurs méthodes existent, montre la plus efficace pour un élève de ce niveau, et dis pourquoi. PROACTIVITÉ : propose spontanément l'outil du site le plus utile au bon moment — un QCM interactif pour se tester, une fiche ou une série d'exercices imprimable, un planning, ou l'ouverture de la bonne leçon — sans attendre qu'on te le demande, dès que cela aide vraiment l'élève.";
  var fab=document.getElementById('fab'),panel=document.getElementById('chatpanel');
  if(!fab||!panel) return;
  var msgsEl=document.getElementById('chatMsgs'),input=document.getElementById('chatInput'),send=document.getElementById('chatSend');
  var full=document.getElementById('chatFull'),cfList=document.getElementById('cfList'),cfMsgs=document.getElementById('cfMsgs'),cfInput=document.getElementById('cfInput'),cfSend=document.getElementById('cfSend'),cfTitle=document.getElementById('cfTitle');
  var selAsk=document.getElementById('selAsk'); var busy=false; var pendingForcePage=null;
  function uid(){ return 'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
  var convos=[], curId=null;
  function byId(id){ for(var i=0;i<convos.length;i++) if(convos[i].id===id) return convos[i]; return null; }
  function cur(){ return byId(curId)||convos[0]; }
  function titleOf(m){ for(var i=0;i<m.length;i++){ if(m[i].role==='user') return m[i].content.slice(0,42); } return 'Nouvelle conversation'; }
  function newConvo(act){ var c={id:uid(),title:'Nouvelle conversation',msgs:[],t:Date.now()}; convos.unshift(c); if(act!==false) curId=c.id; save(); return c; }
  function load(){
    try{ convos=JSON.parse(localStorage.getItem('pb_convos'))||[]; }catch(e){ convos=[]; }
    try{ curId=localStorage.getItem('pb_curc')||null; }catch(e){ curId=null; }
    if(!convos.length){ try{ var old=JSON.parse(localStorage.getItem('chat_hist')); if(old&&old.length){ convos=[{id:uid(),title:titleOf(old),msgs:old,t:Date.now()}]; } }catch(e){} }
    if(!convos.length){ newConvo(true); }
    if(!curId||!byId(curId)) curId=convos[0].id;
  }
  function strip(cv){ return cv.slice(0,40).map(function(c){ return {id:c.id,title:c.title,t:c.t,msgs:c.msgs.map(function(m){
    var o={role:m.role,content:m.content};
    if(m.img){ if(m.img.indexOf('data:')===0){ var t=m.content||'photo'; if(t.indexOf('🖼️')!==0) t='🖼️ '+t; o.content=t; } else { o.img=m.img; } }
    return o; })}; }); }
  function save(){ var s=strip(convos); try{ localStorage.setItem('pb_convos',JSON.stringify(s)); localStorage.setItem('pb_curc',curId); }catch(e){}
    if(window.PB_onChatChange){ try{ window.PB_onChatChange(s); }catch(e){} } }
  load();
  function esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
  function fmt(s){ var h=esc(s); h=h.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>'); h=h.replace(/`([^`]+)`/g,'<code>$1</code>'); h=h.replace(/\n/g,'<br>'); return h; }
  function bubbleEl(role,text,img){ var d=document.createElement('div'); d.className='cp-msg '+role;
    var h=''; if(img) h+='<img class="cp-img" src="'+img+'" alt="image">'; h+=(role==='ai'?fmtChat(text):esc(text)); d.innerHTML=h;
    if(role==='ai'){ try{ renderMath(d); }catch(_){} }
    if(role==='ai'){ try{ agEnhanceCode(d); }catch(_){} }
    if(role==='ai'){ var spoken=text; var bar=document.createElement('div'); bar.className='msg-bar';
      var sp=document.createElement('button'); sp.className='msg-ic'; sp.title='Écouter'; sp.innerHTML='&#128266;';
      sp.addEventListener('click',function(e){ e.stopPropagation(); try{ var syn=window.speechSynthesis; if(!syn)return; if(syn.speaking){ syn.cancel(); return; } var u=new SpeechSynthesisUtterance(spoken); u.lang=(/[\u0600-\u06FF]/.test(spoken)?'ar-SA':'fr-FR'); u.rate=.98; syn.cancel(); syn.speak(u); }catch(_){} });
      bar.appendChild(sp);
      var dl=document.createElement('button'); dl.className='msg-ic'; dl.title='Télécharger (.md)'; dl.innerHTML='&#8681;';
      dl.addEventListener('click',function(e){ e.stopPropagation(); try{ var blob=new Blob([spoken],{type:'text/markdown;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='tuteur-ia.md'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },1200); }catch(_){} });
      bar.appendChild(dl);
      var cp=document.createElement('button'); cp.className='msg-ic'; cp.title='Copier'; cp.innerHTML='&#128203;';
      cp.addEventListener('click',function(e){ e.stopPropagation(); try{ navigator.clipboard&&navigator.clipboard.writeText(spoken); cp.innerHTML='&#10003;'; setTimeout(function(){cp.innerHTML='&#128203;';},1200); }catch(_){} });
      bar.appendChild(cp);
      var pd=document.createElement('button'); pd.className='msg-ic'; pd.title='Version imprimable'; pd.innerHTML='&#128196;';
      pd.addEventListener('click',function(e){ e.stopPropagation(); try{ agDocFromText(spoken, agGuessTitle(spoken), 'DOCUMENT'); }catch(_){} });
      bar.appendChild(pd);
      var pf=document.createElement('button'); pf.className='msg-ic'; pf.title='Télécharger en PDF'; pf.innerHTML='&#128213;';
      pf.addEventListener('click',function(e){ e.stopPropagation(); try{ agMakePdf(agGuessTitle(spoken)||'Document', spoken); }catch(_){} });
      bar.appendChild(pf);
      if(/```/.test(spoken)){ var zp=document.createElement('button'); zp.className='msg-ic'; zp.title='Télécharger le code (ZIP)'; zp.innerHTML='&#128230;';
        zp.addEventListener('click',function(e){ e.stopPropagation(); try{ agZipFromText(spoken, agGuessTitle(spoken)||'code'); }catch(_){} });
        bar.appendChild(zp);
        var ed=document.createElement('button'); ed.className='msg-ic'; ed.title='Ouvrir dans l\'éditeur'; ed.innerHTML='&lt;/&gt;';
        ed.addEventListener('click',function(e){ e.stopPropagation(); try{ var _fs=agBlocksFrom(spoken).map(function(b){ return {name:b.name,content:b.code}; }); if(_fs.length) agToEditor(_fs); }catch(_){} });
        bar.appendChild(ed); }
      if(img){ var op=document.createElement('a'); op.className='msg-ic'; op.title='Ouvrir l\'image'; op.innerHTML='&#128190;'; op.href=img; op.target='_blank'; op.rel='noopener'; bar.appendChild(op); }
      d.appendChild(bar);
      if(/```/.test(text)){ try{ var _bl=agBlocksFrom(text); var _nm=(_bl.length>1?(_bl.length+' fichiers'):((_bl[0]&&_bl[0].name)||'code')); var fc=document.createElement('div'); fc.className='pb-filecard';
        fc.innerHTML='<span class="fc-ic">&#128230;</span><span class="fc-meta"><b>'+esc(agGuessTitle(text)||'Projet')+'</b><span class="fc-sub">'+esc(_nm)+'</span></span>';
        var _b=document.createElement('button'); _b.className='fc-dl'; _b.textContent='Télécharger'; _b.addEventListener('click',function(e){ e.stopPropagation(); try{ agZipFromText(spoken, agGuessTitle(spoken)||'code'); }catch(_){} }); fc.appendChild(_b); d.appendChild(fc); }catch(_e){} }
      }
    return d; }
  function fillBox(box,c){ if(!box)return; box.innerHTML='';
    if(!c.msgs.length){ var w=document.createElement('div'); w.className='cp-empty'; w.textContent='Pose ta question, dicte-la 🎤 ou prends une photo 📎 d\'un exercice.'; box.appendChild(w); }
    c.msgs.forEach(function(m){ box.appendChild(bubbleEl(m.role==='assistant'?'ai':'user',m.content,m.img)); }); box.scrollTop=box.scrollHeight; }
  function renderMsgs(){ var c=cur(); fillBox(msgsEl,c); fillBox(cfMsgs,c); if(cfTitle) cfTitle.textContent=c.title||'Tuteur IA'; }
  function renderList(){ if(!cfList)return; cfList.innerHTML=''; convos.slice().sort(function(a,b){return b.t-a.t;}).forEach(function(c){
    var it=document.createElement('div'); it.className='cf-item'+(c.id===curId?' on':'');
    var tt=document.createElement('span'); tt.className='cf-it-t'; tt.textContent=c.title||'Conversation'; it.appendChild(tt);
    var del=document.createElement('button'); del.className='cf-it-x'; del.innerHTML='&times;'; del.title='Supprimer';
    del.addEventListener('click',function(e){ e.stopPropagation(); convos=convos.filter(function(x){return x.id!==c.id;}); if(!convos.length) newConvo(true); if(curId===c.id) curId=convos[0].id; save(); renderList(); renderMsgs(); });
    it.appendChild(del);
    it.addEventListener('click',function(){ curId=c.id; save(); renderList(); renderMsgs(); if(cfInput) cfInput.focus(); });
    cfList.appendChild(it);
  }); }
  function render(){ renderMsgs(); renderList(); }
  render();
  try{ ensureChatCss(); }catch(e){}
  try{ agApplyHash(); }catch(e){} window.addEventListener('hashchange',function(){ try{ agApplyHash(); }catch(e){} });
  function pageCtx(){ var p=window.PB_PAGE||{}; var s='CONTEXTE : l\'élève est actuellement sur la page « '+(p.label||'?')+' » du site Plan de Bataille.';
    var st=document.querySelector('.subject-tab[aria-selected="true"]'); if(st) s+=' Matière affichée : '+st.textContent.trim().replace(/\s+/g,' ')+'.';
    var op=document.querySelector('.lz-head[aria-expanded="true"] .lz-title'); if(op) s+=' Leçon ouverte : '+op.textContent.trim()+'.';
    return s; }
  function extract(r){ if(r==null) return ''; if(typeof r==='string') return r;
    if(r.message&&r.message.content){ return (typeof r.message.content==='string')?r.message.content:JSON.stringify(r.message.content); }
    if(r.text) return r.text; if(r.content) return r.content;
    if(r.choices&&r.choices[0]&&r.choices[0].message) return r.choices[0].message.content;
    try{ return String(r); }catch(e){ return ''; } }
  function ensurePuter(){ return new Promise(function(res){
    if(window.puter&&window.puter.ai) return res(true);
    if(document.getElementById('puterjs')){ var n=0,iv=setInterval(function(){ if(window.puter&&window.puter.ai){clearInterval(iv);res(true);} else if(++n>40){clearInterval(iv);res(false);} },150); return; }
    var s=document.createElement('script'); s.id='puterjs'; s.src='https://js.puter.com/v2/';
    s.onload=function(){ res(!!(window.puter&&window.puter.ai)); }; s.onerror=function(){ res(false); };
    document.head.appendChild(s); setTimeout(function(){ res(!!(window.puter&&window.puter.ai)); }, 6000);
  }); }
  function sysText(){ var extra=''; if(window.PB_USERNAME) extra=' L\'élève s\'appelle '+window.PB_USERNAME+' : adresse-toi à lui par son prénom, chaleureusement.';
    var cap=' Tu peux : expliquer étape par étape ; créer des QCM et questionnaires ; générer des séries d\'exercices, des fiches, des résumés, des plannings et des pages. Écris TOUTES les formules mathématiques en LaTeX : entre $ … $ pour une formule en ligne, et entre $$ … $$ pour une formule centrée (ex. $x^2+1$, $$\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$$). Encadre le RÉSULTAT FINAL important avec \\boxed{...} (ex. $\\boxed{x=2}$). IMPORTANT (format des maths) : écris les mathématiques UNIQUEMENT entre $ … $ (en ligne) et $$ … $$ (centré), jamais aucun autre délimiteur (surtout pas les crochets à barre oblique), et garde chaque formule $$ … $$ sur UNE SEULE ligne. CORRECTION DE DEVOIR : quand l\'élève te donne une rédaction ou un exercice à corriger, liste d\'abord les erreurs (langue, méthode, raisonnement) en les expliquant, donne ensuite une VERSION CORRIGÉE, puis une NOTE estimée sur 20 et 2 conseils concrets. RÉSOLUTION D\'EXERCICE : décompose le problème en sous-étapes numérotées, résous chacune en justifiant, PUIS vérifie ton résultat final (refais le calcul, teste un cas simple) avant de conclure ; si des « ÉLÉMENTS DU COURS » te sont fournis dans le contexte, appuie-toi dessus en priorité et ne les contredis pas. PROGRAMMATION : tu es excellent en HTML, CSS, JavaScript et Python. Écris TOUJOURS le code dans des blocs délimités par trois accents graves avec le langage (par ex. ```html, ```css, ```js, ```python), un code propre, correct, commenté et complet. Explique brièvement le fonctionnement, signale les bonnes pratiques et les pièges, et propose une amélioration possible. Pour une page web, donne un fichier HTML autonome (HTML+CSS+JS dans un seul bloc) que l\'élève peut prévisualiser directement. Tu sais concevoir des projets et des JEUX complets (jeu d\'échecs, morpion, jeu de plateau, quiz, mini-jeu en ligne…) : si le projet a plusieurs fichiers, mets CHAQUE fichier dans son propre bloc ```langage — l\'élève pourra tout prévisualiser et tout télécharger en un .zip. Tu peux aussi placer ce code directement dans l\'onglet « Éditeur de code » du site (voir l\'outil "editeur") pour que l\'élève le teste, le corrige et l\'exécute ; c\'est là que tu t\'occupes de tout le travail de code demandé. (Pour jouer aux échecs contre un vrai adversaire, tu peux l\'inviter à ouvrir l\'onglet « Échecs » du site, qui contient un moteur d\'échecs.) ANALYSE D\'ÉCHECS (entraîneur) : quand on te donne une position (FEN) et/ou un coup, joue le rôle d\'un coach : dis en une phrase qui est mieux et pourquoi, identifie la faute éventuelle (pièce en prise, tactique manquée, roi exposé), donne le MEILLEUR coup et le plan à suivre, en 3-4 phrases claires. Reste concret et pédagogique. RÉFLEXION VISIBLE : pour une tâche complexe (démonstration, gros exercice, programme), commence par une courte ligne « Plan : … » qui expose ta démarche en une phrase, puis développe étape par étape.  GRAPHIQUES : pour tracer une courbe, déclenche l\'outil « graphique » : [[PB]]{"outil":"graphique","args":{"fonctions":["x^2","sin(x)"],"xmin":-6,"xmax":6}}[[/PB]] — le site trace la courbe exacte. IMAGES : tu peux générer une image sur demande ; et quand l\'élève envoie une PHOTO même floue/sombre, lis-la très attentivement (le site en améliore automatiquement le contraste) et transcris ou résous ce que tu vois, chiffre par chiffre. Propose toujours une étape suivante.';
    var proto=' ACTIONS SUR LE SITE — quand l\'élève te demande explicitement de FAIRE quelque chose sur la plateforme, déclenche un outil en terminant ta réponse par UNE balise, seule sur la dernière ligne, au format EXACT : [[PB]]{"outil":"...","args":{...}}[[/PB]]. Outils : '
      +'(1) "document" = rend TON texte imprimable et téléchargeable (planning, série d\'exercices, fiche, résumé, corrigé). Rédige TOUT le contenu AU-DESSUS de la balise, bien structuré (titres avec ##, listes, **gras**, et tableaux Markdown avec des | quand c\'est utile). args:{"titre":"...","type":"PLANNING|SÉRIE D\'EXERCICES|FICHE|RÉSUMÉ|CORRIGÉ|DOCUMENT"}. '
      +'(2) "qcm" = lance un QCM auto-corrigé du site. args:{"matiere":"maths|pc|svt|francais|philo|arabe|islam|hg"}. '
      +'(3) "aller" = ouvre une page ou une leçon. args:{"page":"revision|qcm|flashcards|outils|progres|examens|accueil","matiere":"maths|pc|...","lecon":"mots-clés de la leçon"}. '
      +'(4) "image" = crée une image/schéma. args:{"description":"..."}. '
      +'(5) "moyenne" = ouvre le calculateur de moyenne. args:{}. '
      +'(6) "quiz" = crée un QCM INTERACTIF affiché directement dans le chat (l\'élève clique ses réponses, le site corrige et compte le score). Utilise-le dès que l\'élève veut être testé, veut un QCM ou un quiz. args:{"titre":"...","questions":[{"q":"la question ?","choix":["choix A","choix B","choix C","choix D"],"correct":<numéro de la bonne réponse, 0 pour la 1re>,"explication":"pourquoi c\'est la bonne"}]} — mets 4 à 6 questions, et écris tout le contenu des questions DANS la balise (pas au-dessus). '
      +'(7) "page" = CRÉE une nouvelle page (un nouvel onglet) DANS le site, enregistrée et rouvrable à tout moment depuis « Créations ». Utilise-le quand l\'élève demande de créer une page, un onglet, un cours complet, un dossier, un mémo… Rédige la page COMPLÈTE et élégante dans ta réponse (titre avec #, sections avec ##, listes, gras, tableaux si utile, exemple et résumé), PUIS termine par la balise SANS remettre le contenu dedans : args:{"titre":"titre court","emoji":"un emoji"}. '
      +'(8) "sondage" = affiche un QUESTIONNAIRE INTERACTIF cliquable pour RECUEILLIR les préférences ou disponibilités de l\'élève (sans bonne/mauvaise réponse). Ses réponses te seront renvoyées automatiquement pour que tu continues. args:{"titre":"...","questions":[{"q":"la question ?","choix":["...","...","..."],"multi":true|false}]}. Utilise-le AVANT de créer un planning ou tout ce qui dépend de ses choix ; mets "multi":true quand plusieurs réponses sont possibles. '
      +'(9) "theme" = change l\'apparence du site. args:{"mode":"sombre|clair|auto"}. '
      +'(10) "memoire" = mémorise durablement une information sur l\'élève (utilise-le quand il révèle une difficulté, un point fort ou un objectif). args:{"faible":"...","fort":"...","objectif":"...","note":"..."}. '
      +'(11) "style" = modifie l\'apparence du site (fond, couleur du texte, accent, taille, ou CSS libre) et l\'enregistre — tu as un accès complet à la présentation. args:{"page":"accueil|revision|qcm|outils|tout","fond":"couleur","texte":"couleur","accent":"couleur","css":"regles CSS"}. Utilise-le dès que l\'élève demande de changer une couleur ou l\'apparence. '
      +'(12) "editeur" = PLACE ton code directement dans l\'onglet « Éditeur de code » (mini-VS Code : coloration syntaxique de nombreux langages, détection d\'erreurs façon VS Code, exécution des projets web) et l\'ouvre pour l\'élève. Utilise-le dès que l\'élève veut écrire, tester, corriger ou exécuter du code, ou dès que tu produis un projet à plusieurs fichiers. Deux façons de fournir les fichiers : soit tu écris chaque fichier dans un bloc ```langage AU-DESSUS de la balise (nomme le fichier juste après le langage, par ex. ```js script.js ou ```python solution.py — sinon un nom est choisi automatiquement) et tu laisses args vide {}, soit tu passes args:{"fichiers":[{"nom":"index.html","contenu":"..."},{"nom":"style.css","contenu":"..."}]}. Chaque fichier va dans son propre onglet ; s\'il y a du HTML, un clic sur « Exécuter » montre le résultat. Écris toujours un code complet, correct et sans erreur de syntaxe (le panneau « Problèmes » signale les erreurs). '
      +'ACCÈS : tu as accès à tout le site — tu peux enchaîner ces actions pour réaliser en détail ce que l\'élève demande, tout en respectant la présentation existante (n\'invente pas d\'autres balises). Si une action a besoin d\'informations, commence par un "sondage", puis agis avec le résultat. '
      +'RÈGLES : utilise la balise UNIQUEMENT si l\'élève veut vraiment l\'action ; UNE seule balise par réponse ; pour un planning ou une série, rédige d\'abord le contenu COMPLET puis ajoute [[PB]]{"outil":"document",...}[[/PB]]. Pour une simple question ou explication, réponds normalement SANS aucune balise.';
    return SYS+extra+cap+proto+agMemText()+' '+pageCtx(); }
  function msgsForAPI(c){ var base=[{role:'system',content:sysText()}];
    try{ var lastU=''; for(var i=c.msgs.length-1;i>=0;i--){ if(c.msgs[i].role==='user'){ lastU=c.msgs[i].content||''; break; } }
      var g=agRetrieve(lastU); if(g){ base.push({role:'system',content:g}); } }catch(e){}
    return base.concat(c.msgs.slice(-16)); }
  async function pbIdToken(){
    try{ if(typeof firebase!=='undefined' && firebase.auth && firebase.auth().currentUser){ return await firebase.auth().currentUser.getIdToken(); } }catch(e){}
    return '';
  }
  /* Nettoie/raccourcit une réponse d'IA en un vrai titre court (3-6 mots). */
  function pbCleanTitle(t){
    t=String(t||'').split('\n').filter(function(l){return l.trim();})[0]||'';
    t=t.replace(/["'«»`*]/g,'')
       .replace(/^\s*(voici|bien sûr|bien sur|d'accord)[^:]*:\s*/i,'')
       .replace(/^\s*(titre|sujet|thème|theme)\s*[:\-–]\s*/i,'')
       .replace(/[\s.:;,–-]+$/,'')
       .replace(/\s+/g,' ').trim();
    // borne la longueur : max ~7 mots / 56 caractères
    var words=t.split(' ');
    if(words.length>7) t=words.slice(0,7).join(' ');
    if(t.length>56) t=t.slice(0,56).replace(/\s+\S*$/,'').trim();
    return t;
  }
  /* Génère un TITRE court et clair pour la conversation à partir du 1er message
     (comme ChatGPT). Utilise le backend premium (fiable, minuscule coût) pour les
     élèves connectés, avec repli sur l'IA gratuite puis sur le début du message.
     Ne consomme PAS le quota quotidien de l'élève (pas d'appel à PB_quota.inc). */
  async function pbTitleAI(userText){
    var base=String(userText||'').replace(/\s+/g,' ').trim();
    var fallback=base.slice(0,42);
    if(base.length<2) return fallback;
    var prompt='Donne UNIQUEMENT un titre court de 3 à 6 mots, en français, qui résume ce sujet. '
      +'Pas de phrase, pas de guillemets, pas de ponctuation finale, ne commence pas par « Titre ». Sujet : '+base.slice(0,240);
    // 1) Backend premium (fiable) — marche pour tout élève connecté
    try{
      var r1=await callPremiumAI([{role:'user',content:prompt}]);
      var t1=pbCleanTitle(r1);
      if(t1 && t1.length>=2) return t1;
    }catch(e1){}
    // 2) Repli : IA gratuite (pollinations)
    try{
      var res=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'openai',messages:[{role:'user',content:prompt}]})});
      var t='';
      if(res.ok){ var ct=res.headers.get('content-type')||'';
        if(ct.indexOf('json')>=0){ var j=await res.json(); t=extract(j)||''; } else { t=await res.text()||''; } }
      var t2=pbCleanTitle(t);
      if(t2 && t2.length>=2) return t2;
    }catch(e2){}
    // 3) Repli local : début du message
    return fallback;
  }
  function pbMaybeTitle(c, firstText){
    try{
      if(!c || c._titled) return;
      var userCount=c.msgs.filter(function(m){return m.role==='user';}).length;
      if(userCount!==1) return;              // seulement au tout premier échange
      c._titled=true;
      pbTitleAI(firstText).then(function(tt){
        if(!tt) return;
        c.title=tt; try{ save(); }catch(_){} try{ renderList(); }catch(_){}
        try{ if(cfTitle && cur() && cur().id===c.id) cfTitle.textContent=tt; }catch(_){}
        try{ if(window.PB_onChatChange) window.PB_onChatChange(strip(convos)); }catch(_){}
      });
    }catch(e){}
  }
  async function callPremiumAI(msgs){
    var ep=(window.PB_AI_ENDPOINT||'/api/chat');
    var tok=await pbIdToken();
    var res=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:msgs, idToken:tok})});
    if(!res.ok) throw new Error('premium '+res.status);
    var j=await res.json(); if(j&&j.reply&&String(j.reply).trim()) return String(j.reply).trim();
    throw new Error('premium empty'); }
  async function callAI(c){
    var msgs=msgsForAPI(c);
    var _isPrem=false; try{ _isPrem=!!(window.PB_isPremium && window.PB_isPremium()); }catch(_){}
    // Badge « avancée » dès le départ pour un abonné (pas de clignotement « gratuite »
    // pendant l'attente) ; on ne repasse en « gratuite » que si l'IA premium échoue vraiment.
    try{ window.PB_LAST_AI=_isPrem?'premium':'free'; if(window.PB_paintAiBadge) window.PB_paintAiBadge(); }catch(_){}
    if(_isPrem){ try{ var prem=await callPremiumAI(msgs); if(prem){ try{ window.PB_LAST_AI='premium'; }catch(_){} return prem; } }catch(ep){} }
    try{ window.PB_LAST_AI='free'; if(window.PB_paintAiBadge) window.PB_paintAiBadge(); }catch(_){}
    try{ var ok=await ensurePuter(); if(ok){
      var mdl=['gpt-4o-mini',null];
      for(var mi=0;mi<mdl.length;mi++){ try{ var r= mdl[mi] ? await puter.ai.chat(msgs,{model:mdl[mi]}) : await puter.ai.chat(msgs); var t=extract(r); if(t&&t.trim()) return t.trim(); }catch(em){} }
    } }catch(e){}
    try{ var res=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'openai',messages:msgs})});
      if(res.ok){ var ct=res.headers.get('content-type')||''; if(ct.indexOf('json')>=0){ var j=await res.json(); var t2=extract(j); if(t2&&t2.trim()) return t2.trim(); } else { var tx=await res.text(); if(tx&&tx.trim()) return tx.trim(); } }
    }catch(e){}
    try{ var flat=msgs.map(function(m){return (m.role==='system'?'[Consignes] ':m.role==='user'?'[Élève] ':'[Tuteur] ')+m.content;}).join('\n\n');
      var g=await fetch('https://text.pollinations.ai/'+encodeURIComponent(flat)); if(g.ok){ var gt=await g.text(); if(gt&&gt.trim()) return gt.trim(); }
    }catch(e){}
    throw new Error('IA indisponible');
  }
  function addTyping(){ var nodes=[]; [msgsEl,cfMsgs].forEach(function(box){ if(!box)return; var t=document.createElement('div'); t.className='cp-msg ai typing'; t.innerHTML='<span></span><span></span><span></span>'; box.appendChild(t); box.scrollTop=box.scrollHeight; nodes.push(t); }); return nodes; }
  function rmTyping(nodes){ nodes.forEach(function(n){ if(n&&n.parentNode) n.parentNode.removeChild(n); }); }
  function activeInput(){ return (full&&!full.hidden)?cfInput:input; }
  async function ask(text){ text=(text||'').trim(); var img=pendingImg; if((!text&&!img)||busy) return;
    if(!img){
      if(agWantsPlanning(text)){ startPlanningWizard(text); return; }
      var _gx=agWantsPlot(text); if(_gx){ if(input) input.value=''; if(cfInput){ cfInput.value=''; autoGrow(cfInput); } var _gc=cur(); _gc.msgs.push({role:'user',content:text}); if(!_gc.title||_gc.title==='Nouvelle conversation') _gc.title=text.slice(0,42); _gc.msgs.push({role:'assistant',content:'Voici la courbe 📈'}); _gc.t=Date.now(); save(); renderMsgs(); renderList(); setTimeout(function(){ try{ agPlotBubble(_gx,{}); }catch(e){} },80); return; }
      var _stc=agWantsStyle(text); if(_stc){ if(input) input.value=''; if(cfInput){ cfInput.value=''; autoGrow(cfInput); } var _sc=cur(); _sc.msgs.push({role:'user',content:text}); if(!_sc.title||_sc.title==='Nouvelle conversation') _sc.title=text.slice(0,42); var _r=agDoStyle(_stc); _sc.msgs.push({role:'assistant',content:_r||'Fait 👍'}); _sc.t=Date.now(); save(); renderMsgs(); renderList(); return; }
      var qc=agQuick(text); if(qc){
      if(qc.kind==='image'){ genImage(qc.prompt); return; }
      if(input) input.value=''; if(cfInput){ cfInput.value=''; autoGrow(cfInput); }
      var cq=cur(); cq.msgs.push({role:'user',content:text}); if(!cq.title||cq.title==='Nouvelle conversation') cq.title=text.slice(0,42);
      var conf = qc.kind==='qcm' ? 'D\'accord — je lance le QCM 👍' : 'D\'accord — j\'ouvre ça pour toi 👍';
      cq.msgs.push({role:'assistant',content:conf}); cq.t=Date.now(); save(); renderMsgs(); renderList();
      setTimeout(function(){ try{ if(qc.kind==='qcm') agQcm({matiere:qc.subj}); else agGo({page:qc.page?qc.page.replace('.html',''):'',matiere:qc.subj,lecon:qc.lesson}); }catch(e){} },320); return; }
      pendingForcePage=agWantsPage(text);
    }
    if(window.PB_isPremium && !window.PB_isPremium() && window.PB_quota){
      var _q=window.PB_quota.check();
      if(!_q.allowed){ try{ window.PB_showUpsell('limit'); }catch(_){} try{ toast('Limite gratuite atteinte aujourd\'hui. Passe Premium pour continuer 🚀'); }catch(_){} return; }
      try{ window.PB_quota.inc(); }catch(_){}
    }
    busy=true;
    if(input) input.value=''; if(cfInput){ cfInput.value=''; autoGrow(cfInput); } setPending(null);
    var c=cur(); var um={role:'user',content:text||'(photo envoyée)'}; if(img) um.img=img; c.msgs.push(um);
    if(!c.title||c.title==='Nouvelle conversation') c.title=(text||'Photo — exercice').slice(0,42); c.t=Date.now(); save(); renderMsgs(); renderList();
    var typ=addTyping();
    try{ var raw = img ? await callVision(text,img) : await callAI(c); rmTyping(typ);
      var pr=agParse(raw); var clean=pr.clean||raw; try{ clean=agVerifyArithmetic(clean); }catch(_){} try{ clean=agMathNormalize(clean); }catch(_){}
      var hasAct = pr.actions && pr.actions.length;
      /* Si l'IA a écrit un QCM/questionnaire en texte (sans balise), on le rend cliquable */
      var conv = (!hasAct && !pendingForcePage) ? agTextToSurvey(clean) : null;
      if(conv && conv.questions.length){
        var intro=(conv.intro&&conv.intro.trim())?conv.intro.trim():'Voici ton questionnaire — coche tes réponses puis clique « Envoyer ».';
        c.msgs.push({role:'assistant',content:intro}); c.t=Date.now(); save(); renderMsgs(); renderList();
        var boxc=agActiveBox(); if(boxc){ boxc.appendChild(agSurveyBuild(boxc,conv.title||'Questionnaire',conv.questions)); boxc.scrollTop=boxc.scrollHeight; }
        pendingForcePage=null; busy=false; var aic=activeInput(); if(aic) aic.focus(); return;
      }
      if(clean && clean.trim()){ try{ await typeReveal(clean); }catch(_){} }
      c.msgs.push({role:'assistant',content:clean});
      c.t=Date.now(); save(); renderMsgs(); renderList();
      try{ pbMaybeTitle(c, text); }catch(_){}
      var madePage=false;
      if(hasAct){ pr.actions.forEach(function(a){ try{ if(agRun(a, clean)){ var tn=(a.outil||a.tool||'').toString().toLowerCase(); if(tn.indexOf('page')>=0||tn.indexOf('onglet')>=0) madePage=true; } }catch(_){} }); }
      if(pendingForcePage && !madePage){ try{ agCreatePage({titre:pendingForcePage}, clean); }catch(_){} }
      else if(!hasAct){ try{ agChips(); }catch(_){} }
      pendingForcePage=null; busy=false; var ai1=activeInput(); if(ai1) ai1.focus(); return;
    }
    catch(e){ rmTyping(typ); c.msgs.push({role:'assistant',content: img ? 'Je n\'ai pas pu analyser l\'image (service occupé). Réessaie dans un instant, ou décris-moi l\'exercice en texte.' : 'Le service IA gratuit est momentanément indisponible. Réessaie dans un instant, ou reformule ta question.'}); }
    c.t=Date.now(); save(); renderMsgs(); renderList(); busy=false; var ai=activeInput(); if(ai) ai.focus();
  }
  function autoGrow(el){ if(!el)return; el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,150)+'px'; }
  function openPanel(){ if(full&&!full.hidden) return; panel.classList.add('on'); ensurePuter(); setTimeout(function(){ input&&input.focus(); },40); }
  function openFull(){ if(!full)return; full.hidden=false; document.body.classList.add('noscroll'); panel.classList.remove('on'); ensurePuter(); render(); setTimeout(function(){ cfInput&&cfInput.focus(); },40); }
  function closeFull(){ if(full) full.hidden=true; document.body.classList.remove('noscroll'); }
  fab.addEventListener('click',function(){ if(full&&!full.hidden){ closeFull(); return; } panel.classList.toggle('on'); if(panel.classList.contains('on')){ ensurePuter(); input&&input.focus(); } });
  var cc=document.getElementById('chatClose'); if(cc)cc.addEventListener('click',function(){ panel.classList.remove('on'); });
  var ex=document.getElementById('chatExpand'); if(ex)ex.addEventListener('click',openFull);
  var nw=document.getElementById('chatNew'); if(nw)nw.addEventListener('click',function(){ newConvo(true); render(); input&&input.focus(); });
  var cfn=document.getElementById('cfNew'); if(cfn)cfn.addEventListener('click',function(){ newConvo(true); render(); cfInput&&cfInput.focus(); });
  var cfr=document.getElementById('cfReduce'); if(cfr)cfr.addEventListener('click',function(){ closeFull(); openPanel(); });
  var cfc=document.getElementById('cfClose'); if(cfc)cfc.addEventListener('click',closeFull);
  if(send)send.addEventListener('click',function(){ ask(input.value); });
  if(input)input.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); ask(input.value); } });
  if(cfSend)cfSend.addEventListener('click',function(){ ask(cfInput.value); });
  if(cfInput){ cfInput.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); ask(cfInput.value); } }); cfInput.addEventListener('input',function(){ autoGrow(cfInput); }); }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&full&&!full.hidden) closeFull(); });
  document.querySelectorAll('.preset button[data-ask]').forEach(function(b){
    b.addEventListener('click',function(){ var p=b.getAttribute('data-ask')||''; openPanel(); if(input){ input.value=p; input.focus(); try{input.setSelectionRange(p.length,p.length);}catch(_){}} });
  });
  // ---- Sélection de texte : « Demander à l'IA » ----
  function closestSel(node,sel){ var el=(node&&node.nodeType===3)?node.parentElement:node; return (el&&el.closest)?el.closest(sel):null; }
  var selShown=false;
  function hideSel(){ if(selAsk){ selAsk.hidden=true; selShown=false; } }
  function handleSel(){ if(!selAsk) return; var s=window.getSelection(); var t=s&&s.toString().trim();
    if(!t||t.length<3||t.length>2000){ hideSel(); return; }
    var a=s.anchorNode; if(closestSel(a,'.chatpanel')||closestSel(a,'#chatFull')||closestSel(a,'.selask')||closestSel(a,'input')||closestSel(a,'textarea')||closestSel(a,'.qz-w')){ hideSel(); return; }
    var r; try{ r=s.getRangeAt(0).getBoundingClientRect(); }catch(e){ hideSel(); return; }
    if(!r||(r.width===0&&r.height===0)){ hideSel(); return; }
    selAsk.setAttribute('data-txt',t); selAsk.hidden=false; selShown=true;
    var bw=selAsk.offsetWidth||160, bh=selAsk.offsetHeight||40, vw=window.innerWidth, vh=window.innerHeight;
    var top=r.top-bh-8; if(top<6) top=Math.min(r.bottom+10, vh-bh-8);
    var left=r.left+r.width/2-bw/2; left=Math.max(8,Math.min(left,vw-bw-8));
    selAsk.style.top=top+'px'; selAsk.style.left=left+'px';
  }
  var selTimer;
  function schedSel(){ clearTimeout(selTimer); var s=window.getSelection(); if(!s||!s.toString().trim()){ hideSel(); return; } selTimer=setTimeout(handleSel,300); }
  document.addEventListener('mouseup',function(){ setTimeout(handleSel,10); });
  document.addEventListener('selectionchange',schedSel);
  window.addEventListener('scroll',function(){ if(selShown) handleSel(); },true);
  window.addEventListener('resize',function(){ if(selShown) handleSel(); });
  if(selAsk){
    function doAsk(e){ if(e){ e.preventDefault(); e.stopPropagation(); } var t=selAsk.getAttribute('data-txt')||''; selAsk.removeAttribute('data-txt'); hideSel(); try{ var s=window.getSelection(); if(s) s.removeAllRanges(); }catch(_){}
      if(!t) return; openPanel(); ask('Explique-moi ce passage sélectionné sur la page, et aide-moi à le comprendre :\n\n« '+t+' »'); }
    selAsk.addEventListener('mousedown',function(e){ e.preventDefault(); });
    selAsk.addEventListener('touchstart',function(e){ e.preventDefault(); e.stopPropagation(); },{passive:false});
    selAsk.addEventListener('touchend',doAsk,{passive:false});
    selAsk.addEventListener('click',doAsk);
  }
  // ---- Photo (analyse d'image) + dictée vocale ----
  var pendingImg=null;
  function setPending(d){ pendingImg=d; [document.getElementById('cpImgPrev'),document.getElementById('cfImgPrev')].forEach(function(box){ if(!box)return; box.innerHTML='';
    if(d){ var w=document.createElement('div'); w.className='img-prev'; var im=document.createElement('img'); im.src=d; var x=document.createElement('button'); x.className='img-x'; x.innerHTML='&times;'; x.title='Retirer'; x.addEventListener('click',function(){ setPending(null); }); w.appendChild(im); w.appendChild(x); box.appendChild(w); } }); }
  function resizeImg(file){ return new Promise(function(res,rej){ var img=new Image(); var url=URL.createObjectURL(file);
    img.onload=function(){ var mx=1024,w=img.width,h=img.height,sc=Math.min(1,mx/Math.max(w,h)); var cw=Math.max(1,Math.round(w*sc)),ch=Math.max(1,Math.round(h*sc));
      var cv=document.createElement('canvas'); cv.width=cw; cv.height=ch; cv.getContext('2d').drawImage(img,0,0,cw,ch); URL.revokeObjectURL(url);
      try{ res(cv.toDataURL('image/jpeg',0.82)); }catch(e){ rej(e); } };
    img.onerror=function(){ URL.revokeObjectURL(url); rej('img'); }; img.src=url; }); }
  function takeFile(f){ if(!f||f.type.indexOf('image')!==0) return; resizeImg(f).then(function(d){ setPending(d); openPanel(); }).catch(function(){}); }
  var fileInput=document.getElementById('chatFile');
  if(fileInput) fileInput.addEventListener('change',function(){ takeFile(fileInput.files&&fileInput.files[0]); fileInput.value=''; });
  document.querySelectorAll('.attach-btn').forEach(function(b){ b.addEventListener('click',function(){ if(fileInput) fileInput.click(); }); });
  document.addEventListener('paste',function(e){ var open=panel.classList.contains('on')||(full&&!full.hidden); if(!open) return; var it=e.clipboardData&&e.clipboardData.items; if(!it)return; for(var i=0;i<it.length;i++){ if(it[i].type&&it[i].type.indexOf('image')===0){ var f=it[i].getAsFile(); if(f){ takeFile(f); e.preventDefault(); } } } });
  [panel,full].forEach(function(z){ if(!z)return; z.addEventListener('dragover',function(e){ e.preventDefault(); z.classList.add('drag'); }); z.addEventListener('dragleave',function(){ z.classList.remove('drag'); }); z.addEventListener('drop',function(e){ e.preventDefault(); z.classList.remove('drag'); takeFile(e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0]); }); });
  async function callVision(text,dataUrl){
    try{ dataUrl=await agEnhanceImage(dataUrl); }catch(e){}
    var meth=' Procède ainsi : 1) lis attentivement l\'énoncé sur la photo et reformule ce qui est demandé ; 2) identifie les données et la méthode ; 3) résous étape par étape en justifiant chaque calcul (formules en LaTeX $ … $) ; 4) vérifie ton résultat final (recalcule, teste un cas simple) ; 5) donne la réponse finale encadrée. Si c\'est un cours ou un schéma, explique-le clairement.';
    var q=(text?text+'.':'Résous cet exercice photographié.')+meth+' /no_think';
    var draft='';
    var _isPrem=false; try{ _isPrem=!!(window.PB_isPremium && window.PB_isPremium()); }catch(_){}
    try{ window.PB_LAST_AI=_isPrem?'premium':'free'; if(window.PB_paintAiBadge) window.PB_paintAiBadge(); }catch(_){}
    // Premium : IA vision puissante (Groq Qwen vision) via /api/chat
    try{ if(_isPrem){
      var pmsgs=[{role:'system',content:sysText()},{role:'user',content:[{type:'text',text:q},{type:'image_url',image_url:{url:dataUrl}}]}];
      var pr=await callPremiumAI(pmsgs); if(pr){ draft=pr; try{ window.PB_LAST_AI='premium'; }catch(_){} }
    } }catch(e){}
    if(!draft){ try{ window.PB_LAST_AI='free'; if(window.PB_paintAiBadge) window.PB_paintAiBadge(); }catch(_){} }
    if(!draft){ try{ var ok=await ensurePuter(); if(ok){ var r=await puter.ai.chat(q,dataUrl); var t=extract(r); if(t&&t.trim()){ draft=t.trim(); try{ window.PB_LAST_AI='free'; }catch(_){} } } }catch(e){} }
    if(!draft){ try{ var msgs=[{role:'system',content:sysText()},{role:'user',content:[{type:'text',text:q},{type:'image_url',image_url:{url:dataUrl}}]}];
      var res=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'openai',messages:msgs})});
      if(res.ok){ var j=await res.json(); var t2=extract(j); if(t2&&t2.trim()){ draft=t2.trim(); try{ window.PB_LAST_AI='free'; }catch(_){} } } }catch(e){} }
    if(!draft) throw new Error('vision indisponible');
    var refined=draft; try{ refined=await agRefineVision(draft); }catch(_){ refined=draft; }
    try{ refined=agVerifyArithmetic(refined); }catch(_){} try{ refined=agMathNormalize(refined); }catch(_){}
    return refined; }
  async function genImage(prompt){ prompt=(prompt||'').trim(); if(!prompt||busy) return; busy=true;
    if(input) input.value=''; if(cfInput){ cfInput.value=''; autoGrow(cfInput); }
    var c=cur(); c.msgs.push({role:'user',content:'🎨 '+prompt}); if(!c.title||c.title==='Nouvelle conversation') c.title=prompt.slice(0,42); c.t=Date.now(); save(); renderMsgs(); renderList();
    var typ=addTyping();
    var url='https://image.pollinations.ai/prompt/'+encodeURIComponent(prompt)+'?width=768&height=768&nologo=true&seed='+Math.floor(Math.random()*1e6);
    var okimg=await new Promise(function(res){ var im=new Image(); var done=false; im.onload=function(){ if(!done){done=true;res(true);} }; im.onerror=function(){ if(!done){done=true;res(false);} }; im.src=url; setTimeout(function(){ if(!done){done=true;res(!!(im.complete&&im.naturalWidth>0));} },22000); });
    rmTyping(typ);
    if(okimg) c.msgs.push({role:'assistant',content:'Voici l\'image générée pour : « '+prompt+' ».',img:url,gen:1});
    else c.msgs.push({role:'assistant',content:'La génération d\'image n\'a pas abouti (service occupé). Réessaie dans un instant.'});
    c.t=Date.now(); save(); renderMsgs(); renderList(); busy=false;
  }
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition, rec=null;
  if(!SR){ document.querySelectorAll('.mic-btn').forEach(function(b){ b.style.display='none'; }); }
  document.querySelectorAll('.mic-btn').forEach(function(b){ b.addEventListener('click',function(){ if(!SR) return; var ti=activeInput(); if(rec){ rec.stop(); return; }
    rec=new SR(); rec.lang='fr-FR'; rec.interimResults=true; rec.continuous=false; var base=ti.value; b.classList.add('rec');
    rec.onresult=function(e){ var t=''; for(var i=0;i<e.results.length;i++) t+=e.results[i][0].transcript; ti.value=(base?base+' ':'')+t; if(ti===cfInput) autoGrow(cfInput); };
    rec.onerror=function(){}; rec.onend=function(){ b.classList.remove('rec'); rec=null; if(ti) ti.focus(); };
    try{ rec.start(); }catch(e){ b.classList.remove('rec'); rec=null; } }); });
  document.querySelectorAll('.gen-btn').forEach(function(b){ b.addEventListener('click',function(){ var ti=activeInput(); var v=(ti&&ti.value.trim())||''; if(!v){ openPanel(); var t2=activeInput(); if(t2){ t2.placeholder='Décris l\'image à créer, puis reclique 🎨'; t2.focus(); } return; } genImage(v); }); });
  var cfMenu=document.getElementById('cfMenu'); if(cfMenu&&full) cfMenu.addEventListener('click',function(e){ e.stopPropagation(); full.classList.toggle('side-open'); });
  if(cfList) cfList.addEventListener('click',function(){ if(full) full.classList.remove('side-open'); });
  document.addEventListener('touchend',function(){ setTimeout(handleSel,300); });
  /* ====== Couche AGENT / OUTILS (planning, série, fiche, navigation, QCM, image) ====== */
/* ===================== TUTEUR IA — COUCHE « AGENT / OUTILS » ===================== */
/* Fonctions pures (testables sous node) + fonctions DOM (navigateur).              */

function agEsc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function agInline(s){ s=agEsc(s);
  s=s.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');
  s=s.replace(/\*([^*\n]+)\*/g,'<i>$1</i>');
  s=s.replace(/`([^`]+)`/g,'<code>$1</code>');
  return s; }
function agMd(md){
  var lines=String(md).replace(/\r/g,'').split('\n');
  var out=[], i=0;
  function isRow(l){ return /^\s*\|.*\|\s*$/.test(l); }
  function isSep(l){ return l.indexOf('-')>=0 && /^\s*\|?[\s:|-]+\|?\s*$/.test(l); }
  function cells(r){ r=r.trim().replace(/^\|/,'').replace(/\|$/,''); return r.split('|').map(function(c){return c.trim();}); }
  while(i<lines.length){
    var l=lines[i];
    if(/^\s*$/.test(l)){ i++; continue; }
    if(isRow(l) && i+1<lines.length && isSep(lines[i+1])){
      var th=cells(l).map(function(c){return '<th>'+agInline(c)+'</th>';}).join(''); i+=2;
      var trs=''; while(i<lines.length && isRow(lines[i])){ trs+='<tr>'+cells(lines[i]).map(function(c){return '<td>'+agInline(c)+'</td>';}).join('')+'</tr>'; i++; }
      out.push('<table class="ag-tbl"><thead><tr>'+th+'</tr></thead><tbody>'+trs+'</tbody></table>'); continue;
    }
    var hm=l.match(/^(#{1,4})\s+(.*)$/);
    if(hm){ var lv=hm[1].length; out.push('<h'+lv+'>'+agInline(hm[2].trim())+'</h'+lv+'>'); i++; continue; }
    if(/^\s*(---+|\*\*\*+|___+)\s*$/.test(l)){ out.push('<hr>'); i++; continue; }
    if(/^\s*[-*•]\s+/.test(l)){ var u=''; while(i<lines.length && /^\s*[-*•]\s+/.test(lines[i])){ u+='<li>'+agInline(lines[i].replace(/^\s*[-*•]\s+/,''))+'</li>'; i++; } out.push('<ul>'+u+'</ul>'); continue; }
    if(/^\s*\d+[.)]\s+/.test(l)){ var o=''; while(i<lines.length && /^\s*\d+[.)]\s+/.test(lines[i])){ o+='<li>'+agInline(lines[i].replace(/^\s*\d+[.)]\s+/,''))+'</li>'; i++; } out.push('<ol>'+o+'</ol>'); continue; }
    var buf=[l]; i++;
    while(i<lines.length && !/^\s*$/.test(lines[i]) && !/^\s*(#{1,4}\s|[-*•]\s|\d+[.)]\s)/.test(lines[i]) && !isRow(lines[i])){ buf.push(lines[i]); i++; }
    out.push('<p>'+agInline(buf.join(' '))+'</p>');
  }
  return out.join('\n');
}
function agJson(s){ s=String(s).trim().replace(/^```(json)?/i,'').replace(/```$/,'').trim();
  try{ return JSON.parse(s); }catch(e){}
  var i=s.indexOf('{'), j=s.lastIndexOf('}'); if(i>=0&&j>i){ try{ return JSON.parse(s.slice(i,j+1)); }catch(e2){} }
  return null; }
function agParse(text){
  text=String(text||''); var actions=[];
  var re=/\[\[PB\]\]([\s\S]*?)\[\[\/PB\]\]/g, m;
  while((m=re.exec(text))){ var a=agJson(m[1]); if(a) actions.push(a); }
  var clean=text.replace(re,'').trim();
  if(!actions.length){ var m2=clean.match(/\[\[PB\]\]([\s\S]*)$/); if(m2){ var a2=agJson(m2[1]); if(a2){ actions.push(a2); clean=clean.slice(0,m2.index).trim(); } } }
  clean=clean.replace(/```json\s*```/gi,'').replace(/\[\[\/?PB\]\]/g,'').trim();
  return {clean:clean, actions:actions};
}
function agSubjKey(s){ s=(s||'').toString().toLowerCase();
  if(/\bmath|d[ée]riv|limite|logique|suite|barycentre|produit scalaire|trigo|d[ée]nombre|arithm/.test(s)) return 'maths';
  if(/phys|chim|\bpc\b|m[ée]can|[ée]lectr|\bmole|r[ée]action|mouvement|\bforce|ampli|cin[ée]matique|onde/.test(s)) return 'pc';
  if(/\bsvt|biolog|g[ée]olog|cellul|g[ée]n[ée]tique/.test(s)) return 'svt';
  if(/fran[çc]|dernier jour|antigone|bo[iî]te [àa] merveille/.test(s)) return 'francais';
  if(/philo/.test(s)) return 'philo';
  if(/arabe|عرب/.test(s)) return 'arabe';
  if(/islam|isla/.test(s)) return 'islam';
  if(/hist|g[ée]o\b|\bhg\b/.test(s)) return 'hg';
  return '';
}
function agPageFile(p){ p=(p||'').toString().toLowerCase();
  var map=[['r[ée]vision','revision.html'],['revoir','revision.html'],['cours','revision.html'],['le[cç]on','revision.html'],
    ['qcm','qcm.html'],['quiz','qcm.html'],['flashcard','flashcards.html'],['carte','flashcards.html'],
    ['outil','outils.html'],['calculatrice','outils.html'],['tableau p[ée]riodique','outils.html'],['convertisseur','outils.html'],
    ['progr[eè]s','progres.html'],['examen','examens.html'],['accueil','index.html'],['coran','youssef.html'],['echec|echecs|jeu d.?echec','echecs.html'],['\bcode\b|editeur|programmation','code.html']];
  for(var k=0;k<map.length;k++){ if(new RegExp(map[k][0]).test(p)) return map[k][1]; } return null;
}
function agGuessTitle(md){ var m=String(md).match(/^#{1,3}\s+(.+)$/m); if(m) return m[1].replace(/[*`#]/g,'').trim().slice(0,72);
  var l=(String(md).trim().split('\n')[0]||'Document'); return l.replace(/[*`#>-]/g,'').trim().slice(0,72)||'Document'; }
function agQuick(t){ var s=(t||'').toLowerCase().trim();
  var im=s.match(/^(?:g[ée]n[èe]re|cr[ée]{1,2}|dessine|fais|fabrique)\s+(?:moi\s+)?(?:une?\s+|un\s+)?(?:image|dessin|illustration|sch[ée]ma|photo|logo)\s+(?:de\s+|du\s+|des\s+|d'|sur\s+|:)?\s*(.+)/);
  if(!im){ im=s.match(/^image\s*(?:de\s+|d'|:)\s*(.+)/); }
  if(im && im[1] && im[1].length>2){ return {kind:'image', prompt:t.slice(t.length-im[1].length).trim()}; }
  var NOUN=/(page|onglet|section|cours|le[cç]on|chapitre|r[ée]vision|qcm|quiz|flashcard|carte|outil|examen|progr[eè]s|accueil|calculatrice|simulateur|coran|tableau p[ée]riodique|convertisseur)/;
  if(/(lance|d[ée]marre|commence|fais|teste?|entra[iî]ne)\b[^.]*\b(qcm|quiz)\b/.test(s) || /^qcm\b/.test(s)){
    return {kind:'qcm', subj:agSubjKey(s)}; }
  if(/^(ouvre|va\s+(?:sur|[àa]|au|aux)|montre(?:[- ]moi)?|affiche|em(?:m[èe]ne)|am[èe]ne|conduis|acc[èe]de|rends[- ]toi|dirige)\b/.test(s) && NOUN.test(s)){
    if(/qcm|quiz/.test(s)) return {kind:'qcm', subj:agSubjKey(s)};
    return {kind:'nav', page:agPageFile(s), subj:agSubjKey(s), lesson:s}; }
  return null;
}

/* ---- Couche AGENT : fonctions navigateur (insérées DANS l'IIFE du chat) ---- */
var AG_CSS = ''
+ '.ag-modal{position:fixed;inset:0;z-index:100000;background:rgba(20,18,40,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto}'
+ '.ag-modal[hidden]{display:none!important}'
+ '.ag-in{background:#fff;color:#1b1b22;max-width:840px;width:100%;border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.4);overflow:hidden;margin:auto}'
+ '.ag-bar{position:sticky;top:0;display:flex;gap:8px;flex-wrap:wrap;padding:11px 14px;background:#f3f1fb;border-bottom:1px solid #e2ddf3;z-index:2}'
+ '.ag-bar .btn{font-size:.85rem;padding:8px 13px}'
+ '.ag-holder{padding:26px 30px}'
+ '.ag-head{display:flex;justify-content:space-between;align-items:center;border-bottom:2.4px solid #4b3fa7;padding-bottom:9px;margin-bottom:6px}'
+ '.ag-brand{font-weight:800;font-size:1.05rem;color:#4b3fa7;font-family:inherit}'
+ '.ag-brand span{color:#9c7522}'
+ '.ag-kind{font-weight:700;font-size:.62rem;letter-spacing:.06em;color:#fff;background:#4b3fa7;padding:4px 11px;border-radius:6px;text-transform:uppercase}'
+ '.ag-title{font-size:1.5rem;text-align:center;color:#1f2340;margin:14px 0 4px}'
+ '.ag-body{font-size:.96rem;line-height:1.6;color:#22222c}'
+ '.ag-body h1{font-size:1.35rem;color:#1f2340;margin:16px 0 6px}'
+ '.ag-body h2{font-size:1.02rem;color:#fff;background:#4b3fa7;padding:6px 12px;border-radius:5px;margin:18px 0 8px}'
+ '.ag-body h3{font-size:.98rem;color:#4b3fa7;margin:14px 0 5px;border-left:3px solid #9c7522;padding-left:9px}'
+ '.ag-body h4{font-size:.92rem;color:#33305e;margin:12px 0 4px}'
+ '.ag-body p{margin:8px 0}'
+ '.ag-body ul,.ag-body ol{margin:8px 0 8px 4px;padding-left:22px}'
+ '.ag-body li{margin:4px 0}'
+ '.ag-body code{background:#f0eef8;border:1px solid #e0dcef;border-radius:4px;padding:1px 5px;font-family:JetBrains Mono,monospace;font-size:.86em}'
+ '.ag-body hr{border:0;border-top:1px dashed #cfc9ec;margin:14px 0}'
+ '.ag-body b{color:#33305e}'
+ '.ag-tbl{width:100%;border-collapse:collapse;margin:10px 0;font-size:.9rem}'
+ '.ag-tbl th,.ag-tbl td{border:1px solid #d2cde8;padding:7px 9px;text-align:left;vertical-align:top}'
+ '.ag-tbl th{background:#eceafb;color:#33305e}'
+ '.ag-tbl tbody tr:nth-child(even){background:#faf9fe}'
+ '.ag-foot{margin-top:20px;padding-top:10px;border-top:1px solid #e6e2f2;font-size:.72rem;color:#8a86a0;text-align:center}'
+ '@media print{body>*{display:none!important}#pbDocModal{display:block!important;position:static;background:#fff;padding:0;overflow:visible}#pbDocModal .ag-bar{display:none!important}#pbDocModal .ag-in{box-shadow:none;border:0;max-width:none;border-radius:0}#pbDocModal .ag-holder{padding:0}}';

function agToast(m){ try{ toast(m); }catch(e){} }
function agModal(){
  var m=document.getElementById('pbDocModal'); if(m) return m;
  var st=document.createElement('style'); st.textContent=AG_CSS; document.head.appendChild(st);
  m=document.createElement('div'); m.id='pbDocModal'; m.className='ag-modal'; m.hidden=true;
  m.innerHTML='<div class="ag-in"><div class="ag-bar"><button class="btn ask" id="agPrint">&#128424; Imprimer / PDF</button><button class="btn" id="agDl">&#8681; Télécharger (.md)</button><button class="btn" id="agClose">Fermer</button></div><div class="ag-holder" id="agHolder"></div></div>';
  document.body.appendChild(m);
  function hide(){ m.hidden=true; document.body.classList.remove('noscroll'); }
  m.querySelector('#agClose').addEventListener('click',hide);
  m.addEventListener('click',function(e){ if(e.target===m) hide(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !m.hidden) hide(); });
  m.querySelector('#agPrint').addEventListener('click',function(){ try{ window.print(); }catch(e){} });
  m.querySelector('#agDl').addEventListener('click',function(){ try{ var name=(m._name||'document').replace(/[^\wÀ-ɏ -]+/g,'').trim().replace(/\s+/g,'-').toLowerCase()||'document';
    var blob=new Blob([m._md||''],{type:'text/markdown;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name+'.md'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },1200); }catch(e){} });
  return m;
}
function agDocFromText(md, title, kind){
  md=String(md||''); var m=agModal(); m._md=md; m._name=title||agGuessTitle(md);
  var holder=m.querySelector('#agHolder');
  var head='<div class="ag-head"><div class="ag-brand">&#9822; Plan de <span>Bataille</span></div><div class="ag-kind">'+agEsc(kind||'DOCUMENT')+'</div></div>';
  var h1=title?('<h1 class="ag-title">'+agEsc(title)+'</h1>'):'';
  holder.innerHTML=head+h1+'<div class="ag-body">'+agMd(md)+'</div><div class="ag-foot">&#9822; Plan de Bataille &middot; Tuteur IA &middot; document généré pour t\'aider à réviser</div>';
  try{ renderMath(holder); }catch(_){}
  try{ agEnhanceCode(holder); }catch(_){}
  m.hidden=false; document.body.classList.add('noscroll'); holder.scrollTop=0;
}
function agApplyHash(){
  var h=location.hash||''; if(!h) return;
  var sm=h.match(/[#&]s=([a-z]+)/);
  if(sm){ var tab=document.querySelector('.subject-tab[data-subj="'+sm[1]+'"]'); if(tab){ try{ tab.click(); }catch(e){} try{ tab.scrollIntoView({block:'center'}); }catch(e){} }
    var lm=h.match(/[#&]l=([^&]+)/);
    if(lm){ var kw=decodeURIComponent(lm[1]).toLowerCase().split(/\s+/).filter(function(w){return w.length>3;});
      setTimeout(function(){ var pan=document.querySelector('.subject-panel[data-panel="'+sm[1]+'"]')||document;
        var heads=pan.querySelectorAll('.lz-head');
        for(var i=0;i<heads.length;i++){ var tx=(heads[i].textContent||'').toLowerCase(); var hit=kw.some(function(w){return tx.indexOf(w)>=0;});
          if(hit){ try{ heads[i].click(); heads[i].scrollIntoView({block:'center'}); }catch(e){} break; } } },350); } }
  var qm=h.match(/[#&]qcm=([a-z]+)(?::(\d+))?/);
  if(qm){ var ss=document.getElementById('qzSubj'), cs=document.getElementById('qzCh'), sb=document.getElementById('qzStart');
    if(ss&&sb){ try{ ss.value=qm[1]; ss.dispatchEvent(new Event('change')); }catch(e){} if(qm[2]&&cs){ try{ cs.value=qm[2]; }catch(e){} }
      setTimeout(function(){ try{ sb.click(); var ar=document.getElementById('qzArea'); if(ar) ar.scrollIntoView({block:'start'}); }catch(e){} },200); } }
  if(/[#&]moy/.test(h)){ var mb=document.getElementById('moyBtn'); if(mb){ try{ mb.scrollIntoView({block:'center'}); }catch(e){} } }
}
function agHere(file){ try{ return location.pathname.split('/').pop().toLowerCase()===file; }catch(e){ return false; } }
function agGo(args){ args=args||{};
  var file=agPageFile(args.page||args.destination||args.cible||'');
  var subj=agSubjKey(args.matiere||args.subject||args.subj||args.matière||'');
  var lesson=(args.lecon||args.lesson||args.chapitre||args.chapter||'').toString();
  if(!file){ if(subj||lesson) file='revision.html'; else return; }
  if(subj && !agSubjKey(subj)) subj=agSubjKey(lesson);
  var hash='';
  if(file==='revision.html' && subj){ hash='#s='+subj+(lesson?'&l='+encodeURIComponent(lesson):''); }
  else if(args.hash){ hash='#'+args.hash; }
  if(agHere(file)){ if(hash){ location.hash=hash; agApplyHash(); } else { window.scrollTo({top:0,behavior:'smooth'}); } return; }
  agToast('Ouverture : '+file.replace('.html','')+(subj?' · '+subj:'')+' …');
  setTimeout(function(){ location.href=file+hash; },450);
}
function agQcm(args){ args=args||{}; var subj=agSubjKey(args.matiere||args.subject||args.subj||args.chapitre||args.chapter||'')||'maths';
  var ch=args.chapitre!=null?args.chapitre:(args.chapter!=null?args.chapter:'');
  var hash='#qcm='+subj; if(ch!=='' && ch!=null && !isNaN(parseInt(ch,10))) hash+=':'+parseInt(ch,10);
  if(agHere('qcm.html')){ location.hash=hash; agApplyHash(); return; }
  agToast('Lancement du QCM · '+subj+' …'); setTimeout(function(){ location.href='qcm.html'+hash; },450);
}
function agRun(a, sourceText){
  if(!a) return false;
  var tool=(a.outil||a.tool||a.action||a.name||'').toString().toLowerCase();
  var args=a.args||a.arguments||a.parametres||a; if(typeof args!=='object'||args===null) args={};
  if(tool.indexOf('page')>=0 || tool.indexOf('onglet')>=0){ if(agCreatePage(args, sourceText)) return true; }
  if(tool.indexOf('graph')>=0 || tool.indexOf('courbe')>=0 || tool.indexOf('plot')>=0 || tool.indexOf('trace')>=0 || (tool.indexOf('fonction')>=0 && (args.fonctions||args.fonction))){ var _fs=args.fonctions||args.functions||args.courbes||(args.fonction?[args.fonction]:(args.f?[args.f]:[])); if(!Array.isArray(_fs)) _fs=[_fs]; _fs=_fs.filter(Boolean).map(String); if(_fs.length && agPlotBubble(_fs,{xmin:args.xmin,xmax:args.xmax})) return true; }
  if(tool.indexOf('sondage')>=0 || tool.indexOf('survey')>=0 || tool.indexOf('questionnaire')>=0 || tool.indexOf('dispo')>=0){ if(agSurvey(args)) return true; }
  if(tool.indexOf('theme')>=0 || tool.indexOf('thème')>=0 || tool.indexOf('apparence')>=0 || tool.indexOf('sombre')>=0 || tool.indexOf('clair')>=0){ if(agTheme(args)) return true; }
  if(tool.indexOf('memoire')>=0 || tool.indexOf('mémoire')>=0 || tool.indexOf('souvi')>=0 || tool.indexOf('profil')>=0 || tool.indexOf('retiens')>=0){ if(agRemember(args)) return true; }
  if(tool.indexOf('style')>=0 || tool.indexOf('css')>=0 || tool.indexOf('apparence')>=0 || tool.indexOf('couleur')>=0 || tool.indexOf('fond')>=0 || tool.indexOf('personnalis')>=0){ try{ agPushUndo(); }catch(_){} if(agStyleAction(args)) return true; }
  if(tool.indexOf('doc')>=0 || tool.indexOf('imprim')>=0 || tool.indexOf('planning')>=0 || tool.indexOf('fiche')>=0 || tool.indexOf('série')>=0 || tool.indexOf('serie')>=0 || tool.indexOf('exerc')>=0){
    agDocFromText(sourceText, args.titre||args.title||args.nom||agGuessTitle(sourceText), (args.type||args.kind||args.genre||'DOCUMENT')); return true; }
  if(Array.isArray(args.questions) && args.questions.length){ if(agQuiz(args)) return true; }
  if(tool.indexOf('quiz')>=0 || tool.indexOf('interactif')>=0){ if(agQuiz(args)) return true; agQcm(args); return true; }
  if(tool.indexOf('qcm')>=0){ agQcm(args); return true; }
  if(tool.indexOf('img')>=0 || tool.indexOf('image')>=0 || tool.indexOf('dessin')>=0){ var p=args.description||args.prompt||args.desc||args.sujet||''; if(p){ genImage(p); return true; } return false; }
  if(tool.indexOf('moy')>=0){ agGo({page:'outils',hash:'moy'}); return true; }
  if(tool.indexOf('editeur')>=0 || tool.indexOf('éditeur')>=0 || tool.indexOf('editor')>=0 || tool==='ide' || tool.indexOf('projet')>=0 || tool.indexOf('vscode')>=0){
    var ef=args.fichiers||args.files||args.fichier||null; if(ef && !Array.isArray(ef)) ef=[ef];
    if(!(ef&&ef.length)) ef=agBlocksFrom(sourceText||'').map(function(b){ return {name:b.name,content:b.code}; });
    if(agToEditor(ef)) return true; }
  if(tool.indexOf('aller')>=0 || tool.indexOf('nav')>=0 || tool==='go' || tool.indexOf('ouvr')>=0 || tool.indexOf('flashcard')>=0 || tool.indexOf('carte')>=0){ agGo(args); return true; }
  return false;
}

  /* ===== Tuteur IA v2 (streaming, quiz interactif, chips) ===== */
/* ===== Tuteur IA v2 : écriture progressive, QCM interactif, suggestions, markdown enrichi ===== */
var genCancel=false;
var PBCHAT_CSS=''
+ '.cb-cur{display:inline-block;width:.5em;color:var(--accent,#6c5ce7);animation:cbBlink 1s steps(2) infinite}'
+ '@keyframes cbBlink{0%,50%{opacity:1}50.01%,100%{opacity:0}}'
+ '.cp-msg.ai .cb-h{font-weight:800;margin:6px 0 2px;font-size:.98em}'
+ '.cp-msg.ai .cb-ul,.cp-msg.ai .cb-ol{margin:4px 0 4px 2px;padding-left:20px}'
+ '.cp-msg.ai .cb-ul li,.cp-msg.ai .cb-ol li{margin:2px 0}'
+ '.cp-msg.ai code{background:rgba(120,110,200,.14);border-radius:4px;padding:1px 5px;font-family:JetBrains Mono,monospace;font-size:.88em}'
+ '.cb-stop{display:block;margin:6px auto;padding:5px 14px;border:1px solid rgba(140,130,210,.5);background:transparent;color:inherit;border-radius:16px;font-size:.8rem;cursor:pointer;opacity:.85}'
+ '.cb-stop:hover{opacity:1;background:rgba(140,130,210,.12)}'
+ '.cp-chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 2px 8px}'
+ '.cp-chip{border:1px solid rgba(140,130,210,.45);background:rgba(140,130,210,.08);color:inherit;border-radius:16px;padding:5px 11px;font-size:.78rem;cursor:pointer;line-height:1.2}'
+ '.cp-chip:hover{background:rgba(140,130,210,.2)}'
+ '.qz-w{background:linear-gradient(180deg,rgba(120,110,200,.10),rgba(120,110,200,.03));border:1px solid rgba(120,110,200,.35)!important;border-radius:14px!important;padding:12px 13px!important;max-width:100%!important}'
+ '.qzc-head{font-weight:800;font-size:.82rem;color:var(--accent,#6c5ce7);letter-spacing:.02em;margin-bottom:6px}'
+ '.qzc-q{font-weight:600;margin-bottom:9px;line-height:1.45}'
+ '.qzc-opts{display:flex;flex-direction:column;gap:7px}'
+ '.qzc-opt{display:flex;align-items:center;gap:9px;text-align:left;width:100%;padding:9px 11px;border:1.5px solid rgba(140,130,210,.4);background:rgba(255,255,255,.55);color:inherit;border-radius:10px;cursor:pointer;font-size:.9rem;line-height:1.35;transition:.12s}'
+ '.qzc-opt:hover:not(:disabled){border-color:var(--accent,#6c5ce7);background:rgba(140,130,210,.12)}'
+ '.qzc-opt:disabled{cursor:default;opacity:.92}'
+ '.qzc-let{flex:none;width:22px;height:22px;border-radius:50%;background:rgba(120,110,200,.18);color:var(--accent,#6c5ce7);font-weight:800;font-size:.78rem;display:flex;align-items:center;justify-content:center}'
+ '.qzc-opt.ok{border-color:#1f9d55;background:rgba(31,157,85,.16)}.qzc-opt.ok .qzc-let{background:#1f9d55;color:#fff}'
+ '.qzc-opt.bad{border-color:#d64545;background:rgba(214,69,69,.14)}.qzc-opt.bad .qzc-let{background:#d64545;color:#fff}'
+ '.qzc-exp{margin-top:9px;font-size:.86rem;line-height:1.5;padding:8px 11px;border-radius:9px;border:1px solid rgba(140,130,210,.3)}'
+ '.qzc-exp.g{background:rgba(31,157,85,.10);border-color:rgba(31,157,85,.4)}'
+ '.qzc-exp.b{background:rgba(214,69,69,.09);border-color:rgba(214,69,69,.35)}'
+ '.qzc-next{margin-top:10px;padding:8px 15px;border:0;background:var(--accent,#6c5ce7);color:#fff;border-radius:9px;font-weight:700;font-size:.86rem;cursor:pointer}'
+ '.qzc-next:hover{filter:brightness(1.06)}'
+ '.qzc-final{font-size:1rem;margin:6px 0}';
function ensureChatCss(){ if(document.getElementById('pbChatCss')) return; var s=document.createElement('style'); s.id='pbChatCss'; s.textContent=PBCHAT_CSS; document.head.appendChild(s); }
function fmtInlineLight(s){ var h=esc(s); h=h.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>'); h=h.replace(/`([^`]+)`/g,'<code>$1</code>'); h=h.replace(/\n/g,'<br>'); return h; }
function fmtChat(s){
  var lines=String(s).replace(/\r/g,'').split('\n'); var out=[]; var i=0;
  function inl(t){ t=esc(t); t=t.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>'); t=t.replace(/`([^`]+)`/g,'<code>$1</code>'); return t; }
  while(i<lines.length){ var l=lines[i];
    var hm=l.match(/^\s*#{1,4}\s+(.*)/); if(hm){ out.push('<div class="cb-h">'+inl(hm[1])+'</div>'); i++; continue; }
    if(/^\s*[-*•]\s+/.test(l)){ var u=''; while(i<lines.length&&/^\s*[-*•]\s+/.test(lines[i])){ u+='<li>'+inl(lines[i].replace(/^\s*[-*•]\s+/,''))+'</li>'; i++; } out.push('<ul class="cb-ul">'+u+'</ul>'); continue; }
    if(/^\s*\d+[.)]\s+/.test(l)){ var o=''; while(i<lines.length&&/^\s*\d+[.)]\s+/.test(lines[i])){ o+='<li>'+inl(lines[i].replace(/^\s*\d+[.)]\s+/,''))+'</li>'; i++; } out.push('<ol class="cb-ol">'+o+'</ol>'); continue; }
    if(/^\s*$/.test(l)){ out.push('<br>'); i++; continue; }
    out.push('<div>'+inl(l)+'</div>'); i++;
  }
  return out.join('');
}
function agActiveBox(){ return (full&&!full.hidden)?cfMsgs:msgsEl; }
function agStop(box){ agStopHide(); if(!box) return; var b=document.createElement('button'); b.id='agStopBtn'; b.className='cb-stop'; b.textContent='⏹ Arrêter'; b.addEventListener('click',function(){ genCancel=true; }); box.appendChild(b); }
function agStopHide(){ var b=document.getElementById('agStopBtn'); if(b&&b.parentNode) b.parentNode.removeChild(b); }
function typeReveal(fullText){ return new Promise(function(resolve){
  ensureChatCss(); var box=agActiveBox(); if(!box){ resolve(); return; }
  var d=document.createElement('div'); d.className='cp-msg ai'; box.appendChild(d);
  var toks=String(fullText).split(/(\s+)/); var i=0, acc=''; genCancel=false; agStop(box);
  var total=toks.length, step=Math.max(1,Math.round(total/110));
  var iv=setInterval(function(){
    if(genCancel){ acc=String(fullText); i=total; }
    for(var k=0;k<step&&i<total;k++){ acc+=toks[i++]; }
    d.innerHTML=fmtInlineLight(acc)+(i<total?'<span class="cb-cur">▍</span>':''); box.scrollTop=box.scrollHeight;
    if(i>=total){ clearInterval(iv); if(d.parentNode) d.parentNode.removeChild(d); agStopHide(); resolve(); }
  }, 20);
}); }
function agChips(){ ensureChatCss(); var box=agActiveBox(); if(!box) return;
  var row=document.createElement('div'); row.className='cp-chips';
  ['Donne un exemple concret','Un exercice pour m\'entraîner','Explique plus simplement','Teste-moi (QCM interactif)'].forEach(function(t){
    var c=document.createElement('button'); c.className='cp-chip'; c.textContent=t; c.addEventListener('click',function(){ ask(t); }); row.appendChild(c); });
  box.appendChild(row); box.scrollTop=box.scrollHeight;
}
function agQuizBuild(box,title,qs){
  ensureChatCss(); var wrap=document.createElement('div'); wrap.className='cp-msg ai qz-w'; var idx=0, score=0, summarized=false;
  function norm(q){ var c=(q.correct!=null?q.correct:(q.reponse!=null?q.reponse:(q.answer!=null?q.answer:q.bonne)));
    if(typeof c==='string'){ var L='ABCDEFGH'.indexOf(c.trim().toUpperCase()); c=(L>=0?L:parseInt(c,10)); }
    return {q:(q.q||q.question||''), ch:(q.choix||q.choices||q.options||q.reponses||[]), c:c, e:(q.explication||q.explanation||q.exp||'')}; }
  function render(){
    if(idx>=qs.length){ var pct=Math.round(score/qs.length*100);
      wrap.innerHTML='<div class="qzc-head">🏁 '+esc(title)+'</div><div class="qzc-final">Score : <b>'+score+' / '+qs.length+'</b> · '+pct+'%'+(pct>=80?' — excellent ! 🎉':(pct>=50?' — bien, continue 💪':' — on révise et on recommence 👍'))+'</div>';
      var again=document.createElement('button'); again.className='qzc-next'; again.textContent='↻ Recommencer'; again.addEventListener('click',function(){ idx=0; score=0; wrap._a=false; render(); }); wrap.appendChild(again);
      if(pct<70){ var rev=document.createElement('button'); rev.className='qzc-next'; rev.style.marginLeft='8px'; rev.style.background='#9c7522'; rev.textContent='📚 Réviser ce chapitre'; rev.addEventListener('click',function(){ ask('Je viens d\'avoir '+score+'/'+qs.length+' au QCM « '+title+' ». Explique-moi clairement ce chapitre, insiste sur mes erreurs probables, et donne-moi 3 exercices corrigés pour progresser.'); }); wrap.appendChild(rev); }
      try{ if(window.PB_award) window.PB_award(qs.length*3,'QCM du Tuteur IA',{qcm:qs.length}); }catch(e){}
      try{ agRecordScore(title,score,qs.length); }catch(e){}
      if(!summarized){ summarized=true; try{ var c=cur(); c.msgs.push({role:'assistant',content:'✅ QCM « '+title+' » terminé — score '+score+'/'+qs.length+' ('+pct+'%).'}); c.t=Date.now(); save(); }catch(e){} }
      box.scrollTop=box.scrollHeight; return; }
    var q=norm(qs[idx]);
    wrap.innerHTML='<div class="qzc-head">❓ '+esc(title)+' · question '+(idx+1)+'/'+qs.length+'</div><div class="qzc-q">'+fmtChat(q.q)+'</div>';
    var opts=document.createElement('div'); opts.className='qzc-opts'; wrap._a=false;
    q.ch.forEach(function(ch,i){ var b=document.createElement('button'); b.className='qzc-opt'; b.type='button';
      b.innerHTML='<span class="qzc-let">'+('ABCDEFGH'[i]||'?')+'</span><span>'+esc(String(ch))+'</span>';
      b.addEventListener('click',function(){ if(wrap._a) return; wrap._a=true; var good=(i===q.c); if(good) score++;
        Array.prototype.forEach.call(opts.children,function(x,j){ x.disabled=true; if(j===q.c) x.classList.add('ok'); if(j===i&&!good) x.classList.add('bad'); });
        var ex=document.createElement('div'); ex.className='qzc-exp '+(good?'g':'b'); ex.innerHTML='<b>'+(good?'✅ Bonne réponse !':'❌ Pas tout à fait.')+'</b> '+fmtChat(q.e);
        wrap.appendChild(ex);
        var nx=document.createElement('button'); nx.className='qzc-next'; nx.textContent=(idx+1>=qs.length?'Voir mon score →':'Question suivante →');
        nx.addEventListener('click',function(){ idx++; render(); }); wrap.appendChild(nx); box.scrollTop=box.scrollHeight;
      }); opts.appendChild(b); });
    wrap.appendChild(opts); box.scrollTop=box.scrollHeight;
  }
  render(); return wrap;
}
function agQuiz(args){ if(!args) return false; var qs=args.questions||args.qcm||args.items||args.quiz; if(!Array.isArray(qs)||!qs.length) return false;
  var box=agActiveBox(); if(!box) return false; var title=args.titre||args.title||args.sujet||'QCM'; box.appendChild(agQuizBuild(box,title,qs)); box.scrollTop=box.scrollHeight; return true; }

  /* ===== Agent : création de pages ===== */
/* ===== Agent « créer une page/onglet » : l'IA génère une vraie page persistante ===== */
var PG_CSS=''
+ '#pbPagesModal{position:fixed;inset:0;z-index:100001;background:rgba(20,18,40,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto}'
+ '#pbPagesModal[hidden]{display:none!important}'
+ '#pbPagesModal .pg-in{background:var(--card,#fff);color:inherit;max-width:640px;width:100%;border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.4);overflow:hidden;margin:auto}'
+ '#pbPagesModal .pg-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 16px;border-bottom:1px solid rgba(140,130,210,.25)}'
+ '#pbPagesModal .pg-ttl{font-weight:800;font-size:1.05rem}'
+ '#pbPagesModal .pg-ttl span{color:var(--accent,#6c5ce7)}'
+ '#pbPagesModal .pg-close{border:0;background:transparent;color:inherit;font-size:1.5rem;cursor:pointer;line-height:1;opacity:.7}'
+ '#pbPagesModal .pg-close:hover{opacity:1}'
+ '#pbPagesModal .pg-list{padding:10px 14px 16px;max-height:70vh;overflow:auto}'
+ '#pbPagesModal .pg-row{display:flex;align-items:stretch;gap:8px;margin:8px 0}'
+ '#pbPagesModal .pg-open{flex:1;display:flex;align-items:center;gap:11px;text-align:left;padding:12px 13px;border:1px solid rgba(140,130,210,.32);background:rgba(140,130,210,.06);color:inherit;border-radius:11px;cursor:pointer}'
+ '#pbPagesModal .pg-open:hover{border-color:var(--accent,#6c5ce7);background:rgba(140,130,210,.14)}'
+ '#pbPagesModal .pg-emo{font-size:1.3rem;flex:none}'
+ '#pbPagesModal .pg-t{font-weight:700;flex:1;line-height:1.3}'
+ '#pbPagesModal .pg-d{font-size:.72rem;opacity:.6;flex:none}'
+ '#pbPagesModal .pg-del{flex:none;width:42px;border:1px solid rgba(214,69,69,.3);background:rgba(214,69,69,.06);color:#d64545;border-radius:11px;font-size:1.3rem;cursor:pointer}'
+ '#pbPagesModal .pg-del:hover{background:rgba(214,69,69,.16)}'
+ '#pbPagesModal .pg-empty{padding:26px 12px;text-align:center;opacity:.75;line-height:1.6}'
+ '#pbPagesModal .pg-note{padding:0 16px 16px;font-size:.76rem;opacity:.6;line-height:1.5}';
function agLoadPages(){ try{ return JSON.parse(localStorage.getItem('pb_pages'))||[]; }catch(e){ return []; } }
function agSavePages(a){ try{ localStorage.setItem('pb_pages',JSON.stringify(a.slice(0,60))); }catch(e){} if(window.PB_onPagesChange){ try{ window.PB_onPagesChange(a.slice(0,60)); }catch(e){} } agPagesBadge(); }
window.PB_pages={ getAll:function(){ return agLoadPages(); }, setAll:function(arr){ if(Array.isArray(arr)){ try{ localStorage.setItem('pb_pages',JSON.stringify(arr.slice(0,60))); }catch(e){} agPagesBadge(); } } };
function agPagesBadge(){ try{ var n=agLoadPages().length; document.querySelectorAll('.nav-pages-badge').forEach(function(b){ b.textContent=n?('('+n+')'):''; }); }catch(e){} }
function agCreatePage(args, sourceText){ args=args||{};
  var md=args.contenu||args.markdown||args.corps||args.content||args.texte||sourceText||'';
  if(!md || !String(md).trim()){ agToast('La page était vide.'); return false; }
  var title=(args.titre||args.title||args.nom||agGuessTitle(md)||'Nouvelle page').toString().slice(0,80);
  var emoji=(args.emoji||args.icone||'✦').toString().slice(0,4);
  var id='pg'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
  var pages=agLoadPages(); pages.unshift({id:id,title:title,emoji:emoji,md:String(md),t:Date.now()}); agSavePages(pages);
  agToast('✦ Nouvelle page créée : '+title);
  setTimeout(function(){ agOpenPage(id); },250);
  return true;
}
function agOpenPage(id){ var p=agLoadPages().filter(function(x){return x.id===id;})[0]; if(!p){ agToast('Page introuvable.'); return; }
  agDocFromText(p.md, (p.emoji?p.emoji+' ':'')+p.title, 'PAGE CRÉÉE PAR L\'IA'); }
function agPagesModal(){ var m=document.getElementById('pbPagesModal'); if(m) return m;
  var st=document.createElement('style'); st.textContent=PG_CSS; document.head.appendChild(st);
  m=document.createElement('div'); m.id='pbPagesModal'; m.hidden=true;
  m.innerHTML='<div class="pg-in"><div class="pg-bar"><div class="pg-ttl">&#10022; Mes <span>Créations</span></div><button class="pg-close" id="pgClose" aria-label="Fermer">&times;</button></div><div class="pg-list" id="pgList"></div><div class="pg-note">Pages générées par le Tuteur IA, enregistrées sur cet appareil (et sur ton compte si tu es connecté). Demande-lui : « crée une page sur … ».</div></div>';
  document.body.appendChild(m);
  function hide(){ m.hidden=true; document.body.classList.remove('noscroll'); }
  m.querySelector('#pgClose').addEventListener('click',hide);
  m.addEventListener('click',function(e){ if(e.target===m) hide(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !m.hidden) hide(); });
  return m;
}
function agOpenPagesList(){ var m=agPagesModal(); var body=m.querySelector('#pgList'); var pages=agLoadPages();
  if(!pages.length){ body.innerHTML='<div class="pg-empty">Aucune page pour l\'instant.<br>Ouvre le Tuteur IA et écris par exemple :<br><b>« crée une page qui résume le chapitre des limites »</b>.</div>'; }
  else { body.innerHTML=''; pages.forEach(function(p){
    var row=document.createElement('div'); row.className='pg-row';
    var op=document.createElement('button'); op.className='pg-open'; op.type='button';
    op.innerHTML='<span class="pg-emo">'+esc(p.emoji||'✦')+'</span><span class="pg-t">'+esc(p.title)+'</span><span class="pg-d">'+new Date(p.t).toLocaleDateString('fr-FR')+'</span>';
    op.addEventListener('click',function(){ m.hidden=true; document.body.classList.remove('noscroll'); agOpenPage(p.id); });
    var del=document.createElement('button'); del.className='pg-del'; del.type='button'; del.innerHTML='&times;'; del.title='Supprimer';
    del.addEventListener('click',function(e){ e.stopPropagation(); var a=agLoadPages().filter(function(x){return x.id!==p.id;}); agSavePages(a); agOpenPagesList(); });
    row.appendChild(op); row.appendChild(del); body.appendChild(row);
  }); }
  m.hidden=false; document.body.classList.add('noscroll');
}
window.PB_openPages=agOpenPagesList;
(function(){ try{ document.querySelectorAll('.nav-pages').forEach(function(np){ np.addEventListener('click',function(e){ e.preventDefault(); agOpenPagesList(); }); }); agPagesBadge(); }catch(e){} })();

  /* ===== Questionnaire interactif + thème ===== */
/* ===== Questionnaire interactif (réponses renvoyées à l'IA) + contrôle du thème ===== */
var SV_CSS=''
+ '.sv-w .sv-q{font-weight:600;margin:12px 0 3px;line-height:1.4}'
+ '.sv-w .sv-hint{font-size:.7rem;opacity:.6;margin-bottom:6px}'
+ '.sv-w .sv-opts{display:flex;flex-wrap:wrap;gap:7px}'
+ '.sv-w .sv-opt{border:1.5px solid rgba(140,130,210,.4);background:rgba(255,255,255,.55);color:inherit;border-radius:18px;padding:8px 13px;font-size:.88rem;cursor:pointer;line-height:1.25;transition:.12s}'
+ '.sv-w .sv-opt:hover:not(:disabled){border-color:var(--accent,#6c5ce7);background:rgba(140,130,210,.12)}'
+ '.sv-w .sv-opt.sel{background:var(--accent,#6c5ce7);border-color:var(--accent,#6c5ce7);color:#fff;font-weight:600}'
+ '.sv-w .sv-opt:disabled{cursor:default;opacity:.9}'
+ '.sv-w .sv-submit{margin-top:14px;width:100%}';
function ensureSvCss(){ if(document.getElementById('pbSvCss')) return; var s=document.createElement('style'); s.id='pbSvCss'; s.textContent=SV_CSS; document.head.appendChild(s); }
function agSurveyBuild(box,title,qs){
  ensureChatCss(); ensureSvCss();
  var wrap=document.createElement('div'); wrap.className='cp-msg ai qz-w sv-w';
  var state=qs.map(function(){ return []; });
  var head='<div class="qzc-head">📝 '+esc(title)+'</div><div class="qzc-q" style="font-weight:500">Choisis tes réponses, puis clique « Envoyer ».</div>';
  wrap.innerHTML=head;
  qs.forEach(function(q,qi){ var multi=!!(q.multi||q.multiple||q.plusieurs);
    var qd=document.createElement('div'); qd.className='sv-q'; qd.textContent=(qi+1)+'. '+(q.q||q.question||'');
    var hint=document.createElement('div'); hint.className='sv-hint'; hint.textContent=multi?'Plusieurs réponses possibles':'Une seule réponse';
    var opts=document.createElement('div'); opts.className='sv-opts';
    var ch=q.choix||q.choices||q.options||q.reponses||[];
    ch.forEach(function(c,ci){ var b=document.createElement('button'); b.type='button'; b.className='sv-opt'; b.textContent=String(c);
      b.addEventListener('click',function(){ if(wrap._done) return;
        if(multi){ var k=state[qi].indexOf(ci); if(k>=0){ state[qi].splice(k,1); b.classList.remove('sel'); } else { state[qi].push(ci); b.classList.add('sel'); } }
        else { state[qi]=[ci]; Array.prototype.forEach.call(opts.children,function(x){ x.classList.remove('sel'); }); b.classList.add('sel'); }
      }); opts.appendChild(b); });
    wrap.appendChild(qd); wrap.appendChild(hint); wrap.appendChild(opts);
  });
  var submit=document.createElement('button'); submit.type='button'; submit.className='qzc-next sv-submit'; submit.textContent='Envoyer mes réponses ✓';
  submit.addEventListener('click',function(){ if(wrap._done) return;
    if(!state.some(function(a){ return a.length; })){ agToast('Choisis au moins une réponse.'); return; }
    wrap._done=true; submit.disabled=true; submit.textContent='Réponses envoyées ✓';
    wrap.querySelectorAll('.sv-opt').forEach(function(x){ x.disabled=true; });
    var lines=qs.map(function(q,qi){ var ch=q.choix||q.choices||q.options||q.reponses||[]; var sel=state[qi].map(function(i){ return ch[i]; });
      return (qi+1)+'. '+(q.q||q.question||'')+' → '+(sel.length?sel.join(', '):'(sans réponse)'); });
    var txt='Voici mes réponses au questionnaire « '+title+' » :\n'+lines.join('\n')+'\n\nTu peux maintenant continuer à partir de ces réponses.';
    setTimeout(function(){ ask(txt); },150);
  });
  wrap.appendChild(submit);
  return wrap;
}
function agSurvey(args){ if(!args) return false; var qs=args.questions||args.items||args.sondage; if(!Array.isArray(qs)||!qs.length) return false;
  var box=agActiveBox(); if(!box) return false; var title=args.titre||args.title||args.sujet||'Questionnaire';
  box.appendChild(agSurveyBuild(box,title,qs)); box.scrollTop=box.scrollHeight; return true; }
function agTheme(args){ args=args||{}; var m=(args.mode||args.theme||args.valeur||args.apparence||args.value||'').toString().toLowerCase();
  var set; if(/somb|dark|nuit|noir/.test(m)) set='dark'; else if(/clair|light|jour|blanc/.test(m)) set='light'; else if(/auto|system|systèm|systeme|défaut|defaut/.test(m)) set='system'; else return false;
  try{ var K='planbataille_v1', o={}; try{ o=JSON.parse(localStorage.getItem(K))||{}; }catch(e){} o.theme=set; localStorage.setItem(K,JSON.stringify(o)); }catch(e){}
  var root=document.documentElement;
  if(set==='light'||set==='dark') root.setAttribute('data-theme',set); else root.removeAttribute('data-theme');
  var dark = set==='dark' || (set!=='light' && window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches);
  var ic=document.getElementById('themeIcon'), tx=document.getElementById('themeTxt'); if(ic) ic.textContent=dark?'☾':'☀'; if(tx) tx.textContent=dark?'Sombre':'Clair';
  agToast('Thème : '+(set==='dark'?'sombre':(set==='light'?'clair':'automatique'))); return true;
}

  /* ===== Fiabilisation planning + conversion auto QCM ===== */
/* ===== Fiabilisation : assistant planning déterministe + conversion auto QCM texte→cliquable ===== */

/* -- agSurveyBuild REDÉFINI : accepte un callback onSubmit(valeurs, qs). Sans callback, envoie à l'IA. -- */
function agSurveyBuild(box,title,qs,onSubmit){
  ensureChatCss(); ensureSvCss();
  var wrap=document.createElement('div'); wrap.className='cp-msg ai qz-w sv-w';
  var state=qs.map(function(){ return []; });
  wrap.innerHTML='<div class="qzc-head">📝 '+esc(title)+'</div><div class="qzc-q" style="font-weight:500">Choisis tes réponses, puis clique « Envoyer ».</div>';
  qs.forEach(function(q,qi){ var multi=!!(q.multi||q.multiple||q.plusieurs);
    var qd=document.createElement('div'); qd.className='sv-q'; qd.textContent=(qi+1)+'. '+(q.q||q.question||'');
    var hint=document.createElement('div'); hint.className='sv-hint'; hint.textContent=multi?'Plusieurs réponses possibles':'Une seule réponse';
    var opts=document.createElement('div'); opts.className='sv-opts';
    var ch=q.choix||q.choices||q.options||q.reponses||[];
    ch.forEach(function(c,ci){ var b=document.createElement('button'); b.type='button'; b.className='sv-opt'; b.textContent=String(c);
      b.addEventListener('click',function(){ if(wrap._done) return;
        if(multi){ var k=state[qi].indexOf(ci); if(k>=0){ state[qi].splice(k,1); b.classList.remove('sel'); } else { state[qi].push(ci); b.classList.add('sel'); } }
        else { state[qi]=[ci]; Array.prototype.forEach.call(opts.children,function(x){ x.classList.remove('sel'); }); b.classList.add('sel'); }
      }); opts.appendChild(b); });
    wrap.appendChild(qd); wrap.appendChild(hint); wrap.appendChild(opts);
  });
  var submit=document.createElement('button'); submit.type='button'; submit.className='qzc-next sv-submit'; submit.textContent='Envoyer mes réponses ✓';
  submit.addEventListener('click',function(){ if(wrap._done) return;
    if(!state.some(function(a){ return a.length; })){ agToast('Choisis au moins une réponse.'); return; }
    wrap._done=true; submit.disabled=true; submit.textContent='Réponses envoyées ✓';
    wrap.querySelectorAll('.sv-opt').forEach(function(x){ x.disabled=true; });
    var vals=qs.map(function(q,qi){ var ch=q.choix||q.choices||q.options||q.reponses||[]; return state[qi].map(function(i){ return ch[i]; }); });
    if(typeof onSubmit==='function'){ setTimeout(function(){ try{ onSubmit(vals,qs); }catch(e){} },120); return; }
    var lines=qs.map(function(q,qi){ return (qi+1)+'. '+(q.q||q.question||'')+' → '+(vals[qi].length?vals[qi].join(', '):'(sans réponse)'); });
    var txt='Voici mes réponses au questionnaire « '+title+' » :\n'+lines.join('\n')+'\n\nTu peux maintenant continuer à partir de ces réponses.';
    setTimeout(function(){ ask(txt); },150);
  });
  wrap.appendChild(submit);
  return wrap;
}

/* -- Détection d'intention -- */
function agWantsPlanning(t){ var s=(t||'').toLowerCase();
  if(!/\bplanning\b|emploi du temps/.test(s)) return false;
  if(/^(ouvre|montre|affiche|voir|revois|où|ou est)\b/.test(s.trim())) return false;
  return /(cr[ée]|construi|fais|f[ai]s|g[ée]n[èe]re|pr[ée]par|organi|veux|donne|aide|remplir|onglet|planifi|besoin)/.test(s) || /^\s*planning/.test(s);
}
function agWantsPage(t){ var s=(t||'').toLowerCase(); if(/\bplanning\b|emploi du temps/.test(s)) return null;
  if(/\b(html|css|javascript|js|python|code|coder|script|programme|programmation|web|site|bouton|fonction|classe|balise|composant|framework|react)\b/.test(s)) return null;
  var m=s.match(/(?:cr[ée]{1,2}e?r?|construi(?:s|re)?|fais|f[ai]s|g[ée]n[èe]re|ajoute|nouvel(?:le)?)\s+(?:moi\s+)?(?:un[e]?\s+)?(?:nouvel(?:le)?\s+)?(onglet|page)\b(?:\s+(?:sur|pour|de|d'|:|intitul[ée]e?)\s*(.+))?/);
  if(!m) return null; var subj=(m[2]||'').trim().replace(/[.?!]+$/,''); return subj?subj.slice(0,60):'Nouvelle page'; }

/* -- Assistant planning : questionnaire natif -> crée l'onglet, sans dépendre de l'IA -- */
var PLANNING_QS=[
 {q:'Quels après-midis sont libres cette semaine ?',choix:['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],multi:true},
 {q:'Combien de temps peux-tu travailler chaque soir (semaine) ?',choix:['30 min','45 min','1 h','1 h 30'],multi:false},
 {q:'Le week-end, tu peux étudier :',choix:['Peu','~1 h/jour','~2 h/jour','Beaucoup'],multi:false},
 {q:'Tes matières prioritaires ?',choix:['Maths','Physique-Chimie','SVT','Français','Philo'],multi:true},
 {q:"Durée idéale d'une séance ?",choix:['30 min','45 min','60 min','90 min'],multi:false},
 {q:'À quelle heure te couches-tu ?',choix:['Avant 22h','22h–23h','23h–minuit','Après minuit'],multi:false}
];
function startPlanningWizard(text){
  if(!(full&&!full.hidden) && !(panel&&panel.classList.contains('on'))) openPanel();
  if(input) input.value=''; if(cfInput){ cfInput.value=''; autoGrow(cfInput); }
  var c=cur(); c.msgs.push({role:'user',content:text}); if(!c.title||c.title==='Nouvelle conversation') c.title=text.slice(0,42);
  c.msgs.push({role:'assistant',content:'Parfait'+(window.PB_USERNAME?', '+window.PB_USERNAME:'')+' ! Réponds à ce petit questionnaire (clique tes réponses puis « Envoyer »), et je crée aussitôt l\'onglet de ton planning personnalisé dans « Créations ».'});
  c.t=Date.now(); save(); renderMsgs(); renderList();
  var box=agActiveBox(); if(box){ box.appendChild(agSurveyBuild(box,'Mes disponibilités',PLANNING_QS,function(vals){ agMakePlanning(vals); })); box.scrollTop=box.scrollHeight; }
}
function agMakePlanning(vals){ vals=vals||[];
  var free=vals[0]||[], night=(vals[1]&&vals[1][0])||'45 min', wknd=(vals[2]&&vals[2][0])||'~1 h',
      prio=(vals[3]&&vals[3].length?vals[3]:['Maths','Physique-Chimie']), sess=(vals[4]&&vals[4][0])||'45 min', bed=(vals[5]&&vals[5][0])||'23h';
  var days=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
  var p0=prio[0]||'Maths', p1=prio[1]||p0;
  var md='# 🗓️ Mon planning de la semaine\n\n';
  md+="## 🎯 Règle d'or\n\nChaque soir, lis le **prochain cours** (surtout **"+prio.join(', ')+"**) avant le prof : en classe, ce sera une révision, pas une découverte. Objectif : moyenne ≥ **17,5**.\n\n";
  md+='## 📅 Ta semaine type\n\n| Jour | Quand | Ce que tu fais |\n|---|---|---|\n';
  for(var i=0;i<7;i++){ var d=days[i]; var isW=(i>=5); var isFree=free.indexOf(d)>=0;
    var quand=isW?('Week-end · '+wknd):('Soir · '+night); if(isFree) quand+=' + après-midi';
    var focus=(i%2===0)?p0:p1; var task;
    if(isFree) task='Séance de **'+sess+'** : '+p0+' + '+p1+' (cours + série d\'exercices)';
    else if(i===2||i===4) task='Retravaille **'+focus+'** + QCM d\'entraînement';
    else if(isW) task='Consolidation : QCM de la semaine + points faibles';
    else task='Retravaille **'+focus+'** (cours du jour) + anticipe le prochain cours';
    md+='| '+d+' | '+quand+' | '+task+' |\n';
  }
  md+='\n## 🧪 Objectifs de la semaine (à cocher)\n\n- '+p0+' : cours du jour retravaillé chaque soir\n- '+p0+' : 1 série d\'exercices + correction\n- '+p1+' : cours + vidéo + 1 série\n- Prochains chapitres lus **en avance**\n- QCM de la semaine faits\n- Coucher vers '+bed+' (sommeil régulier)\n\n';
  md+='## 💡 Méthode\n\nAnticipe, teste-toi (QCM et flashcards plutôt que relire), retravaille le soir même, et priorise **'+prio.join(' puis ')+'**.\n';
  agCreatePage({titre:'Mon planning de la semaine',emoji:'🗓️'}, md);
  try{ var c=cur(); c.msgs.push({role:'assistant',content:'✅ C\'est fait — l\'onglet **« Mon planning de la semaine »** est créé (tu le retrouves dans **✦ Créations**). Tu peux l\'imprimer, ou me demander de l\'ajuster.'}); c.t=Date.now(); save(); renderMsgs(); renderList(); }catch(e){}
}

/* -- Conversion automatique : un QCM/questionnaire écrit en TEXTE -> questionnaire cliquable -- */
function agTextToSurvey(text){
  if(!text) return null;
  var lines=String(text).replace(/\r/g,'').split('\n');
  var qs=[], curq=null, intro=[], seenQ=false;
  var ore=/^\s*[-*•]?\s*(?:\*\*)?\s*([A-Ha-h])\s*[).\-–]\s*(.+?)\s*(?:\*\*)?\s*$/;
  var qnum=/^\s*(?:\*\*)?\s*\d+[.)]\s*(.+)$/;
  for(var i=0;i<lines.length;i++){ var l=lines[i]; if(!l.trim()) continue;
    var om=l.match(ore);
    if(om && curq){ curq.choix.push(om[2].trim().replace(/\*+/g,'')); continue; }
    var qtext=null; var qn=l.match(qnum);
    if(qn){ qtext=qn[1]; }
    else if(/\?\s*(\*\*)?\s*$/.test(l) && !om){ qtext=l; }
    if(qtext){ if(curq && curq.choix.length>=2) qs.push(curq);
      curq={q:qtext.replace(/\*+/g,'').replace(/^#+\s*/,'').trim(), choix:[], multi:/quels|quelles|plusieurs|coche|s[ée]lectionne|plusieurs r[ée]ponses/i.test(qtext)}; seenQ=true; continue; }
    if(!seenQ) intro.push(l.replace(/\*+/g,''));
  }
  if(curq && curq.choix.length>=2) qs.push(curq);
  qs=qs.filter(function(q){ return q.choix.length>=2; });
  if(!qs.length) return null;
  return {title:'Questionnaire', questions:qs, intro:intro.join(' ').trim()};
}

  /* ===== KaTeX + Mémoire + Suivi ===== */
/* ===== KaTeX (belles maths) + Mémoire de l'élève + Suivi des scores ===== */

/* ---- KaTeX : chargement paresseux depuis cdnjs, rendu défensif (ne casse rien si absent) ---- */
var _katexP=null;
function ensureKatex(){ if(_katexP) return _katexP; _katexP=new Promise(function(res){
  try{
    if(window.renderMathInElement){ res(true); return; }
    if(!document.getElementById('katexCss')){ var l=document.createElement('link'); l.id='katexCss'; l.rel='stylesheet'; l.href='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css'; document.head.appendChild(l); }
    var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
    s.onload=function(){ var a=document.createElement('script'); a.src='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js';
      a.onload=function(){ res(!!window.renderMathInElement); }; a.onerror=function(){ res(false); }; document.head.appendChild(a); };
    s.onerror=function(){ res(false); };
    document.head.appendChild(s);
    setTimeout(function(){ res(!!window.renderMathInElement); },6000);
  }catch(e){ res(false); }
}); return _katexP; }
function renderMath(el){ if(!el) return; var t=el.textContent||''; if(t.indexOf('$')<0 && t.indexOf('\\')<0) return;
  ensureKatex().then(function(ok){ if(!ok||!window.renderMathInElement) return;
    try{ window.renderMathInElement(el,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false},{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}],throwOnError:false,ignoredTags:['script','style','textarea','pre','code','button']}); }catch(e){}
  });
}

/* ---- Mémoire de l'élève (profil) ---- */
function agProfileLoad(){ try{ return JSON.parse(localStorage.getItem('pb_profile'))||{}; }catch(e){ return {}; } }
function agProfileSave(p){ try{ localStorage.setItem('pb_profile',JSON.stringify(p)); }catch(e){} if(window.PB_onProfileChange){ try{ window.PB_onProfileChange(p); }catch(e){} } }
window.PB_profile={ getAll:function(){ return agProfileLoad(); }, setAll:function(o){ if(o&&typeof o==='object'){ try{ localStorage.setItem('pb_profile',JSON.stringify(o)); }catch(e){} } } };
function agRemember(args){ if(!args) return false; var p=agProfileLoad();
  function addTo(key,val){ if(!val) return; p[key]=p[key]||[]; val=String(val).trim().slice(0,80); if(val && p[key].indexOf(val)<0){ p[key].push(val); if(p[key].length>20) p[key].shift(); } }
  addTo('faibles', args.faible||args.faiblesse||args.difficulte||args.weak);
  addTo('forts', args.fort||args.force||args.strong);
  addTo('notes', args.note||args.info||args.souviens||args.remember||args.memoire);
  if(args.objectif||args.but) p.objectif=String(args.objectif||args.but).slice(0,120);
  agProfileSave(p); agToast('🧠 C\'est noté — je m\'en souviendrai.'); return true;
}
function agRecordScore(title,score,total){ try{ var p=agProfileLoad(); p.scores=p.scores||[]; p.scores.push({t:String(title).slice(0,60),s:score,n:total,d:Date.now()}); if(p.scores.length>20) p.scores.shift();
  if(total && (score/total)<0.6){ p.faibles=p.faibles||[]; var tt=String(title).slice(0,60); if(tt && p.faibles.indexOf(tt)<0){ p.faibles.push(tt); if(p.faibles.length>20) p.faibles.shift(); } }
  agProfileSave(p); }catch(e){} }
function agMemText(){ var p=agProfileLoad(); var s='';
  if(p.faibles&&p.faibles.length) s+=' Points faibles connus : '+p.faibles.slice(-6).join(', ')+'.';
  if(p.forts&&p.forts.length) s+=' Points forts : '+p.forts.slice(-4).join(', ')+'.';
  if(p.objectif) s+=' Objectif personnel : '+p.objectif+'.';
  if(p.scores&&p.scores.length){ var last=p.scores.slice(-3).map(function(x){ return x.t+' '+x.s+'/'+x.n; }).join(' ; '); s+=' Derniers scores QCM : '+last+'.'; }
  if(p.notes&&p.notes.length) s+=' À retenir : '+p.notes.slice(-4).join(' ; ')+'.';
  if(s) s=' MÉMOIRE DE L\'ÉLÈVE (souviens-toi de ces éléments et adapte-toi ; propose de revoir ses points faibles quand c\'est pertinent) :'+s;
  return s;
}

  /* ===== RAG + vérif calcul + 2e passe ===== */
/* ===== Raisonnement + fiabilité : ancrage cours (RAG), vérif calcul, 2e passe photo ===== */

function agNorm(s){ try{ return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''); }catch(e){ return String(s||'').toLowerCase(); } }

/* ---- Ancrage sur le cours : base de connaissances depuis les données du site ---- */
var _KB=null;
function agKB(){ if(_KB) return _KB; _KB=[];
  try{ var S=window.EDU_SUBJECTS||{}, C=window.EDU_CARDS||{}, Q=window.EDU_QUIZ||{};
    Object.keys(C).forEach(function(subj){ var chs=(S[subj]&&S[subj].chapters)||[]; (C[subj]||[]).forEach(function(card){ var title=chs[card.ch]||''; var text=(card.f||'')+' — '+(card.b||''); _KB.push({subj:subj,title:title,text:text,norm:agNorm(title+' '+card.f+' '+card.b)}); }); });
    Object.keys(Q).forEach(function(subj){ var chs=(S[subj]&&S[subj].chapters)||[]; (Q[subj]||[]).forEach(function(qz){ if(qz&&qz.ex){ var title=chs[qz.ch]||''; _KB.push({subj:subj,title:title,text:(qz.q||'')+' → '+(qz.ex||''),norm:agNorm(title+' '+qz.q+' '+qz.ex)}); } }); });
  }catch(e){}
  return _KB; }
var _STOP=['pour','avec','dans','cette','comment','quel','quelle','quels','quelles','est','les','des','une','the','and','que','qui','sur','mon','mes','moi','toi','ton','ta','tes','plus','fais','donne','explique','peux','veux','dois','elle','vous','nous','par','pas','aux','ce','ca','ceci','cela'];
function agRetrieve(query){ query=agNorm(query); if(query.length<4) return '';
  var toks=query.split(/[^a-z0-9]+/).filter(function(w){ return w.length>=4 && _STOP.indexOf(w)<0; });
  if(!toks.length) return '';
  var kb=agKB(); if(!kb.length) return '';
  var scored=[];
  kb.forEach(function(e){ var sc=0; for(var i=0;i<toks.length;i++){ if(e.norm.indexOf(toks[i])>=0) sc+=(agNorm(e.title).indexOf(toks[i])>=0?2:1); } if(sc>0) scored.push({e:e,sc:sc}); });
  if(!scored.length) return '';
  scored.sort(function(a,b){ return b.sc-a.sc; });
  var maxsc=scored[0].sc; var top=scored.filter(function(x){ return x.sc>=Math.max(2,maxsc-1); }).slice(0,5);
  if(!top.length) top=scored.slice(0,3);
  var seen={}, lines=[];
  top.forEach(function(x){ var t=x.e.text.replace(/\s+/g,' ').trim(); var key=t.slice(0,40); if(seen[key]) return; seen[key]=1; if(t.length>240) t=t.slice(0,240)+'…'; lines.push('- ('+(x.e.title||x.e.subj)+') '+t); });
  if(!lines.length) return '';
  return 'ÉLÉMENTS DU COURS (programme officiel 1BAC SM — appuie-toi dessus, reste cohérent avec eux) :\n'+lines.slice(0,5).join('\n');
}
if(typeof window!=='undefined') window.PB_retrieve=agRetrieve;

/* ---- Évaluateur arithmétique sûr (nombres seulement, sans eval) ---- */
function agEvalNum(expr){ try{
  var s=String(expr).replace(/×/g,'*').replace(/÷/g,'/').replace(/·/g,'*').replace(/\s+/g,'');
  s=s.replace(/(\d),(\d)/g,'$1.$2');
  if(!/^[-+*/^().0-9]+$/.test(s)) return null;
  var out=[],ops=[],i=0,prev=null; var prec={'+':1,'-':1,'*':2,'/':2,'^':3}, rassoc={'^':true};
  function isD(c){ return (c>='0'&&c<='9')||c==='.'; }
  while(i<s.length){ var c=s[i];
    if(isD(c)){ var n=''; while(i<s.length&&isD(s[i])){ n+=s[i++]; } out.push(parseFloat(n)); prev='num'; continue; }
    if(c==='('){ ops.push(c); prev='('; i++; continue; }
    if(c===')'){ while(ops.length&&ops[ops.length-1]!=='(') out.push(ops.pop()); if(!ops.length) return null; ops.pop(); prev='num'; i++; continue; }
    if('+-*/^'.indexOf(c)>=0){ if((c==='-'||c==='+')&&(prev===null||prev==='op'||prev==='(')){ out.push(0); }
      while(ops.length){ var top=ops[ops.length-1]; if(top==='(') break; if(prec[top]>prec[c]||(prec[top]===prec[c]&&!rassoc[c])){ out.push(ops.pop()); } else break; }
      ops.push(c); prev='op'; i++; continue; }
    return null;
  }
  while(ops.length){ var o=ops.pop(); if(o==='(') return null; out.push(o); }
  var st=[]; for(var k=0;k<out.length;k++){ var x=out[k];
    if(typeof x==='number'){ st.push(x); }
    else { var b=st.pop(),a=st.pop(); if(a===undefined||b===undefined) return null; var v;
      if(x==='+')v=a+b; else if(x==='-')v=a-b; else if(x==='*')v=a*b; else if(x==='/'){ if(b===0) return null; v=a/b; } else if(x==='^')v=Math.pow(a,b); else return null; st.push(v); } }
  if(st.length!==1) return null; var r=st[0]; if(!isFinite(r)) return null; return r;
}catch(e){ return null; } }

function agVerifyArithmetic(text){ return text; }
/* Normalise les maths pour un rendu fiable : \[ \] -> $$, \( \) -> $, et met chaque bloc $$..$$ sur une seule ligne */
function agMathNormalize(s){ if(!s) return s; s=String(s);
  s=s.split('\\[').join('$$').split('\\]').join('$$').split('\\(').join('$').split('\\)').join('$');
  s=s.replace(/\$\$([\s\S]*?)\$\$/g,function(_x,inner){ return '$$'+inner.replace(/\s*\n\s*/g,' ').trim()+'$$'; });
  return s;
}

/* ---- 2e passe : vérifie/corrige une résolution (utilisée pour les photos) ---- */
async function agRefineVision(draft){ try{ if(!draft || draft.length<40) return draft;
  var msgs=[{role:'system',content:'Tu es un correcteur de maths/physique rigoureux. On te donne une résolution d\'exercice. Vérifie CHAQUE étape et CHAQUE calcul, corrige les erreurs, et renvoie la solution finale corrigée, claire, détaillée et bien structurée, en français. Écris les formules en LaTeX ($ … $).'},
             {role:'user',content:'Résolution à vérifier et corriger si besoin :\n\n'+draft}];
  var ok=await ensurePuter(); if(ok){ try{ var r=await puter.ai.chat(msgs,{model:'gpt-4o-mini'}); var t=extract(r); if(t&&t.trim().length>40) return t.trim(); }catch(e){} }
  try{ var res=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'openai',messages:msgs})});
    if(res.ok){ var j=await res.json(); var t2=extract(j); if(t2&&t2.trim().length>40) return t2.trim(); } }catch(e){}
}catch(e){} return draft; }

  /* ===== Blocs de code + rendu maths partagé ===== */
/* ===== Blocs de code (coloration + copier + aperçu HTML) & rendu maths partagé ===== */
if(typeof window!=='undefined') window.PB_renderMath=function(el){ try{ renderMath(el); }catch(e){} };

var CODE_CSS=''
+ '.cb-block{margin:10px 0;border:1px solid rgba(140,130,210,.3);border-radius:10px;overflow:hidden;background:#0d1117}'
+ '.cb-tb{display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#161b22;border-bottom:1px solid rgba(255,255,255,.06)}'
+ '.cb-lang{font-size:.68rem;letter-spacing:.05em;text-transform:uppercase;color:#8b949e;font-family:JetBrains Mono,monospace}'
+ '.cb-acts{display:flex;gap:6px}'
+ '.cb-copy,.cb-run,.cb-dl{font-size:.7rem;padding:3px 10px;border:1px solid rgba(255,255,255,.16);background:transparent;color:#c9d1d9;border-radius:6px;cursor:pointer}'
+ '.cb-copy:hover,.cb-run:hover,.cb-dl:hover{background:rgba(255,255,255,.09)}'
+ '.cb-pre{margin:0;padding:12px 14px;overflow:auto;max-height:440px}'
+ '.cb-pre code{font-family:JetBrains Mono,monospace;font-size:.82rem;line-height:1.55;color:#e6edf3;white-space:pre;background:none!important;border:0;padding:0;display:block}'
+ '.cb-prev{position:fixed;inset:0;z-index:2147483000;background:rgba(20,18,40,.6);display:flex;align-items:center;justify-content:center;padding:18px}'
+ '.cb-prev[hidden]{display:none!important}'
+ '.cb-prev-in{background:#fff;width:100%;max-width:940px;height:82vh;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 70px rgba(0,0,0,.45)}'
+ '.cb-prev-bar{display:flex;justify-content:space-between;align-items:center;padding:9px 13px;background:#f3f1fb;border-bottom:1px solid #e2ddf3}'
+ '.cb-prev-bar b{font-size:.85rem;color:#4b3fa7}'
+ '.cb-prev-x{border:0;background:transparent;font-size:1.5rem;line-height:1;cursor:pointer;color:#333}'
+ '.cb-prev-frame{flex:1;border:0;width:100%;background:#fff}';
function ensureCodeCss(){ if(document.getElementById('pbCodeCss')) return; var s=document.createElement('style'); s.id='pbCodeCss'; s.textContent=CODE_CSS; document.head.appendChild(s); }

var _hljsP=null;
function ensureHljs(){ if(_hljsP) return _hljsP; _hljsP=new Promise(function(res){ try{
  if(window.hljs){ res(true); return; }
  if(!document.getElementById('hljsCss')){ var l=document.createElement('link'); l.id='hljsCss'; l.rel='stylesheet'; l.href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'; document.head.appendChild(l); }
  var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js'; s.onload=function(){ res(!!window.hljs); }; s.onerror=function(){ res(false); }; document.head.appendChild(s);
  setTimeout(function(){ res(!!window.hljs); },6000);
}catch(e){ res(false); } }); return _hljsP; }

function agPreviewHtml(code){ ensureCodeCss(); var m=document.getElementById('cbPrev');
  if(!m){ m=document.createElement('div'); m.id='cbPrev'; m.className='cb-prev'; m.hidden=true;
    m.innerHTML='<div class="cb-prev-in"><div class="cb-prev-bar"><b>&#9654; Aperçu en direct</b><button class="cb-prev-x" id="cbPrevX" aria-label="Fermer">&times;</button></div><iframe class="cb-prev-frame" id="cbPrevFrame" sandbox="allow-scripts allow-forms allow-modals allow-popups"></iframe></div>';
    document.body.appendChild(m);
    function hide(){ m.hidden=true; document.body.classList.remove('noscroll'); try{ document.getElementById('cbPrevFrame').srcdoc=''; }catch(e){} }
    m.querySelector('#cbPrevX').addEventListener('click',hide);
    m.addEventListener('click',function(e){ if(e.target===m) hide(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !m.hidden) hide(); });
  }
  try{ document.getElementById('cbPrevFrame').srcdoc=code; }catch(e){}
  m.hidden=false; document.body.classList.add('noscroll');
}

function agEnhanceCode(root){ if(!root||!root.querySelectorAll) return; ensureCodeCss();
  var blocks=root.querySelectorAll('.cb-block'); if(!blocks.length) return;
  Array.prototype.forEach.call(blocks,function(bl){ if(bl._done) return; bl._done=1;
    var code=''; try{ code=decodeURIComponent(bl.getAttribute('data-code')||''); }catch(e){ code=bl.getAttribute('data-code')||''; }
    var cp=bl.querySelector('.cb-copy'); if(cp) cp.addEventListener('click',function(){ try{ if(navigator.clipboard) navigator.clipboard.writeText(code); cp.textContent='Copié ✓'; setTimeout(function(){ cp.textContent='Copier'; },1400); }catch(e){} });
    var rn=bl.querySelector('.cb-run'); if(rn) rn.addEventListener('click',function(){ agPreviewHtml(code); });
  });
  ensureHljs().then(function(ok){ if(!ok||!window.hljs) return; try{ root.querySelectorAll('.cb-pre code').forEach(function(c){ if(!c._hl){ c._hl=1; try{ window.hljs.highlightElement(c); }catch(e){} } }); }catch(e){} });
}

/* -- fmtChat REDÉFINI : gère les blocs de code ``` ``` en plus du reste -- */
function cbHtml(pp){ var lang=(pp.lang||'').toLowerCase(); var code=pp.code||'';
  var isWeb=/^(html|xml|svg)$/.test(lang) || ((lang==='css'||lang==='js'||lang==='javascript'||lang==='')&&/<!doctype|<html|<body|<div|<canvas|<svg|<style|<script/i.test(code));
  var bar='<div class="cb-tb"><span class="cb-lang">'+esc(lang||'code')+'</span><span class="cb-acts"><button class="cb-copy" type="button">Copier</button>'+(isWeb?'<button class="cb-run" type="button">Aperçu ▸</button>':'')+'</span></div>';
  return '<div class="cb-block" data-code="'+encodeURIComponent(code)+'">'+bar+'<pre class="cb-pre"><code class="hljs'+(lang?(' language-'+esc(lang)):'')+'">'+esc(code)+'</code></pre></div>';
}
function fmtTextLines(s){ var lines=String(s).replace(/\r/g,'').split('\n'); var out=[]; var i=0;
  function inl(t){ t=esc(t); t=t.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>'); t=t.replace(/`([^`]+)`/g,'<code>$1</code>'); return t; }
  while(i<lines.length){ var l=lines[i];
    var hm=l.match(/^\s*#{1,4}\s+(.*)/); if(hm){ out.push('<div class="cb-h">'+inl(hm[1])+'</div>'); i++; continue; }
    if(/^\s*[-*•]\s+/.test(l)){ var u=''; while(i<lines.length&&/^\s*[-*•]\s+/.test(lines[i])){ u+='<li>'+inl(lines[i].replace(/^\s*[-*•]\s+/,''))+'</li>'; i++; } out.push('<ul class="cb-ul">'+u+'</ul>'); continue; }
    if(/^\s*\d+[.)]\s+/.test(l)){ var o=''; while(i<lines.length&&/^\s*\d+[.)]\s+/.test(lines[i])){ o+='<li>'+inl(lines[i].replace(/^\s*\d+[.)]\s+/,''))+'</li>'; i++; } out.push('<ol class="cb-ol">'+o+'</ol>'); continue; }
    if(/^\s*$/.test(l)){ out.push('<br>'); i++; continue; }
    out.push('<div>'+inl(l)+'</div>'); i++;
  }
  return out.join('');
}
function fmtChat(s){ s=String(s).replace(/\r/g,'');
  var parts=[], re=/```([a-zA-Z0-9+#_-]*)[ \t]*\n?([\s\S]*?)```/g, last=0, m;
  while((m=re.exec(s))){ if(m.index>last) parts.push({t:'text',v:s.slice(last,m.index)}); parts.push({t:'code',lang:(m[1]||''),code:m[2].replace(/\n$/,'')}); last=m.index+m[0].length; }
  if(last<s.length) parts.push({t:'text',v:s.slice(last)});
  if(!parts.length) return fmtTextLines(s);
  return parts.map(function(pp){ return pp.t==='code' ? cbHtml(pp) : fmtTextLines(pp.v); }).join('');
}

/* -- Rendu maths du formulaire (page Outils), une fois app.js chargé -- */
(function(){ try{ var fx=document.getElementById('fxList'); if(fx){ setTimeout(function(){ try{ renderMath(fx); }catch(e){} },300); } }catch(e){} })();

  /* ===== Rendu maths robuste (override) ===== */
/* ===== Rendu mathématique robuste (KaTeX cœur, sans add-on, avec repli propre) ===== */
var _kx=null;
function ensureKatex(){ if(_kx) return _kx; _kx=new Promise(function(res){ try{
  if(window.katex){ res(true); return; }
  if(!document.getElementById('katexCss')){ var l=document.createElement('link'); l.id='katexCss'; l.rel='stylesheet'; l.href='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css'; document.head.appendChild(l); }
  var s=document.createElement('script'); s.id='katexJs'; s.src='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
  s.onload=function(){ res(!!window.katex); }; s.onerror=function(){ res(false); };
  document.head.appendChild(s); setTimeout(function(){ res(!!window.katex); },6000);
}catch(e){ res(false); } }); return _kx; }

function agTexFix(s){ return String(s)
  .replace(/×/g,'\\times ').replace(/·/g,'\\cdot ').replace(/÷/g,'\\div ').replace(/−/g,'-')
  .replace(/≤/g,'\\le ').replace(/≥/g,'\\ge ').replace(/≠/g,'\\neq ').replace(/∈/g,'\\in ')
  .replace(/∞/g,'\\infty ').replace(/√/g,'\\sqrt').replace(/π/g,'\\pi ').replace(/θ/g,'\\theta ')
  .replace(/α/g,'\\alpha ').replace(/β/g,'\\beta ').replace(/λ/g,'\\lambda ').replace(/ω/g,'\\omega ')
  .replace(/Ω/g,'\\Omega ').replace(/Δ/g,'\\Delta ').replace(/σ/g,'\\sigma ').replace(/ρ/g,'\\rho ')
  .replace(/Σ/g,'\\sum ').replace(/∑/g,'\\sum ').replace(/ℝ/g,'\\mathbb{R}').replace(/→/g,'\\to '); }

function agTexSegments(s){ var res=[], i=0, n=s.length, buf='';
  function flush(){ if(buf){ res.push({math:false,val:buf}); buf=''; } }
  while(i<n){ var c=s[i];
    if(c==='$'){ var disp=(s[i+1]==='$'); var close=disp?'$$':'$'; var start=i+close.length; var end=s.indexOf(close,start);
      if(end>start){ var inner=s.slice(start,end); if(inner.length<300 && inner.indexOf('$')<0 && (disp || inner.indexOf('\n')<0) && inner.trim()){ flush(); res.push({math:true,display:disp,val:inner}); i=end+close.length; continue; } }
      buf+=c; i++; continue; }
    if(c==='\\' && (s[i+1]==='(' || s[i+1]==='[')){ var d2=(s[i+1]==='['); var cl=d2?'\\]':'\\)'; var st2=i+2; var e2=s.indexOf(cl,st2);
      if(e2>st2){ var inn=s.slice(st2,e2); if(inn.length<300 && inn.trim()){ flush(); res.push({math:true,display:d2,val:inn}); i=e2+2; continue; } } buf+=c; i++; continue; }
    buf+=c; i++; }
  flush(); return res;
}
function agRenderOne(expr,display,span){
  try{ window.katex.render(expr, span, {displayMode:display, throwOnError:true, strict:false}); return true; }catch(e){}
  try{ window.katex.render(agTexFix(expr), span, {displayMode:display, throwOnError:true, strict:false}); return true; }catch(e2){}
  span.className='tex-raw'; span.textContent=expr; return false;
}
function agTexWalk(root){ if(!window.katex||!root||!document.createTreeWalker) return;
  var walker=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode:function(node){
    var v=node.nodeValue; if(!v || (v.indexOf('$')<0 && v.indexOf('\\(')<0 && v.indexOf('\\[')<0)) return NodeFilter.FILTER_REJECT;
    var p=node.parentNode; while(p && p!==root.parentNode){ if(p.nodeType===1){ var tn=p.nodeName; if(tn==='SCRIPT'||tn==='STYLE'||tn==='TEXTAREA'||tn==='CODE'||tn==='PRE'){ return NodeFilter.FILTER_REJECT; } if(p.classList && (p.classList.contains('katex')||p.classList.contains('cb-block'))) return NodeFilter.FILTER_REJECT; } p=p.parentNode; }
    return NodeFilter.FILTER_ACCEPT; } });
  var nodes=[], nd; while((nd=walker.nextNode())) nodes.push(nd);
  nodes.forEach(function(node){ var segs=agTexSegments(node.nodeValue); var hasMath=false; for(var k=0;k<segs.length;k++){ if(segs[k].math){ hasMath=true; break; } } if(!hasMath) return;
    var frag=document.createDocumentFragment();
    segs.forEach(function(sg){ if(!sg.math){ frag.appendChild(document.createTextNode(sg.val)); return; } var span=document.createElement('span'); span.className=sg.display?'tex-d':'tex-i'; agRenderOne(sg.val, sg.display, span); frag.appendChild(span); });
    if(node.parentNode) node.parentNode.replaceChild(frag, node);
  });
}
function renderMath(el){ if(!el) return; var t=(el.textContent||''); if(t.indexOf('$')<0 && t.indexOf('\\(')<0 && t.indexOf('\\[')<0) return;
  ensureKatex().then(function(ok){ if(!ok||!window.katex) return; try{ agTexWalk(el); }catch(e){} });
}
if(typeof window!=='undefined') window.PB_renderMath=function(el){ try{ renderMath(el); }catch(e){} };

  /* ===== Apparence + aperçu code élargi (override) ===== */
/* ===== Accès apparence (fond/couleurs/CSS) + aperçu code élargi ===== */

/* ---------- Personnalisation persistante de l'apparence ---------- */
var AGC={ 'noir':'#111318','blanc':'#ffffff','gris':'#8a8f98','gris clair':'#e6e8ec','gris fonce':'#3a3f47',
 'bleu':'#2563eb','bleu ciel':'#38bdf8','bleu clair':'#93c5fd','bleu fonce':'#1e3a8a','bleu nuit':'#0f172a','marine':'#1e3a8a',
 'rouge':'#dc2626','rouge fonce':'#991b1b','bordeaux':'#7f1d1d','vert':'#16a34a','vert clair':'#86efac','vert fonce':'#166534','emeraude':'#10b981','menthe':'#a7f3d0',
 'jaune':'#eab308','or':'#c79a3a','dore':'#c79a3a','orange':'#ea580c','corail':'#fb7185','saumon':'#fca5a5',
 'violet':'#7c3aed','mauve':'#a78bfa','indigo':'#4f46e5','lavande':'#c4b5fd','rose':'#ec4899','rose clair':'#f9a8d4','magenta':'#d946ef','fuchsia':'#d946ef',
 'turquoise':'#14b8a6','cyan':'#06b6d4','beige':'#f5f0e6','creme':'#fbf7ee','marron':'#7c4a2d','brun':'#7c4a2d','sable':'#e8dcc0','ivoire':'#fffff0','argent':'#cbd5e1' };
function agParseColor(t){ var s=String(t||'').toLowerCase();
  var hex=s.match(/#([0-9a-f]{6}|[0-9a-f]{3})\b/i); if(hex) return '#'+hex[1];
  var rgb=s.match(/rgba?\([^)]+\)/i); if(rgb) return rgb[0];
  var ns=agNorm(s); var best=null,bl=0;
  for(var k in AGC){ var kn=agNorm(k); if(new RegExp('(^|[^a-z])'+kn+'([^a-z]|$)').test(ns) && kn.length>bl){ best=AGC[k]; bl=kn.length; } }
  return best;
}
function agLoadCustom(){ try{ return JSON.parse(localStorage.getItem('pb_custom'))||{}; }catch(e){ return {}; } }
function agSaveCustom(d){ try{ localStorage.setItem('pb_custom',JSON.stringify(d)); }catch(e){} if(window.PB_onCustomChange){ try{ window.PB_onCustomChange(d); }catch(e){} } }
window.PB_custom={ getAll:function(){ return agLoadCustom(); }, setAll:function(o){ if(o&&typeof o==='object'){ try{ localStorage.setItem('pb_custom',JSON.stringify(o)); }catch(e){} agApplyCustom(); } } };
function agScopeCss(o){ if(!o) return ''; var c='';
  if(o.bg) c+='html body{background:'+o.bg+' !important}';
  if(o.fg) c+='body,.wrap,main{color:'+o.fg+' !important}';
  if(o.accent) c+=':root{--accent:'+o.accent+' !important;--royal:'+o.accent+' !important}';
  if(o.font) c+='html{font-size:'+o.font+' !important}';
  if(o.css) c+=String(o.css);
  return c; }
function agApplyCustom(){ var d=agLoadCustom(); var pid=(window.PB_PAGE&&window.PB_PAGE.id)||''; var css='';
  css+=agScopeCss(d.all); if(pid&&d[pid]) css+='\n'+agScopeCss(d[pid]);
  var st=document.getElementById('pbCustomCss'); if(!st){ st=document.createElement('style'); st.id='pbCustomCss'; document.head.appendChild(st); } st.textContent=css; }
function agScopeId(name){ name=agNorm(name||'');
  if(/accueil|home|principale/.test(name)) return 'home';
  if(/revision|revoir|cours|lecon/.test(name)) return 'rev';
  if(/qcm|quiz/.test(name)) return 'qcm';
  if(/carte|flashcard/.test(name)) return 'fc';
  if(/outil|formulaire|calcul/.test(name)) return 'outils';
  if(/progres/.test(name)) return 'prog';
  if(/examen/.test(name)) return 'exam';
  if(/coran/.test(name)) return 'cor';
  if(/tout|toutes|partout|global|site entier|le site/.test(name)) return 'all';
  return null; }
function agSetProp(scope, key, val){ if(scope==='current'||!scope) scope=(window.PB_PAGE&&window.PB_PAGE.id)||'all'; var d=agLoadCustom(); d[scope]=d[scope]||{}; if(val===null) delete d[scope][key]; else d[scope][key]=val; agSaveCustom(d); agApplyCustom(); }
function agResetStyle(scope){ var d=agLoadCustom(); if(scope&&scope!=='all'&&scope!=='current'){ delete d[scope]; } else { d={}; } agSaveCustom(d); agApplyCustom(); }

/* Commande client déterministe (marche même si le modèle n'agit pas) */
function agWantsStyle(t){ var s=agNorm(t);
  if(!/(fond|arriere.?plan|background|couleur|police|texte|apparence|theme couleur|style|reinitialis|remets?|annule)/.test(s)) return null;
  var scopeName= /accueil|home/.test(s)?'home' : (/tout|toutes les pages|partout|global|site entier|le site/.test(s)?'all':'current');
  if(/(reinitialis|remets?.*(defaut|origine)|annule.*(changement|couleur|style)|couleurs? d.?origine|enleve.*(couleur|style))/.test(s)) return {kind:'reset',scope:scopeName};
  var color=agParseColor(t);
  if(/(fond|arriere.?plan|background)/.test(s) && color) return {kind:'bg',color:color,scope:scopeName};
  if(/(couleur (du )?texte|texte en|police de couleur|ecriture en)/.test(s) && color) return {kind:'fg',color:color,scope:scopeName};
  if(/(accent|couleur principale|boutons? en|liens? en)/.test(s) && color) return {kind:'accent',color:color,scope:scopeName};
  if(/(plus grand|agrandi|grande police|augmente.*(taille|police)|zoom)/.test(s)) return {kind:'font',val:'118%',scope:scopeName};
  if(/(plus petit|reduis.*(taille|police)|petite police)/.test(s)) return {kind:'font',val:'92%',scope:scopeName};
  if(color && /(couleur|change|mets?|met|passe)/.test(s)) return {kind:'bg',color:color,scope:scopeName};
  return null; }
function agDoStyle(cmd){ if(!cmd) return '';
  var where = cmd.scope==='home'?'la page d\'accueil':(cmd.scope==='all'?'tout le site':'cette page');
  if(cmd.kind==='reset'){ agResetStyle(cmd.scope); return 'C\'est réinitialisé : couleurs d\'origine rétablies pour '+where+'.'; }
  if(cmd.kind==='bg'){ agSetProp(cmd.scope,'bg',cmd.color); return 'Voilà — j\'ai changé le fond de '+where+' en '+cmd.color+'. (Réversible : dis « remets les couleurs d\'origine ».)'; }
  if(cmd.kind==='fg'){ agSetProp(cmd.scope,'fg',cmd.color); return 'C\'est fait : couleur du texte de '+where+' → '+cmd.color+'.'; }
  if(cmd.kind==='accent'){ agSetProp(cmd.scope,'accent',cmd.color); return 'Couleur d\'accent de '+where+' → '+cmd.color+'.'; }
  if(cmd.kind==='font'){ agSetProp(cmd.scope,'font',cmd.val); return 'Taille du texte ajustée sur '+where+'.'; }
  return ''; }
/* Action émise par l'IA */
function agStyleAction(args){ if(!args) return false; var scope=agScopeId(args.page||args.cible||args.scope||args.ou||'')||'current'; var did=false;
  var bg=args.fond||args.background||args.bg||args.couleur_fond; if(bg){ agSetProp(scope,'bg',agParseColor(bg)||bg); did=true; }
  var fg=args.texte||args.color||args.couleur_texte||args.fg; if(fg){ agSetProp(scope,'fg',agParseColor(fg)||fg); did=true; }
  var ac=args.accent||args.couleur_principale; if(ac){ agSetProp(scope,'accent',agParseColor(ac)||ac); did=true; }
  var css=args.css||args.regles||args.style; if(css){ agSetProp(scope,'css',String(css)); did=true; }
  var pol=args.police||args.taille; if(pol){ var v=/grand/.test(agNorm(pol))?'118%':(/petit/.test(agNorm(pol))?'92%':pol); agSetProp(scope,'font',v); did=true; }
  if(/reinitialis|defaut|reset|origine/.test(agNorm(JSON.stringify(args)))) { agResetStyle(scope); did=true; }
  if(did){ try{ toast('🎨 Apparence mise à jour'); }catch(e){} }
  return did; }

/* ---------- Aperçu de code élargi (html/css/js) ---------- */
function cbHtml(pp){ var lang=(pp.lang||'').toLowerCase(); var code=pp.code||'';
  var web = /^(html|xml|svg|css|js|javascript|jsx)$/.test(lang) || /<[a-z!\/]/i.test(code);
  var bar='<div class="cb-tb"><span class="cb-lang">'+esc(lang||'code')+'</span><span class="cb-acts"><button class="cb-copy" type="button">Copier</button>'+(web?'<button class="cb-run" type="button">Aperçu ▸</button>':'')+'</span></div>';
  return '<div class="cb-block" data-code="'+encodeURIComponent(code)+'" data-lang="'+esc(lang)+'">'+bar+'<pre class="cb-pre"><code class="hljs'+(lang?(' language-'+esc(lang)):'')+'">'+esc(code)+'</code></pre></div>';
}
function agEnhanceCode(root){ if(!root||!root.querySelectorAll) return; ensureCodeCss();
  var blocks=root.querySelectorAll('.cb-block'); if(!blocks.length) return;
  Array.prototype.forEach.call(blocks,function(bl){ if(bl._done) return; bl._done=1;
    var code=''; try{ code=decodeURIComponent(bl.getAttribute('data-code')||''); }catch(e){ code=bl.getAttribute('data-code')||''; }
    var lang=bl.getAttribute('data-lang')||'';
    var cp=bl.querySelector('.cb-copy'); if(cp) cp.addEventListener('click',function(){ try{ if(navigator.clipboard) navigator.clipboard.writeText(code); cp.textContent='Copié ✓'; setTimeout(function(){ cp.textContent='Copier'; },1400); }catch(e){} });
    var rn=bl.querySelector('.cb-run'); if(rn) rn.addEventListener('click',function(){ agPreviewHtml(code,lang); });
  });
  ensureHljs().then(function(ok){ if(!ok||!window.hljs) return; try{ root.querySelectorAll('.cb-pre code').forEach(function(c){ if(!c._hl){ c._hl=1; try{ window.hljs.highlightElement(c); }catch(e){} } }); }catch(e){} });
}
function agPreviewHtml(code,lang){ ensureCodeCss(); lang=(lang||'').toLowerCase(); var doc;
  var hasTags=/<[a-z!\/]/i.test(code);
  if((lang==='css') && !hasTags){ doc='<!doctype html><html><head><meta charset="utf-8"><style>'+code+'</style></head><body><h1>Titre d\'exemple</h1><p>Paragraphe de démonstration avec un <a href="#">lien</a> et du <b>texte en gras</b>.</p><button>Bouton</button><ul><li>élément 1</li><li>élément 2</li></ul></body></html>'; }
  else if((lang==='js'||lang==='javascript'||lang==='jsx') && !hasTags){ doc='<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:system-ui;padding:16px}</style></head><body><div id="app"></div><script>try{'+code+'}catch(e){document.body.insertAdjacentHTML("beforeend","<pre style=\\"color:#c0392b\\">"+e+"</pre>");}<\/script></body></html>'; }
  else { doc=code; }
  var m=document.getElementById('cbPrev');
  if(!m){ m=document.createElement('div'); m.id='cbPrev'; m.className='cb-prev'; m.hidden=true;
    m.innerHTML='<div class="cb-prev-in"><div class="cb-prev-bar"><b>&#9654; Aperçu en direct</b><button class="cb-prev-x" id="cbPrevX" aria-label="Fermer">&times;</button></div><iframe class="cb-prev-frame" id="cbPrevFrame" sandbox="allow-scripts allow-forms allow-modals allow-popups"></iframe></div>';
    document.body.appendChild(m);
    function hide(){ m.hidden=true; document.body.classList.remove('noscroll'); try{ document.getElementById('cbPrevFrame').srcdoc=''; }catch(e){} }
    m.querySelector('#cbPrevX').addEventListener('click',hide);
    m.addEventListener('click',function(e){ if(e.target===m) hide(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !m.hidden) hide(); });
  }
  try{ document.getElementById('cbPrevFrame').srcdoc=doc; }catch(e){}
  m.hidden=false; document.body.classList.add('noscroll');
}

/* appliquer les personnalisations au chargement */
(function(){ try{ agApplyCustom(); }catch(e){} })();

  /* ===== ZIP + PDF + Annuler (override) ===== */
/* ===== ZIP + PDF + Annuler (revenir comme avant) — style fonctionnalités Claude ===== */

/* ---------- Générateur ZIP autonome (méthode « stored », sans librairie) ---------- */
function agCrc32(bytes){ var c, crc=0xFFFFFFFF; for(var i=0;i<bytes.length;i++){ c=(crc^bytes[i])&0xFF; for(var k=0;k<8;k++){ c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1); } crc=(crc>>>8)^c; } return (crc^0xFFFFFFFF)>>>0; }
function agBytes(s){ return new TextEncoder().encode(String(s)); }
function agZipBytes(files){ var chunks=[], central=[], offset=0;
  function u16(n){ return [n&0xFF,(n>>>8)&0xFF]; }
  function u32(n){ return [n&0xFF,(n>>>8)&0xFF,(n>>>16)&0xFF,(n>>>24)&0xFF]; }
  files.forEach(function(f){ var data=agBytes(f.content); var name=agBytes(f.name); var crc=agCrc32(data);
    var lh=[].concat(u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0));
    var head=new Uint8Array(lh.length+name.length); head.set(lh,0); head.set(name,lh.length);
    chunks.push(head); chunks.push(data);
    var ch=[].concat(u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset));
    var cd=new Uint8Array(ch.length+name.length); cd.set(ch,0); cd.set(name,ch.length); central.push(cd);
    offset+=head.length+data.length; });
  var cdSize=central.reduce(function(a,c){ return a+c.length; },0), cdOffset=offset;
  var end=new Uint8Array([].concat(u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),u32(cdSize),u32(cdOffset),u16(0)));
  var total=offset+cdSize+end.length, out=new Uint8Array(total), pos=0;
  chunks.forEach(function(c){ out.set(c,pos); pos+=c.length; });
  central.forEach(function(c){ out.set(c,pos); pos+=c.length; });
  out.set(end,pos); return out; }
function agMakeZip(files){ return new Blob([agZipBytes(files)],{type:'application/zip'}); }
function agDownload(blob,name){ try{ var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },1500); }catch(e){} }
function agExt(lang){ lang=(lang||'').toLowerCase(); var m={html:'html',xml:'xml',svg:'svg',css:'css',js:'js',javascript:'js',jsx:'jsx',ts:'ts',typescript:'ts',python:'py',py:'py',json:'json',java:'java',c:'c',cpp:'cpp',cs:'cs',php:'php',rb:'rb',ruby:'rb',go:'go',rs:'rs',sql:'sql',sh:'sh',bash:'sh',md:'md',markdown:'md',txt:'txt'}; return m[lang]||'txt'; }
function agFileName(lang,i){ var e=agExt(lang); if(e==='html') return i===0?'index.html':('page'+(i+1)+'.html'); if(e==='css') return 'style'+(i?(i+1):'')+'.css'; if(e==='js') return 'script'+(i?(i+1):'')+'.js'; if(e==='py') return 'script'+(i?(i+1):'')+'.py'; return 'fichier'+(i+1)+'.'+e; }
function agBlocksFrom(text){ var out=[], re=/```([a-zA-Z0-9+#_-]*)[ \t]*([^\n`]*)\n?([\s\S]*?)```/g, m, cnt={}; while((m=re.exec(text))){ var lang=(m[1]||'').toLowerCase(); var hint=(m[2]||'').trim().replace(/^[:=\-]\s*/,'').replace(/^(fichier|file|nom|name)\s*[:=]?\s*/i,'').trim(); var e=agExt(lang); var idx=(cnt[e]||0); cnt[e]=idx+1; var nm=/^[\w.\-\/]+\.[A-Za-z0-9]+$/.test(hint)?hint.replace(/^\/+/,''):agFileName(lang, idx); out.push({lang:lang, code:m[3].replace(/\n$/,''), name:nm}); } return out; }
function agToEditor(files){ if(!files||!files.length) return false;
  var norm=files.map(function(f){ var nm=String(f.name||f.nom||f.fichier||'fichier.txt'); var ct=f.content!=null?f.content:(f.contenu!=null?f.contenu:(f.code!=null?f.code:'')); return {name:nm, content:String(ct)}; }).filter(function(f){ return f.name; });
  if(!norm.length) return false;
  try{ localStorage.setItem('pb_code_files', JSON.stringify(norm)); }catch(e){ return false; }
  if(typeof window.PB_codeReload==='function'){ window.PB_codeReload(true); try{ toast('Code placé dans l\'éditeur ✏️'); }catch(_){} return true; }
  try{ toast('Ouverture de l\'éditeur…'); }catch(_){}
  try{ location.href='code.html'; }catch(e){ return false; } return true; }
function agZipFromText(text,title){ var bl=agBlocksFrom(text); title=(title||'code').replace(/[^\wÀ-ɏ -]+/g,'').trim().replace(/\s+/g,'-').toLowerCase()||'code';
  if(!bl.length){ agDownload(new Blob([String(text)],{type:'text/plain;charset=utf-8'}), title+'.txt'); try{ toast('Fichier téléchargé.'); }catch(e){} return; }
  if(bl.length===1){ agDownload(new Blob([bl[0].code],{type:'text/plain;charset=utf-8'}), bl[0].name); }
  else { agDownload(agMakeZip(bl.map(function(b){ return {name:b.name,content:b.code}; })), title+'.zip'); }
  try{ toast('Code téléchargé '+(bl.length>1?'(ZIP)':'')); }catch(e){} }

/* ---------- PDF (jsPDF si dispo, sinon impression) ---------- */
var _jspdfP=null;
function ensureJsPDF(){ if(_jspdfP) return _jspdfP; _jspdfP=new Promise(function(res){ try{
  if(window.jspdf&&window.jspdf.jsPDF){ res(true); return; }
  var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  s.onload=function(){ res(!!(window.jspdf&&window.jspdf.jsPDF)); }; s.onerror=function(){ res(false); }; document.head.appendChild(s);
  setTimeout(function(){ res(!!(window.jspdf&&window.jspdf.jsPDF)); },6000);
}catch(e){ res(false); } }); return _jspdfP; }
function agMakePdf(title,md){ ensureJsPDF().then(function(ok){
  if(!ok||!(window.jspdf&&window.jspdf.jsPDF)){ try{ agDocFromText(md,title,'DOCUMENT'); toast('Clique « Imprimer / PDF » pour enregistrer en PDF.'); }catch(e){} return; }
  try{ var jsPDF=window.jspdf.jsPDF; var doc=new jsPDF({unit:'pt',format:'a4'}); var M=48,W=595-2*M,y=64,LH=15;
    function nl(h){ y+=h; if(y>842-M){ doc.addPage(); y=64; } }
    doc.setFont('helvetica','bold'); doc.setFontSize(16); doc.splitTextToSize(String(title||'Document'),W).forEach(function(x){ doc.text(x,M,y); nl(22); });
    doc.setFont('helvetica','normal'); doc.setFontSize(11);
    String(md).replace(/\r/g,'').replace(/```[a-zA-Z0-9+#_-]*\n?/g,'').replace(/```/g,'').split('\n').forEach(function(l){
      var h=l.match(/^\s*#{1,4}\s+(.*)/);
      if(h){ nl(6); doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.splitTextToSize(h[1].replace(/[*`]/g,''),W).forEach(function(x){ doc.text(x,M,y); nl(18); }); doc.setFont('helvetica','normal'); doc.setFontSize(11); return; }
      var t=l.replace(/^\s*[-*•]\s+/,'• ').replace(/\*\*/g,'').replace(/`/g,'');
      if(!t.trim()){ nl(7); return; }
      doc.splitTextToSize(t,W).forEach(function(x){ doc.text(x,M,y); nl(LH); });
    });
    var fn=(String(title||'document').replace(/[^\wÀ-ɏ -]+/g,'').trim().replace(/\s+/g,'-').toLowerCase()||'document')+'.pdf';
    doc.save(fn); try{ toast('PDF téléchargé.'); }catch(e){}
  }catch(e){ try{ agDocFromText(md,title,'DOCUMENT'); }catch(e2){} }
}); }

/* ---------- Annuler : revenir comme avant une modif d'apparence ---------- */
function agPushUndo(){ try{ var h=JSON.parse(localStorage.getItem('pb_custom_hist')||'[]'); h.push(localStorage.getItem('pb_custom')||'{}'); if(h.length>25) h.shift(); localStorage.setItem('pb_custom_hist',JSON.stringify(h)); }catch(e){} }
function agUndoStyle(){ try{ var h=JSON.parse(localStorage.getItem('pb_custom_hist')||'[]'); if(!h.length) return false; var prev=h.pop(); localStorage.setItem('pb_custom_hist',JSON.stringify(h)); localStorage.setItem('pb_custom',prev); if(window.PB_onCustomChange){ try{ window.PB_onCustomChange(JSON.parse(prev||'{}')); }catch(e){} } agApplyCustom(); return true; }catch(e){ return false; } }

/* redéfinitions : détecter « annule/comme avant » et snapshot avant chaque changement */
function agWantsStyle(t){ var s=agNorm(t);
  if(/(annule|reviens? en arriere|comme (c.?etait |etait )?avant|retablis|precedent|remets? (comme|l.?ancien)|defais|undo|reviens? a l.?ancien)/.test(s) && !/(couleur d.?origine|par defaut)/.test(s)) return {kind:'undo'};
  if(!/(fond|arriere.?plan|background|couleur|police|texte|apparence|theme couleur|style|reinitialis|remets?|annule|origine|defaut)/.test(s)) return null;
  var scopeName=/accueil|home/.test(s)?'home':(/tout|toutes les pages|partout|global|site entier|le site/.test(s)?'all':'current');
  if(/(reinitialis|remets?.*(defaut|origine)|couleurs? d.?origine|par defaut|enleve.*(couleur|style))/.test(s)) return {kind:'reset',scope:scopeName};
  var color=agParseColor(t);
  if(/(fond|arriere.?plan|background)/.test(s) && color) return {kind:'bg',color:color,scope:scopeName};
  if(/(couleur (du )?texte|texte en|police de couleur|ecriture en)/.test(s) && color) return {kind:'fg',color:color,scope:scopeName};
  if(/(accent|couleur principale|boutons? en|liens? en)/.test(s) && color) return {kind:'accent',color:color,scope:scopeName};
  if(/(plus grand|agrandi|grande police|augmente.*(taille|police)|zoom)/.test(s)) return {kind:'font',val:'118%',scope:scopeName};
  if(/(plus petit|reduis.*(taille|police)|petite police)/.test(s)) return {kind:'font',val:'92%',scope:scopeName};
  if(color && /(couleur|change|mets?|met|passe)/.test(s)) return {kind:'bg',color:color,scope:scopeName};
  return null; }
function agDoStyle(cmd){ if(!cmd) return '';
  if(cmd.kind==='undo'){ return agUndoStyle()?'C\'est revenu comme avant 👍 (tu peux répéter « annule » pour remonter encore).':'Il n\'y a aucune modification à annuler.'; }
  agPushUndo();
  var where=cmd.scope==='home'?'la page d\'accueil':(cmd.scope==='all'?'tout le site':'cette page');
  if(cmd.kind==='reset'){ agResetStyle(cmd.scope); return 'Couleurs d\'origine rétablies pour '+where+'. (Dis « annule » pour revenir en arrière.)'; }
  if(cmd.kind==='bg'){ agSetProp(cmd.scope,'bg',cmd.color); return 'J\'ai changé le fond de '+where+' en '+cmd.color+'. (Dis « annule » ou « remets comme avant » pour revenir.)'; }
  if(cmd.kind==='fg'){ agSetProp(cmd.scope,'fg',cmd.color); return 'Couleur du texte de '+where+' → '+cmd.color+'. (Dis « annule » pour revenir.)'; }
  if(cmd.kind==='accent'){ agSetProp(cmd.scope,'accent',cmd.color); return 'Couleur d\'accent de '+where+' → '+cmd.color+'.'; }
  if(cmd.kind==='font'){ agSetProp(cmd.scope,'font',cmd.val); return 'Taille du texte ajustée sur '+where+'. (Dis « annule » pour revenir.)'; }
  return ''; }

/* Aperçu : code avec bouton téléchargement en plus */
function cbHtml(pp){ var lang=(pp.lang||'').toLowerCase(); var code=pp.code||'';
  var web=/^(html|xml|svg|css|js|javascript|jsx)$/.test(lang) || /<[a-z!\/]/i.test(code);
  var bar='<div class="cb-tb"><span class="cb-lang">'+esc(lang||'code')+'</span><span class="cb-acts"><button class="cb-copy" type="button">Copier</button><button class="cb-dl" type="button">&#8681; Fichier</button>'+(web?'<button class="cb-run" type="button">Aperçu ▸</button>':'')+'</span></div>';
  return '<div class="cb-block" data-code="'+encodeURIComponent(code)+'" data-lang="'+esc(lang)+'">'+bar+'<pre class="cb-pre"><code class="hljs'+(lang?(' language-'+esc(lang)):'')+'">'+esc(code)+'</code></pre></div>';
}
function agEnhanceCode(root){ if(!root||!root.querySelectorAll) return; ensureCodeCss();
  var blocks=root.querySelectorAll('.cb-block'); if(!blocks.length) return;
  Array.prototype.forEach.call(blocks,function(bl){ if(bl._done) return; bl._done=1;
    var code=''; try{ code=decodeURIComponent(bl.getAttribute('data-code')||''); }catch(e){ code=bl.getAttribute('data-code')||''; }
    var lang=bl.getAttribute('data-lang')||'';
    var cp=bl.querySelector('.cb-copy'); if(cp) cp.addEventListener('click',function(){ try{ if(navigator.clipboard) navigator.clipboard.writeText(code); cp.textContent='Copié ✓'; setTimeout(function(){ cp.textContent='Copier'; },1400); }catch(e){} });
    var dl=bl.querySelector('.cb-dl'); if(dl) dl.addEventListener('click',function(){ try{ agDownload(new Blob([code],{type:'text/plain;charset=utf-8'}), agFileName(lang,0)); }catch(e){} });
    var rn=bl.querySelector('.cb-run'); if(rn) rn.addEventListener('click',function(){ agPreviewHtml(code,lang); });
  });
  ensureHljs().then(function(ok){ if(!ok||!window.hljs) return; try{ root.querySelectorAll('.cb-pre code').forEach(function(c){ if(!c._hl){ c._hl=1; try{ window.hljs.highlightElement(c); }catch(e){} } }); }catch(e){} });
}

  /* ===== Traceur de courbes + amélioration image ===== */
/* ===== Traceur de courbes (évaluateur f(x) sûr + tracé canvas) ===== */
function agCompile(expr){
  var s=String(expr==null?'':expr).replace(/\s+/g,'').replace(/×/g,'*').replace(/÷/g,'/').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/,/g,'.');
  s=s.replace(/^y=/i,'').replace(/^f\(x\)=/i,'').replace(/^g\(x\)=/i,'');
  if(!s) return null;
  var funcs=['asin','acos','atan','sinh','cosh','tanh','sin','cos','tan','ln','log','sqrt','abs','exp'];
  var toks=[], i=0;
  function isnum(c){ return (c>='0'&&c<='9')||c==='.'; }
  function isal(c){ return (c>='a'&&c<='z')||(c>='A'&&c<='Z'); }
  while(i<s.length){ var c=s[i];
    if(isnum(c)){ var n=''; while(i<s.length&&isnum(s[i])) n+=s[i++]; toks.push({t:'num',v:parseFloat(n)}); continue; }
    if(isal(c)){ var w=''; while(i<s.length&&isal(s[i])) w+=s[i++]; w=w.toLowerCase();
      if(w==='x') toks.push({t:'x'});
      else if(w==='pi') toks.push({t:'num',v:Math.PI});
      else if(w==='e') toks.push({t:'num',v:Math.E});
      else if(funcs.indexOf(w)>=0) toks.push({t:'func',v:w});
      else return null; continue; }
    if('+-*/^()'.indexOf(c)>=0){ toks.push({t:'op',v:c}); i++; continue; }
    return null; }
  var o2=[]; for(var k=0;k<toks.length;k++){ var a=toks[k], b=toks[k+1]; o2.push(a);
    if(b){ var av=(a.t==='num'||a.t==='x'||(a.t==='op'&&a.v===')')); var bs=(b.t==='num'||b.t==='x'||b.t==='func'||(b.t==='op'&&b.v==='(')); if(av&&bs) o2.push({t:'op',v:'*'}); } }
  toks=o2;
  var prec={'+':1,'-':1,'*':2,'/':2,'^':4,'u':3}, rassoc={'^':true,'u':true};
  var outq=[], ops=[], prev=null;
  for(var j=0;j<toks.length;j++){ var tk=toks[j];
    if(tk.t==='num'||tk.t==='x'){ outq.push(tk); prev=tk; continue; }
    if(tk.t==='func'){ ops.push(tk); prev=tk; continue; }
    var o=tk.v;
    if(o==='('){ ops.push(tk); prev=tk; continue; }
    if(o===')'){ while(ops.length&&!(ops[ops.length-1].t==='op'&&ops[ops.length-1].v==='(')) outq.push(ops.pop()); if(!ops.length) return null; ops.pop(); if(ops.length&&ops[ops.length-1].t==='func') outq.push(ops.pop()); prev={t:'op',v:')'}; continue; }
    var isu=(o==='-'&&(prev===null||(prev.t==='op'&&prev.v!==')')));
    var op=isu?'u':o;
    while(ops.length){ var top=ops[ops.length-1]; if(top.t==='func'){ outq.push(ops.pop()); continue; } if(top.t==='op'&&top.v!=='('){ var tp=prec[top.v]||0, cp=prec[op]||0; if(tp>cp||(tp===cp&&!rassoc[op])){ outq.push(ops.pop()); continue; } } break; }
    ops.push({t:'op',v:op}); prev={t:'op',v:o}; }
  while(ops.length){ var e2=ops.pop(); if(e2.t==='op'&&(e2.v==='('||e2.v===')')) return null; outq.push(e2); }
  function ap(o,a,b){ switch(o){case '+':return a+b;case '-':return a-b;case '*':return a*b;case '/':return a/b;case '^':return Math.pow(a,b);} return NaN; }
  function fn(f,a){ switch(f){case 'sin':return Math.sin(a);case 'cos':return Math.cos(a);case 'tan':return Math.tan(a);case 'asin':return Math.asin(a);case 'acos':return Math.acos(a);case 'atan':return Math.atan(a);case 'sinh':return Math.sinh(a);case 'cosh':return Math.cosh(a);case 'tanh':return Math.tanh(a);case 'ln':return Math.log(a);case 'log':return Math.log(a)/Math.LN10;case 'sqrt':return Math.sqrt(a);case 'abs':return Math.abs(a);case 'exp':return Math.exp(a);} return NaN; }
  // validate: must reduce to single value
  return function(xv){ var stk=[]; for(var m=0;m<outq.length;m++){ var e=outq[m];
    if(e.t==='num') stk.push(e.v);
    else if(e.t==='x') stk.push(xv);
    else if(e.t==='func'){ if(!stk.length) return NaN; stk.push(fn(e.v,stk.pop())); }
    else if(e.t==='op'){ if(e.v==='u'){ if(!stk.length) return NaN; stk.push(-stk.pop()); } else { if(stk.length<2) return NaN; var b=stk.pop(),a=stk.pop(); stk.push(ap(e.v,a,b)); } } }
    if(stk.length!==1) return NaN; var r=stk[0]; return (typeof r==='number'&&isFinite(r))?r:NaN; };
}
function agWantsPlot(t){ var s=String(t||''); var sl=s.toLowerCase();
  if(!/(trace|tracer|courbe|repr[ée]sente|graphe|graphique|\bplot\b|dessine)/.test(sl)) return null;
  var mcut=s.match(/(?::|\bde\b)\s*(.+)$/i); if(mcut) s=mcut[1];
  var cand=s.split(/\bet\b|;|,/i);
  var exprs=[];
  cand.forEach(function(z){ if(exprs.length>=4) return; var e=z.trim();
    e=e.replace(/^(trace[rz]?|tracer|repr[ée]sente[rz]?|dessine[rz]?|graphe[rz]?|graphique|plot|montre)\s+/i,'');
    e=e.replace(/^(la|les|une|des|du|moi)\s+/i,'').replace(/^(fonctions?|courbes?)\s+/i,'');
    e=e.replace(/^[fghy]\s*\(\s*x\s*\)\s*=/i,'').replace(/^y\s*=/i,'');
    e=e.replace(/[«».?!]/g,'').replace(/\s+/g,'');
    if(!e) return; var f=agCompile(e); if(!f) return;
    var okv=false; for(var xt=-3;xt<=3;xt++){ if(isFinite(f(xt))){ okv=true; break; } }
    if(okv) exprs.push(e); });
  return exprs.length?exprs:null;
}

/* ===== Tracé sur canvas + amélioration d'image (navigateur) ===== */
var GCOL=['#4b3fa7','#c0392b','#1f9d55','#e07b2c'];
function agPlot(canvas, exprs, opts){ opts=opts||{};
  var xmin=(opts.xmin!=null?+opts.xmin:-10), xmax=(opts.xmax!=null?+opts.xmax:10);
  if(!(xmax>xmin)){ xmin=-10; xmax=10; }
  var W=canvas.width, H=canvas.height, ctx=canvas.getContext('2d');
  var fns=exprs.map(function(e){ return {e:e,f:agCompile(e)}; }).filter(function(o){return o.f;});
  if(!fns.length) return null;
  var N=Math.max(300,W), all=[];
  var series=fns.map(function(o){ var pts=[]; for(var i=0;i<=N;i++){ var x=xmin+(xmax-xmin)*i/N; var y=o.f(x); pts.push([x,y]); if(isFinite(y)) all.push(y); } return {e:o.e,pts:pts}; });
  all.sort(function(a,b){return a-b;});
  var ymin,ymax;
  if(opts.ymin!=null&&opts.ymax!=null){ ymin=+opts.ymin; ymax=+opts.ymax; }
  else if(all.length){ var lo=all[Math.floor(all.length*0.03)], hi=all[Math.floor(all.length*0.97)]; if(!isFinite(lo))lo=-10; if(!isFinite(hi))hi=10; if(hi-lo<1e-6){ hi+=1; lo-=1; } var pad=(hi-lo)*0.12; ymin=lo-pad; ymax=hi+pad; }
  else { ymin=-10; ymax=10; }
  function X(x){ return (x-xmin)/(xmax-xmin)*W; }
  function Y(y){ return H-(y-ymin)/(ymax-ymin)*H; }
  ctx.clearRect(0,0,W,H); ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  function step(range){ var raw=range/8, p=Math.pow(10,Math.floor(Math.log(raw)/Math.LN10)), m=raw/p; return (m<1.5?1:(m<3?2:(m<7?5:10)))*p; }
  var sx=step(xmax-xmin), sy=step(ymax-ymin);
  ctx.strokeStyle='#e8e8f0'; ctx.lineWidth=1;
  for(var gx=Math.ceil(xmin/sx)*sx; gx<=xmax+1e-9; gx+=sx){ var px=X(gx); ctx.beginPath(); ctx.moveTo(px,0); ctx.lineTo(px,H); ctx.stroke(); }
  for(var gy=Math.ceil(ymin/sy)*sy; gy<=ymax+1e-9; gy+=sy){ var py=Y(gy); ctx.beginPath(); ctx.moveTo(0,py); ctx.lineTo(W,py); ctx.stroke(); }
  ctx.strokeStyle='#8a8aa0'; ctx.lineWidth=1.5;
  var yAxis=(0>=ymin&&0<=ymax), xAxis=(0>=xmin&&0<=xmax);
  if(yAxis){ ctx.beginPath(); ctx.moveTo(0,Y(0)); ctx.lineTo(W,Y(0)); ctx.stroke(); }
  if(xAxis){ ctx.beginPath(); ctx.moveTo(X(0),0); ctx.lineTo(X(0),H); ctx.stroke(); }
  ctx.fillStyle='#8a8aa0'; ctx.font='11px sans-serif';
  for(var lx=Math.ceil(xmin/sx)*sx; lx<=xmax+1e-9; lx+=sx){ if(Math.abs(lx)<1e-9) continue; ctx.fillText(''+(Math.round(lx*100)/100), X(lx)+2, (yAxis?Y(0):H)-3); }
  for(var ly=Math.ceil(ymin/sy)*sy; ly<=ymax+1e-9; ly+=sy){ if(Math.abs(ly)<1e-9) continue; ctx.fillText(''+(Math.round(ly*100)/100), (xAxis?X(0):0)+3, Y(ly)-3); }
  var band=(ymax-ymin)*4;
  series.forEach(function(s,si){ ctx.strokeStyle=GCOL[si%GCOL.length]; ctx.lineWidth=2.3; ctx.beginPath(); var pen=false, prevy=null;
    for(var i=0;i<s.pts.length;i++){ var x=s.pts[i][0], y=s.pts[i][1];
      if(!isFinite(y)||y<ymin-band||y>ymax+band){ pen=false; prevy=null; continue; }
      if(prevy!=null && Math.abs(y-prevy)>(ymax-ymin)*1.5){ pen=false; }
      var px=X(x), py=Y(y); if(!pen){ ctx.moveTo(px,py); pen=true; } else ctx.lineTo(px,py); prevy=y; }
    ctx.stroke(); });
  return {exprs:fns.map(function(o){return o.e;})};
}
function agPlotBubble(exprs, opts){ var box=(typeof agActiveBox==='function')?agActiveBox():null; if(!box) return false;
  if(!exprs||!exprs.length) return false;
  var wrap=document.createElement('div'); wrap.className='cp-msg ai';
  var cv=document.createElement('canvas'); cv.width=560; cv.height=360; cv.className='pb-graph';
  var r=agPlot(cv,exprs,opts||{}); if(!r) return false;
  wrap.appendChild(cv);
  var leg=document.createElement('div'); leg.className='pb-glegend';
  r.exprs.forEach(function(e,i){ var sp=document.createElement('span'); var sw=document.createElement('i'); sw.style.background=GCOL[i%GCOL.length]; sp.appendChild(sw); sp.appendChild(document.createTextNode(' y = '+e)); leg.appendChild(sp); });
  wrap.appendChild(leg);
  var dl=document.createElement('button'); dl.className='msg-ic'; dl.title='Télécharger (PNG)'; dl.innerHTML='&#8681; PNG'; dl.style.fontSize='.72rem'; dl.style.width='auto'; dl.style.padding='2px 8px';
  dl.addEventListener('click',function(){ try{ var a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download='courbe.png'; document.body.appendChild(a); a.click(); a.remove(); }catch(e){} });
  wrap.appendChild(dl);
  box.appendChild(wrap); box.scrollTop=box.scrollHeight; return true;
}
function agEnhanceImage(dataUrl){ return new Promise(function(res){ try{ var img=new Image();
  img.onload=function(){ try{ var w=img.width,h=img.height; var up=Math.min(2, 1280/Math.max(w,h)); if(up<1) up=1; var cw=Math.round(w*up), ch=Math.round(h*up);
    var cv=document.createElement('canvas'); cv.width=cw; cv.height=ch; var ctx=cv.getContext('2d'); ctx.drawImage(img,0,0,cw,ch);
    var id=ctx.getImageData(0,0,cw,ch), d=id.data; var contrast=1.32, br=6, f=(259*(contrast*255+255))/(255*(259-contrast*255));
    for(var i=0;i<d.length;i+=4){ for(var k=0;k<3;k++){ var v=f*(d[i+k]-128)+128+br; d[i+k]=v<0?0:(v>255?255:v); } }
    ctx.putImageData(id,0,0); res(cv.toDataURL('image/jpeg',0.9)); }catch(e){ res(dataUrl); } };
  img.onerror=function(){ res(dataUrl); }; img.src=dataUrl; }catch(e){ res(dataUrl); } }); }

  window.PB_ASK=function(prompt){ openPanel(); prompt=(prompt||'').trim(); var last=prompt.slice(-1);
    if(last===':'||last==='：'){ if(input){ input.value=prompt+' '; input.focus(); } } else { ask(prompt); } };
  // Ponts pour la synchronisation avec le compte (auth.js) — multi-conversations
  window.PB_chat={
    getAll:function(){ return convos; },
    setAll:function(arr){ if(Array.isArray(arr)&&arr.length){ convos=arr; if(!byId(curId)) curId=convos[0].id; try{ localStorage.setItem('pb_convos',JSON.stringify(convos.slice(0,40))); }catch(e){} render(); } }
  };
})();
/* ---- progression, streak, PWA ---- */
(function(){
  function ls(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
  function ss(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  var prog=ls('progress',{});
  document.querySelectorAll('.pmark-wrap').forEach(function(w){
    var chap=w.getAttribute('data-chap');
    w.querySelectorAll('.pmark').forEach(function(b){
      var st=b.getAttribute('data-st');
      if(prog[chap]===st) b.classList.add('on-'+st);
      b.addEventListener('click',function(e){
        e.stopPropagation();
        if(prog[chap]===st){ delete prog[chap]; } else { prog[chap]=st; }
        ss('progress',prog);
        w.querySelectorAll('.pmark').forEach(function(x){ x.classList.remove('on-ok','on-revoir'); });
        if(prog[chap]){ var sel=w.querySelector('.pmark[data-st="'+prog[chap]+'"]'); if(sel) sel.classList.add('on-'+prog[chap]); }
      });
    });
  });
  var today=new Date().toISOString().slice(0,10);
  var stk=ls('streak',{last:'',n:0});
  if(stk.last!==today){ var y=new Date(Date.now()-86400000).toISOString().slice(0,10); stk.n=(stk.last===y)?(stk.n+1):1; stk.last=today; ss('streak',stk); }
  if('serviceWorker' in navigator){ window.addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js').then(function(reg){ try{reg.update();}catch(e){}
      reg.addEventListener('updatefound',function(){ var nw=reg.installing; if(!nw)return; nw.addEventListener('statechange',function(){ if(nw.state==='installed' && navigator.serviceWorker.controller){ try{nw.postMessage('skipWaiting');}catch(e){} } }); });
    }).catch(function(){});
    var refreshing=false; navigator.serviceWorker.addEventListener('controllerchange',function(){ if(refreshing)return; refreshing=true; window.location.reload(); });
  }); }
})();
/* ---- gamification : XP, niveaux, badges ---- */
(function(){
  function ls(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
  function ss(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  var BADGES=[
    {id:'first_qcm',name:'Première question',cond:function(g){return (g.qcmAnswered||0)>=1;}},
    {id:'qcm50',name:'Quiz-addict (50 Q)',cond:function(g){return (g.qcmAnswered||0)>=50;}},
    {id:'qcm200',name:'Machine à QCM (200 Q)',cond:function(g){return (g.qcmAnswered||0)>=200;}},
    {id:'streak3',name:'Régulier · 3 jours',cond:function(){return (ls('streak',{n:0}).n||0)>=3;}},
    {id:'streak7',name:'Discipliné · 7 jours',cond:function(){return (ls('streak',{n:0}).n||0)>=7;}},
    {id:'xp250',name:'Studieux',cond:function(g){return (g.xp||0)>=250;}},
    {id:'xp1000',name:"Élite du travail",cond:function(g){return (g.xp||0)>=1000;}},
    {id:'compris10',name:'10 chapitres maîtrisés',cond:function(){var p=ls('progress',{}),n=0;for(var k in p)if(p[k]==='ok')n++;return n>=10;}},
    {id:'pomo5',name:'5 Pomodoros',cond:function(){return (ls('pomos',[]).length)>=5;}},
    {id:'daily',name:'Défi du jour relevé',cond:function(g){return !!g.daily;}}
  ];
  function level(xp){ return 1+Math.floor(Math.sqrt((xp||0)/40)); }
  function xpForLevel(l){ return 40*(l-1)*(l-1); }
  function toast(m){ var T=document.getElementById('toast'); if(!T)return; T.textContent=m; T.classList.add('on'); clearTimeout(window.__gt); window.__gt=setTimeout(function(){T.classList.remove('on');},2600); }
  window.PB_gam=function(){ return ls('gam',{xp:0,qcmAnswered:0,badges:[]}); };
  window.PB_level=level; window.PB_xpForLevel=xpForLevel; window.PB_BADGES=BADGES;
  window.PB_award=function(amt,reason,meta){
    var g=ls('gam',{xp:0,qcmAnswered:0,badges:[]}); if(!g.badges)g.badges=[];
    var before=level(g.xp||0); g.xp=(g.xp||0)+(amt||0);
    if(meta&&meta.qcm) g.qcmAnswered=(g.qcmAnswered||0)+meta.qcm;
    if(meta&&meta.daily) g.daily=meta.daily;
    var newb=[]; BADGES.forEach(function(b){ if(g.badges.indexOf(b.id)<0 && b.cond(g)){ g.badges.push(b.id); newb.push(b.name); } });
    ss('gam',g); var after=level(g.xp);
    if(amt>0 && reason) toast('+'+amt+' XP · '+reason);
    if(after>before) setTimeout(function(){toast('Niveau '+after+' atteint ! 🎉');},700);
    newb.forEach(function(n,i){ setTimeout(function(){toast('Badge : '+n+' 🏅');},1300+i*900); });
    return g;
  };
})();
/* ---- vidéos de cours (YouTube, chargement à la demande) + secours niveau ---- */
(function(){
  document.querySelectorAll('.vbtn').forEach(function(b){
    if(b.tagName==='A') return; // lien direct (recherche française) : garder la navigation par défaut
    b.addEventListener('click',function(e){ e.stopPropagation(); if(b.dataset.done)return; b.dataset.done='1';
      var id=b.getAttribute('data-yt')||'', q=b.getAttribute('data-q')||'';
      var frag=document.createDocumentFragment();
      if(id){ var w=document.createElement('div'); w.className='vwrap';
        w.innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?rel=0" title="Cours en vidéo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>';
        frag.appendChild(w); }
      if(q){ var n=document.createElement('div'); n.className='vnote';
        n.innerHTML='<a href="'+q+'" target="_blank" rel="noopener">▸ Voir d’autres profs (cours en français, les plus vus)</a>';
        frag.appendChild(n); }
      b.parentNode.insertBefore(frag,b.nextSibling); b.style.display='none';
    });
  });
  document.querySelectorAll('.simbtn').forEach(function(b){
    b.addEventListener('click',function(e){ e.stopPropagation(); if(b.dataset.done)return; b.dataset.done='1';
      var src=b.getAttribute('data-sim'); if(!src)return;
      var w=document.createElement('div'); w.className='simwrap';
      w.innerHTML='<iframe src="'+src+'" allowfullscreen loading="lazy" title="Simulateur interactif"></iframe>';
      var n=document.createElement('div'); n.className='vnote';
      n.innerHTML='Simulateur PhET (Université du Colorado), en français — glisse, modifie, observe. <a href="'+src+'" target="_blank" rel="noopener">Ouvrir en plein écran ▸</a>';
      b.parentNode.insertBefore(w,b.nextSibling); w.parentNode.insertBefore(n,w.nextSibling); b.style.display='none';
    });
  });
})();
/* ================= Fiches express (résumé imprimable) ================= */
(function(){
  var modal=document.getElementById('ficheModal'); if(!modal) return;
  var holder=document.getElementById('ficheHolder');
  function open(src){ holder.innerHTML=src.innerHTML; modal.hidden=false; document.body.classList.add('noscroll'); }
  function close(){ modal.hidden=true; holder.innerHTML=''; document.body.classList.remove('noscroll'); }
  function bind(sel,srcClass){ document.querySelectorAll(sel).forEach(function(b){
    b.addEventListener('click',function(e){ e.stopPropagation();
      var body=b.closest('.lz-body'); if(!body) return;
      var src=body.querySelector(srcClass); if(src) open(src);
    });
  }); }
  bind('.fbtn','.fiche-src'); bind('.sbtn','.serie-src');
  var c=document.getElementById('ficheClose'); if(c) c.addEventListener('click',close);
  var p=document.getElementById('fichePrint'); if(p) p.addEventListener('click',function(){ window.print(); });
  modal.addEventListener('click',function(e){ if(e.target===modal) close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !modal.hidden) close(); });
})();
/* ================= Calculatrice scientifique — moteur fait maison (sans eval), testé ================= */
(function(){
  function tokenize(s){
    var out=[], i=0, funcs=['asin','acos','atan','sin','cos','tan','ln','log','sqrt','abs','exp'];
    function prevType(){ if(!out.length) return null; var t=out[out.length-1]; if(t.t==='num'||t.t==='const'||t.t===')'||t.t==='!') return 'val'; return t.t; }
    while(i<s.length){
      var c=s[i];
      if(c===' '){ i++; continue; }
      if(/[0-9.]/.test(c)){ var j=i+1; while(j<s.length && /[0-9.]/.test(s[j])) j++; if(prevType()==='val') out.push({t:'op',v:'*'}); out.push({t:'num',v:parseFloat(s.slice(i,j))}); i=j; continue; }
      if(/[a-zπ]/i.test(c)){
        if(c==='π'){ if(prevType()==='val') out.push({t:'op',v:'*'}); out.push({t:'const',v:Math.PI}); i++; continue; }
        var matched=null; for(var f=0;f<funcs.length;f++){ if(s.substr(i,funcs[f].length).toLowerCase()===funcs[f]){ matched=funcs[f]; break; } }
        if(matched){ if(prevType()==='val') out.push({t:'op',v:'*'}); out.push({t:'func',v:matched}); i+=matched.length; continue; }
        if(s.substr(i,2).toLowerCase()==='pi'){ if(prevType()==='val') out.push({t:'op',v:'*'}); out.push({t:'const',v:Math.PI}); i+=2; continue; }
        if(c.toLowerCase()==='e'){ if(prevType()==='val') out.push({t:'op',v:'*'}); out.push({t:'const',v:Math.E}); i++; continue; }
        throw 'Erreur';
      }
      if(c==='('){ if(prevType()==='val') out.push({t:'op',v:'*'}); out.push({t:'(',v:'('}); i++; continue; }
      if(c===')'){ out.push({t:')',v:')'}); i++; continue; }
      if(c==='!'){ out.push({t:'!',v:'!'}); i++; continue; }
      if('+-*/^'.indexOf(c)>=0){ if(c==='-'||c==='+'){ var pt=prevType(); if(pt===null||pt==='('||pt==='op'){ out.push({t:'op',v:(c==='-'?'u-':'u+')}); i++; continue; } } out.push({t:'op',v:c}); i++; continue; }
      throw 'Erreur';
    }
    return out;
  }
  var PREC={'u-':4,'u+':4,'^':4,'*':3,'/':3,'+':2,'-':2}, RIGHT={'^':1,'u-':1,'u+':1};
  function toRPN(tokens){
    var out=[], st=[];
    for(var k=0;k<tokens.length;k++){ var t=tokens[k];
      if(t.t==='num'||t.t==='const') out.push(t);
      else if(t.t==='func') st.push(t);
      else if(t.t==='!') out.push(t);
      else if(t.t==='op'){ while(st.length){ var top=st[st.length-1]; if(top.t==='op' && (PREC[top.v]>PREC[t.v] || (PREC[top.v]===PREC[t.v] && !RIGHT[t.v]))) out.push(st.pop()); else break; } st.push(t); }
      else if(t.t==='(') st.push(t);
      else if(t.t===')'){ while(st.length && st[st.length-1].t!=='(') out.push(st.pop()); if(!st.length) throw 'Parenthèses'; st.pop(); if(st.length && st[st.length-1].t==='func') out.push(st.pop()); }
    }
    while(st.length){ var x=st.pop(); if(x.t==='('||x.t===')') throw 'Parenthèses'; out.push(x); }
    return out;
  }
  function fact(n){ if(n<0||n!==Math.floor(n)) throw 'x!'; if(n>170) return Infinity; var r=1; for(var i=2;i<=n;i++) r*=i; return r; }
  function evalRPN(rpn,deg){
    var st=[], D=deg?Math.PI/180:1, ID=deg?180/Math.PI:1;
    for(var k=0;k<rpn.length;k++){ var t=rpn[k];
      if(t.t==='num'||t.t==='const'){ st.push(t.v); continue; }
      if(t.t==='!'){ st.push(fact(st.pop())); continue; }
      if(t.t==='func'){ var a=st.pop(), r;
        switch(t.v){ case 'sin':r=Math.sin(a*D);break; case 'cos':r=Math.cos(a*D);break; case 'tan':r=Math.tan(a*D);break;
          case 'asin':r=Math.asin(a)*ID;break; case 'acos':r=Math.acos(a)*ID;break; case 'atan':r=Math.atan(a)*ID;break;
          case 'ln':r=Math.log(a);break; case 'log':r=Math.log(a)/Math.LN10;break; case 'sqrt':r=Math.sqrt(a);break;
          case 'abs':r=Math.abs(a);break; case 'exp':r=Math.exp(a);break; }
        st.push(r); continue; }
      if(t.t==='op'){ if(t.v==='u-'){ st.push(-st.pop()); continue; } if(t.v==='u+'){ continue; }
        var b=st.pop(), aa=st.pop();
        switch(t.v){ case '+':st.push(aa+b);break; case '-':st.push(aa-b);break; case '*':st.push(aa*b);break; case '/':st.push(aa/b);break; case '^':st.push(Math.pow(aa,b));break; } }
    }
    if(st.length!==1) throw 'Erreur';
    return st[0];
  }
  function calc(expr,deg){ return evalRPN(toRPN(tokenize(expr)),deg); }
  function fmt(x){ if(typeof x!=='number'||isNaN(x)) throw 'Erreur'; if(!isFinite(x)) return (x>0?'∞':'-∞'); var r=Math.round(x*1e12)/1e12; if(Math.abs(r)>=1e15||(r!==0&&Math.abs(r)<1e-12)) return x.toExponential(9).replace(/\.?0+e/,'e'); return String(r); }
  function initCalc(root){
    var inp=root.querySelector('.sc-expr'), res=root.querySelector('.sc-res'), memEl=root.querySelector('.sc-mem');
    var deg=true, mem=0, lastAns=0, justEval=false;
    function setMem(){ if(memEl) memEl.textContent = mem? ('M = '+fmt(mem)) : ''; }
    function insert(txt){
      if(justEval){ if(txt.length===1 && '+-*/^!'.indexOf(txt)>=0){ inp.value=fmt(lastAns); } else { inp.value=''; } justEval=false; }
      var s=inp.value, a=(inp.selectionStart==null?s.length:inp.selectionStart), b=(inp.selectionEnd==null?s.length:inp.selectionEnd);
      inp.value=s.slice(0,a)+txt+s.slice(b); var pos=a+txt.length; inp.focus(); try{inp.setSelectionRange(pos,pos);}catch(e){}
    }
    function evaluate(){ try{ var v=calc(inp.value.replace(/×/g,'*').replace(/÷/g,'/').replace(/√/g,'sqrt'), deg); res.textContent=fmt(v); lastAns=v; justEval=true; } catch(e){ res.textContent='Erreur'; } }
    root.querySelectorAll('[data-k]').forEach(function(b){ b.addEventListener('click',function(){ insert(b.getAttribute('data-k')); }); });
    root.querySelectorAll('[data-act]').forEach(function(b){ b.addEventListener('click',function(){ var a=b.getAttribute('data-act');
      if(a==='ac'){ inp.value=''; res.textContent='0'; justEval=false; inp.focus(); }
      else if(a==='del'){ var s=inp.value,p=(inp.selectionStart==null?s.length:inp.selectionStart); if(p>0){ inp.value=s.slice(0,p-1)+s.slice(p); inp.focus(); try{inp.setSelectionRange(p-1,p-1);}catch(e){} } }
      else if(a==='eq'){ evaluate(); }
      else if(a==='ans'){ insert(fmt(lastAns)); }
      else if(a==='mplus'){ evaluate(); mem+=lastAns; setMem(); }
      else if(a==='mminus'){ evaluate(); mem-=lastAns; setMem(); }
      else if(a==='mr'){ insert(fmt(mem)); }
      else if(a==='mc'){ mem=0; setMem(); }
    }); });
    root.querySelectorAll('.sc-mode').forEach(function(b){ b.addEventListener('click',function(){ deg=(b.getAttribute('data-mode')==='DEG'); root.querySelectorAll('.sc-mode').forEach(function(x){ x.classList.toggle('on', x===b); }); }); });
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); evaluate(); } });
    inp.addEventListener('input',function(){ justEval=false; });
  }
  document.querySelectorAll('.scicalc').forEach(initCalc);
})();
