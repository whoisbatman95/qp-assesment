"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
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
    return new Promise((resolve, reject) => {
        database_1.default.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            else {
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
        return new Promise((resolve, reject) => {
            database_1.default.run(sql, [item.name, item.price, item.quantity], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(`Inserted ${item.name} into grocery_items`);
                    resolve();
                }
            });
        });
    }));
};
// Run the initialization process
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createTable();
        yield insertInitialData();
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
    finally {
        // Close the database connection
        database_1.default.close();
    }
});
initializeDatabase();
//# sourceMappingURL=initDb.js.map