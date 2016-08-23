var cacheName = 'weatherPWA-step-5-1'; // for versioning
var filesToCache = [];

/*
 When the service worker is registered,
 an install event is triggered the first time the user visits the page.
 git   In this event handler, we will cache all the assets that are needed for the application.
 */
self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) { // be sure to bump cacheName in service worker changes
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache)
    })
  )
});

// Get all cacheKeys and delete unused ones
self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }))
    })
  )
})