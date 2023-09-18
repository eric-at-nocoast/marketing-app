const DB_NAME = 'tryloDatabase';
const DB_VERSION = 2;



export const setupIndexedDB = async () => {
  const response = await fetch('https://eric-at-nocoast.github.io/trylo-json/seed.json');
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  const data = await response.json();
  const objectStores = data.map((item: any) => Object.keys(item)[0]);
    const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);
  
    dbRequest.onupgradeneeded = (event: any) => {
      const db = event.target.result;
  
      // Create object stores
      objectStores.forEach((categoryData: any) => {
        if (!db.objectStoreNames.contains(categoryData)) {
          db.createObjectStore(categoryData, { keyPath: 'id'});
        }
      });
    };
  
    dbRequest.onsuccess = (event: any) => {
      const db = event.target.result;
      // Populate the database after object stores have been created
      data.forEach((item: any) => {
        const storeName = Object.keys(item)[0];
        const storeData = item[storeName];
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        storeData.forEach((storeItem: any) => {
          objectStore.add(storeItem);
        });
     });
    };
  
    dbRequest.onerror = (event) => {
      console.error("Database error: " + event.target);
    };
  };
  