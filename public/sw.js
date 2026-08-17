const CACHE_NAME = 'toolsora-v2';
const OFFLINE_URL = '/';

// Only keep a minimal offline fallback in the cache.
// HTML navigations always prefer the latest server version so
// newly deployed pages cannot get stuck behind a stale cache.
const OFFLINE_CACHE_URLS = [
  OFFLINE_URL,
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(OFFLINE_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Always fetch HTML navigations from the network first.
  // This prevents stale homepage/route HTML from being served after deployment.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // For other GET requests, use the cache when available and
  // fall back to the network. Never intercept non-GET requests.
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).catch(() => undefined);
      })
  );
});
