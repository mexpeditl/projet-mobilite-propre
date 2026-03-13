const CACHE_NAME = "mobilite-propre-v1";

const urlsToCache = [
"/",
"/index.html",
"/style.css",
"/assets/hero-douala.jpg"
];

self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);

});

self.addEventListener("fetch", event => {

event.respondWith(
caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})
);

});

// Ce script permet :

// de mettre ton site en cache

// de le charger instantanément

// de fonctionner hors connexion
