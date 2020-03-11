const CACHE_NAME = "FootballPWA";
var base_url = "https://api.football-data.org/v2/";

//workbox

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

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
],{
	ignoreURLParametersMatching:[/.*/]
});

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