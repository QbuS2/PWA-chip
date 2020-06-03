var isTooSoon = true;
self.addEventListener("beforeinstallprompt", function (e) {
  if (isTooSoon) {
    e.preventDefault(); // Prevents prompt display
    // Prompt later instead:
    setTimeout(function () {
      isTooSoon = false;
      e.prompt(); // Throws if called more than once or default not prevented
    }, 10000);
  }
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        '/index.html',
        '/Chip192.png',
        '/Chip512.png',
        '/style.css',
        '/serviceWorker.js',
        '/manifest.json',
      ])
        .then(() => self.skipWaiting());
    })
  )
});