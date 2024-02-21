import db from '../database';

// Creating the grocery_items table if it doesn't exist
const createTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS grocery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    )
  `;
  
    return new Promise<void>((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Table "grocery_items" created successfully');
                resolve();
            }
        });
    });
};

// Inserting initial data into the grocery_items table
const insertInitialData = () => {
    const data = [
        { name: 'Apples', price: 2.99, quantity: 100 },
        { name: 'Bananas', price: 1.99, quantity: 150 },
        { name: 'Oranges', price: 3.49, quantity: 120 }
    ];

    const sql = 'INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)';
  
    return Promise.all(data.map(item => {
        return new Promise<void>((resolve, reject) => {
            db.run(sql, [item.name, item.price, item.quantity], (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Inserted ${item.name} into grocery_items`);
                    resolve();
                }
            });
        });
    }));
};

// Run the initialization process
const initializeDatabase = async () => {
    try {
        await createTable();
        await insertInitialData();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
    // Close the database connection
        db.close();
    }
};

initializeDatabase();
