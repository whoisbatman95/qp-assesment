import sqlite3 from 'sqlite3';

// Connect to SQLite database (creates the file if it doesn't exist)
const db = new sqlite3.Database('grocery.db');

export default db;
