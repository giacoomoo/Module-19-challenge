const {
    offlineFallback,
    warmStrategyCache
} = require("workbox-recipes"), {CacheFirst} = require("workbox-strategies"), {registerRoute} = require("workbox-routing"), {CacheableResponsePlugin} = require("workbox-cacheable-response"), {ExpirationPlugin} = require("workbox-expiration"), {precacheAndRoute} = require("workbox-precaching/precacheAndRoute");
precacheAndRoute(self.__WB_MANIFEST);
const pageCache = new CacheFirst({
    cacheName: "page-cache",
    plugins: [new CacheableResponsePlugin({statuses: [0, 200]}), new ExpirationPlugin({maxAgeSeconds: 2592e3})]
});
warmStrategyCache({
    urls: ["/index.html", "/"],
    strategy: pageCache
}), registerRoute((({request: e}) => "navigate" === e.mode), pageCache), registerRoute();