const V='casos-v29',SHELL=['./','index.html','config.js','logo.png','manifest.webmanifest','icon-192.png','icon-512.png','privacidad.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||/supabase\.co$/.test(new URL(e.request.url).hostname))return;
 e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(h=>h||caches.match('index.html'))))});
