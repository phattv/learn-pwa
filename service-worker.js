var cacheName = 'weatherPWA-step-5-1'; // for versioning
var filesToCache = [
  './index.html',
  './scripts/app.js',
  './styles/inline.css',
  './images/clear.png',
  './images/cloudy-scattered-showers.png',
  './images/cloudy.png',
  './images/fog.png',
  './images/ic_add_white_24px.svg',
  './images/ic_refresh_white_24px.svg',
  './images/partly-cloudy.png',
  './images/rain.png',
  './images/scattered-showers.png',
  './images/sleet.png',
  './images/snow.png',
  './images/thunderstorm.png',
  './images/wind.png'
];

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
});

/*
 caches.match() evaluates the web request that triggered the fetch event,
 and checks to see if it’s available in the cache.
 It then either responds with the cached version,
 or uses fetch to get a copy from the network.
 The response is passed back to the web page with e.respondWith()
 */
self.addEventListener('fetch', function (event) {
  console.log('[ServiceWorker] Fetch');
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  )
});