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
exports.manageInventory = exports.updateGroceryItem = exports.removeGroceryItem = exports.viewGroceryItems = exports.addGroceryItem = void 0;
const database_1 = __importDefault(require("../database"));
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, quantity } = req.body;
        // Validate request data
        if (!name || !price || !quantity) {
            return res.status(400).json({ message: 'Please provide name, price, and quantity' });
        }
        // Insert the new grocery item into the database
        const result = yield new Promise((resolve, reject) => {
            database_1.default.run('INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ id: this.lastID });
                }
            });
        });
        res.status(201).json({ message: 'Grocery item added successfully', data: result });
    }
    catch (error) {
        console.error('Error adding grocery item:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.addGroceryItem = addGroceryItem;
const viewGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all grocery items from the database
        const result = yield new Promise((resolve, reject) => {
            database_1.default.all('SELECT * FROM grocery_items', function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
        res.status(200).json({ data: result });
    }
    catch (error) {
        console.error('Error fetching grocery items:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.viewGroceryItems = viewGroceryItems;
const removeGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate request data
        if (!id) {
            return res.status(400).json({ message: 'Please provide the ID of the grocery item to remove' });
        }
        // Delete the grocery item from the database
        const result = yield new Promise((resolve, reject) => {
            database_1.default.run('DELETE FROM grocery_items WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.changes > 0) {
                        resolve({ message: 'Delete successful' });
                    }
                    else {
                        reject(new Error('No rows were affected by the delete'));
                    }
                }
            });
        });
        res.status(200).json({ message: 'Grocery item removed successfully', data: result });
    }
    catch (error) {
        console.error('Error removing grocery item:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.removeGroceryItem = removeGroceryItem;
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        // Validate request data
        if (!id || (!name && !price && !quantity)) {
            return res.status(400).json({ message: 'Please provide the ID of the grocery item to update and at least one field to update' });
        }
        // Update the grocery item in the database
        const result = yield yield new Promise((resolve, reject) => {
            database_1.default.run('UPDATE grocery_items SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.changes > 0) {
                        resolve({ message: 'Update successful' });
                    }
                    else {
                        reject(new Error('No rows were affected by the update'));
                    }
                }
            });
        });
        res.status(200).json({ message: 'Grocery item updated successfully', data: result });
    }
    catch (error) {
        console.error('Error updating grocery item:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateGroceryItem = updateGroceryItem;
const manageInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        // Validate request data
        if (!id || !quantity) {
            return res.status(400).json({ message: 'Please provide the ID of the grocery item and the quantity to manage inventory' });
        }
        // Update the inventory level of the grocery item in the database
        const result = yield yield new Promise((resolve, reject) => {
            database_1.default.run('UPDATE grocery_items SET quantity = quantity + ? WHERE id = ?', [quantity, id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.changes > 0) {
                        resolve({ message: 'Update successful' });
                    }
                    else {
                        reject(new Error('No rows were affected by the update'));
                    }
                }
            });
        });
        res.status(200).json({ message: 'Inventory managed successfully', data: result });
    }
    catch (error) {
        console.error('Error managing inventory:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.manageInventory = manageInventory;
//# sourceMappingURL=adminController.js.map