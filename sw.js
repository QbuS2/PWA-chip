self.addEventListener('install', event => {
  event.waitUntil(
      caches.open('v1').then(cache => {
          return cache.addAll([
            "/chip_ui/DEMO/e43127ad9018ad11dcc0a695356dbbb3/pwa/index.html",
            "/chip_ui/DEMO/e43127ad9018ad11dcc0a695356dbbb3/pwa/style.css",
            "/chip_ui/DEMO/e43127ad9018ad11dcc0a695356dbbb3/pwa/Chip192.png",
            "/chip_ui/DEMO/e43127ad9018ad11dcc0a695356dbbb3/pwa/Chip512.png"
          ]);
      }, error => {
          console.log(`Installation failed with error: ${error}`);
      })
  );
});

self.addEventListener('activate', event => {
  let cacheKeepList = ['v1'];
  
  event.waitUntil(
      caches.keys().then( keyList => {
          return Promise.all(keyList.map(function(key) {
              if (cacheKeepList.indexOf(key) === -1) {
                  return caches.delete(key);
              }
          }));
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method != 'GET') return;
  
  event.respondWith(async function() {
      const cache = await caches.open('v1');
      const cachedResponse = await cache.match(event.request);
      
      if (cachedResponse) {
          event.waitUntil(cache.add(event.request));
          return cachedResponse;
      }
      
      return fetch(event.request);
  }());
});