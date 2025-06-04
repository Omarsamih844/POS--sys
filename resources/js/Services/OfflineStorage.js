/**
 * Offline Storage Service using IndexedDB
 * Handles storing and retrieving data for offline use
 */

const DB_NAME = 'apixel-caisse-db';
const DB_VERSION = 1;

// Database stores
const STORES = {
  ORDERS: 'orders',
  TABLES: 'tables',
  MENU: 'menu',
  PENDING_SYNC: 'pendingSync'
};

// Initialize the database
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(STORES.ORDERS)) {
        db.createObjectStore(STORES.ORDERS, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(STORES.TABLES)) {
        db.createObjectStore(STORES.TABLES, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(STORES.MENU)) {
        db.createObjectStore(STORES.MENU, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(STORES.PENDING_SYNC)) {
        const pendingSyncStore = db.createObjectStore(STORES.PENDING_SYNC, { keyPath: 'id' });
        pendingSyncStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// Get all items from a store
const getAll = async (storeName) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error(`Error getting all from ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error in getAll(${storeName}):`, error);
    return [];
  }
};

// Get a single item by ID
const getById = async (storeName, id) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error(`Error getting item from ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error in getById(${storeName}, ${id}):`, error);
    return null;
  }
};

// Save an item
const save = async (storeName, item) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error(`Error saving to ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error in save(${storeName}):`, error);
    throw error;
  }
};

// Delete an item
const remove = async (storeName, id) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error(`Error deleting from ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error in remove(${storeName}, ${id}):`, error);
    throw error;
  }
};

// Clear all items from a store
const clear = async (storeName) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error(`Error clearing ${storeName}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error in clear(${storeName}):`, error);
    throw error;
  }
};

// Add an order to pending sync
const addToPendingSync = async (order) => {
  try {
    // Add timestamp for sorting
    const syncItem = {
      ...order,
      timestamp: new Date().getTime(),
      syncType: 'order'
    };
    
    return await save(STORES.PENDING_SYNC, syncItem);
  } catch (error) {
    console.error('Error adding to pending sync:', error);
    throw error;
  }
};

// Add a table update to pending sync
const addTableToPendingSync = async (table) => {
  try {
    // Add timestamp for sorting
    const syncItem = {
      ...table,
      timestamp: new Date().getTime(),
      syncType: 'table'
    };
    
    return await save(STORES.PENDING_SYNC, syncItem);
  } catch (error) {
    console.error('Error adding table to pending sync:', error);
    throw error;
  }
};

// Get all pending sync items
const getPendingSyncItems = async () => {
  return await getAll(STORES.PENDING_SYNC);
};

// Remove item from pending sync
const removeFromPendingSync = async (id) => {
  return await remove(STORES.PENDING_SYNC, id);
};

// Save current menu data
const saveMenuData = async (menuData) => {
  try {
    // Save each category with its products
    for (const category of menuData) {
      await save(STORES.MENU, category);
    }
    return true;
  } catch (error) {
    console.error('Error saving menu data:', error);
    return false;
  }
};

// Get menu data
const getMenuData = async () => {
  return await getAll(STORES.MENU);
};

// Save table status
const saveTableStatus = async (tables) => {
  try {
    // Clear existing tables first
    await clear(STORES.TABLES);
    
    // Save each table
    for (const table of tables) {
      await save(STORES.TABLES, table);
    }
    return true;
  } catch (error) {
    console.error('Error saving table status:', error);
    return false;
  }
};

// Get table status
const getTableStatus = async () => {
  return await getAll(STORES.TABLES);
};

// Save orders
const saveOrders = async (orders) => {
  try {
    for (const order of orders) {
      await save(STORES.ORDERS, order);
    }
    return true;
  } catch (error) {
    console.error('Error saving orders:', error);
    return false;
  }
};

// Get all orders
const getOrders = async () => {
  return await getAll(STORES.ORDERS);
};

// Register for background sync
const registerSync = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-pending-orders');
      return true;
    } catch (error) {
      console.error('Error registering sync:', error);
      return false;
    }
  }
  return false;
};

// Fetch initial data from server and store locally
const fetchAndStoreInitialData = async () => {
  try {
    const response = await fetch('/api/sync/initial-data');
    
    if (response.status === 404) {
      console.warn('Initial data endpoint not found, using fallback data');
      // Create some fallback data for offline use
      const fallbackData = {
        success: true,
        data: {
          categories: [
            {
              id: 1,
              name: 'Fallback Category',
              products: [
                {
                  id: 1,
                  name: 'Offline Product',
                  description: 'This is a fallback product for offline mode',
                  price: 10.0,
                  image: '/images/logo-apixel.png'
                }
              ]
            }
          ],
          tables: [
            {
              id: 1,
              name: 'Table 1',
              capacity: 4,
              status: 'available'
            }
          ],
          orders: []
        }
      };
      
      // Store fallback categories/menu
      if (fallbackData.data.categories) {
        const menuData = fallbackData.data.categories.map(category => ({
          id: category.id,
          name: category.name,
          products: category.products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image
          }))
        }));
        
        await saveMenuData(menuData);
      }
      
      // Store fallback tables
      if (fallbackData.data.tables) {
        await saveTableStatus(fallbackData.data.tables);
      }
      
      return true;
    }
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch initial data');
    }
    
    // Store categories/menu
    if (data.data.categories) {
      const menuData = data.data.categories.map(category => ({
        id: category.id,
        name: category.name,
        products: category.products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image
        }))
      }));
      
      await saveMenuData(menuData);
    }
    
    // Store tables
    if (data.data.tables) {
      await saveTableStatus(data.data.tables);
    }
    
    // Store orders
    if (data.data.orders) {
      await saveOrders(data.data.orders);
    }
    
    return true;
  } catch (error) {
    console.error('Error fetching and storing initial data:', error);
    
    // Create fallback data even on error
    try {
      console.warn('Using fallback data due to error');
      // Create some fallback data for offline use
      const fallbackData = {
        categories: [
          {
            id: 1,
            name: 'Error Fallback',
            products: [
              {
                id: 1,
                name: 'Emergency Product',
                description: 'This product appears when there was an error loading data',
                price: 10.0,
                image: '/images/logo-apixel.png'
              }
            ]
          }
        ],
        tables: [
          {
            id: 1,
            name: 'Emergency Table',
            capacity: 4,
            status: 'available'
          }
        ]
      };
      
      await saveMenuData(fallbackData.categories);
      await saveTableStatus(fallbackData.tables);
      
      return true;
    } catch (fallbackError) {
      console.error('Error creating fallback data:', fallbackError);
      return false;
    }
  }
};

// Sync pending orders with server
const syncPendingOrders = async () => {
  try {
    // Get pending order items
    const pendingItems = await getPendingSyncItems();
    const orderItems = pendingItems.filter(item => item.syncType === 'order');
    
    if (orderItems.length === 0) {
      return { success: true, message: 'No pending orders to sync' };
    }
    
    // Send orders to server
    const response = await fetch('/api/sync/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItems),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to sync orders');
    }
    
    // Remove synced items from pending
    for (const item of orderItems) {
      await removeFromPendingSync(item.id);
    }
    
    return { 
      success: true, 
      message: `Successfully synced ${orderItems.length} orders`,
      results: data.results
    };
  } catch (error) {
    console.error('Error syncing pending orders:', error);
    return { 
      success: false, 
      message: `Error syncing orders: ${error.message}`
    };
  }
};

// Sync pending table updates with server
const syncPendingTables = async () => {
  try {
    // Get pending table items
    const pendingItems = await getPendingSyncItems();
    const tableItems = pendingItems.filter(item => item.syncType === 'table');
    
    if (tableItems.length === 0) {
      return { success: true, message: 'No pending tables to sync' };
    }
    
    // Send tables to server
    const response = await fetch('/api/sync/tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableItems),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to sync tables');
    }
    
    // Remove synced items from pending
    for (const item of tableItems) {
      await removeFromPendingSync(item.id);
    }
    
    return { 
      success: true, 
      message: `Successfully synced ${tableItems.length} tables`,
      results: data.results
    };
  } catch (error) {
    console.error('Error syncing pending tables:', error);
    return { 
      success: false, 
      message: `Error syncing tables: ${error.message}`
    };
  }
};

// Sync all pending changes with server
const syncAll = async () => {
  const orderResult = await syncPendingOrders();
  const tableResult = await syncPendingTables();
  
  return {
    orders: orderResult,
    tables: tableResult,
    success: orderResult.success && tableResult.success
  };
};

export default {
  initDB,
  getAll,
  getById,
  save,
  remove,
  clear,
  addToPendingSync,
  addTableToPendingSync,
  getPendingSyncItems,
  removeFromPendingSync,
  saveMenuData,
  getMenuData,
  saveTableStatus,
  getTableStatus,
  saveOrders,
  getOrders,
  registerSync,
  fetchAndStoreInitialData,
  syncPendingOrders,
  syncPendingTables,
  syncAll,
  STORES
}; 