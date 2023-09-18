const GetRandomEntryFromStore = async (storeName: string): Promise<Record<string, any> | null> => {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open('tryloDatabase', 2);
  
      openRequest.onsuccess = (event: Event) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        console.log(store)
        const countRequest = store.count();
        countRequest.onsuccess = () => {
          if (countRequest.result === 0) {
            resolve(null);
            return;
          }
  
          const randomId = Math.floor(Math.random() * countRequest.result);
          const cursorRequest = store.openCursor();
          let counter = 0;
  
          cursorRequest.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (!cursor) return;
  
            if (counter === randomId) {
              resolve(cursor.value);
            } else {
              counter++;
              cursor.continue();
            }
          };
        };
      };
  
      openRequest.onerror = (event: Event) => {
        reject('Error opening database');
      };
    });
  };
  
    export default GetRandomEntryFromStore;  