var CACHE='pb-v52';
var ASSETS=['./','index.html','revision.html','qcm.html','flashcards.html','outils.html','progres.html','examens.html','youssef.html','echecs.html','code.html','premium.html','checkout.html','cashplus.png','code-editor.js','premium.js','chess-lib.js','sf.js','styles.css','app.js','data.js','auth.js','firebase-config.js','manifest.json','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',function(e){ e.waitUntil(caches.open(CACHE).then(function(c){ return Promise.all(ASSETS.map(function(u){return c.add(u).catch(function(){});})); }).then(function(){return self.skipWaiting();})); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();})); });
self.addEventListener('message',function(e){ if(e.data==='skipWaiting') self.skipWaiting(); });
// Réseau d'abord : toujours la dernière version en ligne ; le cache ne sert qu'hors-ligne.
self.addEventListener('fetch',function(e){ if(e.request.method!=='GET')return; var u=new URL(e.request.url); if(u.origin!==location.origin)return;
  e.respondWith( fetch(e.request).then(function(res){ var rc=res.clone(); caches.open(CACHE).then(function(c){c.put(e.request,rc);}); return res; })
    .catch(function(){ return caches.match(e.request).then(function(r){ return r || caches.match('index.html'); }); }) ); });
