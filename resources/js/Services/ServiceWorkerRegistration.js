/**
 * Service Worker Registration
 */

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // First, try to clear any existing caches
      await clearCaches();
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      // Handle updates
      if (registration.installing) {
        console.log('Service Worker installing');
      } else if (registration.waiting) {
        console.log('Service Worker installed and waiting');
      } else if (registration.active) {
        console.log('Service Worker active');
      }

      // Handle updates to the service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker available, refresh to update');
          }
        });
      });

      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Clear all caches
export const clearCaches = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
      return true;
    } catch (error) {
      console.error('Error clearing caches:', error);
      return false;
    }
  }
  return false;
};

export const checkServiceWorkerStatus = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      return {
        registered: !!registration,
        controller: !!navigator.serviceWorker.controller,
        waiting: registration?.waiting ? true : false
      };
    } catch (error) {
      console.error('Error checking Service Worker status:', error);
      return { registered: false, controller: false, waiting: false };
    }
  }
  return { registered: false, controller: false, waiting: false };
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const result = await registration.unregister();
        // Also clear caches
        await clearCaches();
        return result;
      }
      return false;
    } catch (error) {
      console.error('Error unregistering Service Worker:', error);
      return false;
    }
  }
  return false;
};

// Force update of the service worker
export const updateServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating Service Worker:', error);
      return false;
    }
  }
  return false;
};

// Reset everything - unregister, clear cache and re-register
export const resetServiceWorker = async () => {
  try {
    await unregisterServiceWorker();
    await clearCaches();
    return await registerServiceWorker();
  } catch (error) {
    console.error('Error resetting service worker:', error);
    return null;
  }
};

export default {
  registerServiceWorker,
  checkServiceWorkerStatus,
  unregisterServiceWorker,
  updateServiceWorker,
  clearCaches,
  resetServiceWorker
}; 