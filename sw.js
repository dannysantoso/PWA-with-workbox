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
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'pwa-image-cache',
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