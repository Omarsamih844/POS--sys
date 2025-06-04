// Helper script to reset service worker and clear caches
// Can be run from browser console: resetServiceWorker()

async function resetServiceWorker() {
  console.log('Starting service worker reset...');
  
  // Unregister service worker
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service worker unregistered');
      }
    } catch (error) {
      console.error('Error unregistering service worker:', error);
    }
  }
  
  // Clear caches
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  }
  
  console.log('Service worker reset complete. Please reload the page.');
  return true;
}

// Make available globally
window.resetServiceWorker = resetServiceWorker;

// Auto-execute if loaded directly
if (document.currentScript && !document.currentScript.async) {
  console.log('Auto-executing service worker reset...');
  resetServiceWorker().then(() => {
    console.log('Auto-reload in 2 seconds...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  });
} 