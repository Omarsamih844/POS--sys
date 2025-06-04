const CACHE_NAME = 'apixel-caisse-v4';
const STATIC_ASSETS = [
  '/',
  '/index.php',
  '/build/assets/app-B8KyDlOS.css',
  '/build/assets/app-BIsBCWnn.js',
  '/favicon.ico',
  '/offline.html',
  '/pos-offline.html',
  '/reset-sw.js',
  '/manifest.json',
  '/images/logo-apixel.png',
  '/images/categ_images/pasta.png',
  '/images/categ_images/boisson_image.png',
  '/images/categ_images/cake.png',
  '/images/categ_images/salad.png',
  '/images/categ_images/seafood.png'
];

// Special routes that should be cached during installation
const CACHED_ROUTES = [
  '/',
  '/pos',
  '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('Opened cache');
        
        // First cache the static assets
        await Promise.allSettled(
          STATIC_ASSETS.map(url => 
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
                console.warn(`Failed to cache: ${url} - ${response.status}`);
                return Promise.resolve(); // Continue despite error
              })
              .catch(error => {
                console.warn(`Failed to fetch: ${url} - ${error.message}`);
                return Promise.resolve(); // Continue despite error
              })
          )
        );
        
        // Then cache the important routes
        await Promise.allSettled(
          CACHED_ROUTES.map(url => 
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
                console.warn(`Failed to cache route: ${url} - ${response.status}`);
                return Promise.resolve();
              })
              .catch(error => {
                console.warn(`Failed to fetch route: ${url} - ${error.message}`);
                return Promise.resolve();
              })
          )
        );
        
        // Also cache a copy of the home page as a fallback for the POS route
        try {
          const homeResponse = await fetch('/');
          if (homeResponse.ok) {
            await cache.put('/pos-fallback', homeResponse);
            console.log('Cached home page as POS fallback');
          }
        } catch (error) {
          console.warn('Failed to cache POS fallback:', error);
        }
      })
  );
  
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim clients to ensure the service worker takes control immediately
  event.waitUntil(self.clients.claim());
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const url = new URL(event.request.url);
  const pathname = url.pathname;

  // Special handling for POS route
  if (pathname === '/pos' || pathname.startsWith('/pos/')) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .catch(async () => {
              // Try these fallbacks in order:
              // 1. Cached POS route
              const cachedPos = await caches.match('/pos');
              if (cachedPos) return cachedPos;
              
              // 2. Cached POS-specific offline page
              const posOffline = await caches.match('/pos-offline.html');
              if (posOffline) return posOffline;
              
              // 3. Cached POS fallback (copy of home page)
              const cachedFallback = await caches.match('/pos-fallback');
              if (cachedFallback) return cachedFallback;
              
              // 4. Cached home page
              const cachedHome = await caches.match('/');
              if (cachedHome) return cachedHome;
              
              // 5. Offline page as last resort
              return caches.match('/offline.html');
            });
        })
        .catch(error => {
          console.error('Error in POS route handling:', error);
          return caches.match('/pos-offline.html') || caches.match('/offline.html');
        })
    );
    return;
  }

  // Handle API requests differently
  if (pathname.startsWith('/api/')) {
    // For API requests, try network first, then fall back to cached response
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache a copy of the response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cached response, return offline JSON for API requests
              return new Response(
                JSON.stringify({
                  error: 'offline',
                  message: 'You are currently offline. Please check your connection.'
                }),
                {
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
        })
    );
    return;
  }

  // For HTML pages, try cache first, then network, then offline page
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then(response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // If both cache and network fail, show offline page
              return caches.match('/offline.html');
            });
        })
        .catch(error => {
          console.error('Error in HTML handling:', error);
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // For other assets, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // For failed asset loads, try the offline page as a last resort
            if (event.request.url.includes('.js') || event.request.url.includes('.css')) {
              return new Response('/* Offline fallback */', {
                headers: { 'Content-Type': event.request.url.includes('.js') ? 'application/javascript' : 'text/css' }
              });
            }
            return new Response('Offline resource unavailable');
          });
      })
      .catch(error => {
        console.error('Error in asset handling:', error);
        return new Response('Error handling request');
      })
  );
});

// Handle background sync for pending offline orders
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pending-orders') {
    event.waitUntil(syncPendingOrders());
  }
});

// Function to sync pending orders when back online
async function syncPendingOrders() {
  try {
    // Get pending orders from IndexedDB
    const pendingOrders = await getPendingOrdersFromDB();
    
    // Send each pending order to the server
    const syncPromises = pendingOrders.map(async (order) => {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });

        if (response.ok) {
          // If successfully synced, remove from pending
          await removePendingOrderFromDB(order.id);
          return { success: true, order };
        }
        return { success: false, order };
      } catch (error) {
        console.error('Error syncing order:', error);
        return { success: false, order, error };
      }
    });

    return Promise.all(syncPromises);
  } catch (error) {
    console.error('Error in syncPendingOrders:', error);
    return Promise.reject(error);
  }
}

// These functions would interact with IndexedDB
// They are stubs that would need to be implemented
function getPendingOrdersFromDB() {
  // This would retrieve pending orders from IndexedDB
  return Promise.resolve([]);
}

function removePendingOrderFromDB(orderId) {
  // This would remove a synced order from IndexedDB
  return Promise.resolve();
} 