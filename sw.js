const V='casos-v69',SHELL=['./','index.html','config.js','supabase.js','logo.png','logo-s.png','manifest.webmanifest','icon-192.png','icon-512.png','privacidad.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||/supabase\.co$/.test(new URL(e.request.url).hostname))return;
 e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(h=>h||caches.match('index.html'))))});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={title:'Sinfín',body:e.data?e.data.text():''}}
 e.waitUntil((async()=>{
  if(d.tag&&String(d.tag).indexOf('pomo-fin')===0){try{(await self.registration.getNotifications({tag:'pomo-run'})).forEach(n=>n.close())}catch(_){}}
  const t=d.title||'Sinfín';
  try{await self.registration.showNotification(t,{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||undefined,data:{url:d.url||'./'}})}
  catch(_){await self.registration.showNotification(t,{body:d.body||''})}
 })())});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||'./';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow(u)}))});
