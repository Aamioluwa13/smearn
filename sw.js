const CACHE_NAME = 'smearn-ai-cache-v1';

// On install, cache the app shell and other critical assets.
self.addEventListener('install', (event) => {
  async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    // These are the core files that make up the app's shell.
    // The browser will fetch other dependencies which will be cached by the 'fetch' event.
    return cache.addAll([
      '/',
      '/index.html',
      '/icon.svg',
      '/index.tsx',
      '/App.tsx',
      '/types.ts',
      '/constants.ts'
    ]);
  }
  event.waitUntil(preCache());
});

// On activate, clean up old caches.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// On fetch, serve from cache first, then fall back to network (cache-first strategy).
self.addEventListener('fetch', (event) => {
  // We only cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Do not cache Gemini API calls.
  if (event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // If the resource is in the cache, return it.
        if (cachedResponse) {
          return cachedResponse;
        }

        // If it's not in the cache, fetch it from the network.
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response.
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone the response because it's a stream that can only be consumed once.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Cache the newly fetched resource.
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
  );
});
