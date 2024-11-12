import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// Function to add content to the database
export const putDb = async (content) => {
    console.log(content);
    try {
        const db = await openDB('jate', 1);  // Open the 'jate' DB
        const tx = db.transaction('jate', 'readwrite');  // Open a readwrite transaction on 'jate' store
        const store = tx.objectStore('jate');  // Get the object store
        const request = store.add({ content });  // Add content to the store

        // Wait for the transaction to complete
        await tx.done;
        console.log('Content added to the database');
    } catch (error) {
        console.error('Error adding content to the database:', error);
    }
};

// Function to get all content from the database
export const getDb = async () => {
    try {
        const db = await openDB('jate', 1);  // Open the 'jate' DB
        const tx = db.transaction('jate', 'readonly');  // Open a readonly transaction
        const store = tx.objectStore('jate');  // Get the object store
        const request = store.getAll();  // Retrieve all content

        // Wait for the transaction to complete and return the results
        const result = await request;
        console.log('Retrieved content:', result);
        return result;
    } catch (error) {
        console.error('Error retrieving content from the database:', error);
    }
};

initdb();