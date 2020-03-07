const CACHE_NAME = "FootballPWA";
var base_url = "https://api.football-data.org/v2/";

//cache apa saja yang mau disimpan

// var urlsToCache = [
//   "/",
//   "/manifest.json",
//   "/nav.html",
//   "/index.html",
//   "/js/register_service_worker.js",
//   "/pages/home.html",
//   "/css/home_style.css",
//   "/css/materialize.min.css",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/icon.png",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/api.js",
//   "/pages/favorit.html",
//   "/pages/matches.html",
//   "tim.html",
//   "team.js",
//   "assets/cl.jpg"
// ];


//workbox

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

if(workbox){
workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url : '/manifest.json', revision:'1'},
    { url : '/nav.html', revision:'1'},
    { url : '/index.html', revision:'1'},
    { url : '/js/register_service_worker.js', revision:'1'},
    { url : '/pages/home.html', revision:'1'},
    { url : '/css/home_style.css', revision:'1'},
    { url : '/css/materialize.min.css', revision:'1'},
    { url : '/js/materialize.min.js', revision:'1'},
    { url : '/js/nav.js', revision:'1'},
    { url : '/icon.png', revision:'1'},
    { url : '/js/idb.js', revision:'1'},
    { url : '/js/db.js', revision:'1'},
    { url : '/js/api.js', revision:'1'},
    { url : '/pages/favorit.html', revision:'1'},
    { url : '/pages/matches.html', revision:'1'},
    { url : 'tim.html', revision:'1'},
    { url : 'team.js', revision:'1'},
    { url : 'assets/cl.jpg', revision:'1'}
]);

workbox.routing.registerRoute(
    new RegExp(base_url),
    workbox.strategies.staleWhileRevalidate()
  );

workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: CACHE_NAME,
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

  console.log('[Workbox] berhasil dimuat');
}
else {
  console.log('[Workbox] gagal dimuat');
};

//menyimpan cache
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//make cache yang disimpan

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches
//       .match(event.request, { cacheName: CACHE_NAME })
//       .then(function(response) {
//         if (response) {
//           console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//           return response;
//         }
 
//         console.log(
//           "ServiceWorker: Memuat aset dari server: ",
//           event.request.url
//         );
//         return fetch(event.request);
//       })
//   );
// });

///Menyimpan Cache Secara Dinamis
self.addEventListener("fetch", function (event) {
    
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

//untuk hapus cache

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


//untuk menerima push notification

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});