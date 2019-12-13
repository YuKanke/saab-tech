var cacheName = 'SaaB-Tech';
var filesToCache = [
  '/',
  '/index.html',
  '/css/agency.min.css',
  '/js/agency.min.js',
  '/vendor/bootstrap/css/bootstrap.min.css',
  '/vendor/fontawesome-free/css/all.min.css',
  '/vendor/jquery/jquery.min.js',
  '/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/vendor/jquery-easing/jquery.easing.min.js',
  '/js/jqBootstrapValidation.js',
  '/js/contact_me.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
