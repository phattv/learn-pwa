var cacheName = 'weatherPWA-step-5-1';
var filesToCache = [];

/*
 When the service worker is registered,
 an install event is triggered the first time the user visits the page.
 git   In this event handler, we will cache all the assets that are needed for the application.
 */
self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache)
    })
  )
});