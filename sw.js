const staticCacheName = "restaurant-review-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        "/",
        "./index.html",
        "./restaurant.html",
        "./css/styles.css",
        "./css/styles.md.css",
        "./css/styles.lg.css",
        "./js/dbhelper.js",
        "./js/main.js",
        "./js/restaurant_info.js",
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
        "./img/5.jpg",
        "./img/6.jpg",
        "./img/7.jpg",
        "./img/8.jpg",
        "./img/9.jpg",
        "./img/10.jpg"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(
            cName =>
              cName.startsWith("restaureant-review-") &&
              cName != staticCacheName
          )
        );
      })
      .map(cName => caches.delete(cName))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then(res => res || fetch(event.request))
      .catch(err => console.log(err, event.request))
  );
});
