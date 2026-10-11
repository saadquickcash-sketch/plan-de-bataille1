var CACHE='pb-v126';
var ASSETS=['./','index.html','revision.html','qcm.html','flashcards.html','outils.html','progres.html','examens.html','youssef.html','echecs.html','code.html','premium.html','checkout.html','cashplus.png','code-editor.js','premium.js','chess-lib.js','chess-app.js','sf.js','styles.css','app.js','data.js','examens.js','exos_maths.js','exos_pc.js','oeuvres.js','auth.js','firebase-config.js','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/brio.svg','icons/favicon-32.png','icons/favicon-16.png'];
self.addEventListener('install',function(e){ e.waitUntil(caches.open(CACHE).then(function(c){ return Promise.all(ASSETS.map(function(u){return c.add(u).catch(function(){});})); }).then(function(){return self.skipWaiting();})); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();})); });
self.addEventListener('message',function(e){ if(e.data==='skipWaiting') self.skipWaiting(); });
// Réseau d'abord : toujours la dernière version en ligne ; le cache ne sert qu'hors-ligne.
self.addEventListener('fetch',function(e){ if(e.request.method!=='GET')return; var u=new URL(e.request.url); if(u.origin!==location.origin)return;
  if(u.pathname.indexOf('/api/')===0) return; // API (TTS, chat, recherche) : réseau direct + cache edge Cloudflare, jamais mis en cache par le SW
  e.respondWith( fetch(e.request).then(function(res){ var rc=res.clone(); caches.open(CACHE).then(function(c){c.put(e.request,rc);}); return res; })
    .catch(function(){ return caches.match(e.request).then(function(r){ return r || caches.match('index.html'); }); }) ); });

/* ===== Rappels quotidiens motivants (best-effort : Periodic Background Sync) ===== */
var BRIO_MSGS=[
 "Chaque jour compte. Un chapitre aujourd'hui, c'est un point de plus au Bac 💪",
 "Ta moyenne se construit maintenant. Ouvre Brio et avance un peu 🚀",
 "Les grands élèves ne sont pas les plus doués, mais les plus réguliers. À toi de jouer !",
 "10 minutes de révision valent mieux que 0. On s'y met ? 📚",
 "Le futur toi te remerciera pour l'effort d'aujourd'hui. Allez, un QCM rapide ?",
 "La régularité bat le talent. Reviens sur Brio et garde ton streak 🔥",
 "Un chapitre « à revoir » t'attend. Transforme-le en « maîtrisé » ✓",
 "Rêver de 17,5/20, c'est bien. Réviser pour l'obtenir, c'est mieux. On y va !",
 "Petit pas aujourd'hui, grand résultat en juin. Ouvre une leçon 🌱",
 "Ton cerveau est un muscle : entraîne-le un peu chaque jour 🧠",
 "Les maths et la physique n'attendent pas. 5 minutes suffisent pour commencer.",
 "Tu es plus proche de ton objectif qu'hier. Continue sur ta lancée !",
 "Une série d'exercices bien choisis > une heure à scroller. On révise ? ✍️",
 "Le succès aime les habitudes. Fais de Brio ton rendez-vous quotidien.",
 "Aujourd'hui est parfait pour maîtriser un nouveau chapitre. Lance-toi !",
 "Ne casse pas la chaîne 🔗 : reviens réviser et garde ta série intacte.",
 "Chaque exercice résolu est une victoire. Va en chercher une aujourd'hui 🏅",
 "La différence entre 14 et 17, c'est la constance. Prouve-la aujourd'hui.",
 "Un QCM par jour éloigne le stress de l'examen. Teste-toi maintenant !",
 "Ton objectif Bac se rapproche. Un chapitre de plus, une inquiétude de moins.",
 "Le meilleur moment pour réviser, c'était hier. Le deuxième meilleur, c'est maintenant ⏳",
 "Discipline aujourd'hui, liberté demain. Ouvre Brio et avance 🎯",
 "Tu as tout ce qu'il faut pour réussir. Il ne manque que 15 minutes de travail.",
 "Transforme « je réviserai » en « j'ai révisé ». Ça commence par un clic.",
 "Les points faibles d'aujourd'hui sont les forces de demain. Attaque-les !",
 "Reste sur ta trajectoire : un peu chaque jour, et le programme sera à toi.",
 "Un cours relu, une fiche parcourue, un QCM tenté — choisis-en un aujourd'hui.",
 "Fès t'attend en tête de classe. Le travail d'aujourd'hui t'y emmène 🌟",
 "Ne laisse pas un jour vide. Même 5 minutes font avancer ta préparation.",
 "Champion·ne du Bac se prépare en silence, jour après jour. À toi de jouer !"
];
self.addEventListener('periodicsync',function(e){ if(e.tag==='brio-daily'){ e.waitUntil(brioDailyNudge()); } });
async function brioDailyNudge(){
  try{
    var today=new Date().toISOString().slice(0,10);
    try{ var c=await caches.open('brio-meta'); var r=await c.match('lastVisit'); if(r){ var last=(await r.text()); if(last===today) return; } }catch(_){}
    var day=Math.floor(Date.now()/86400000); var msg=BRIO_MSGS[day % BRIO_MSGS.length];
    await self.registration.showNotification('Brio 📚',{ body:msg, icon:'icons/icon-192.png', badge:'icons/favicon-32.png', tag:'brio-daily', renotify:true });
  }catch(e){}
}
self.addEventListener('notificationclick',function(e){ e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){ if('focus' in list[i]) return list[i].focus(); }
    if(clients.openWindow) return clients.openWindow('./revision.html');
  })); });
