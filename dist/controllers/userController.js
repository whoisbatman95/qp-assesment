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
exports.bookItems = exports.viewAvailableItems = void 0;
const database_1 = __importDefault(require("../database"));
const viewAvailableItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield new Promise((resolve, reject) => {
            database_1.default.all('SELECT * FROM grocery_items WHERE quantity > 0', function (err, rows) {
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
        console.error('Error fetching available grocery items:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.viewAvailableItems = viewAvailableItems;
const bookItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemsToBook = req.body.items;
        if (!itemsToBook || !Array.isArray(itemsToBook) || itemsToBook.length === 0) {
            return res.status(400).json({ message: 'Please provide a valid list of items to book' });
        }
        // Check availability and update inventory
        for (const item of itemsToBook) {
            const { id, quantity } = item;
            // Fetch the item from the database
            const existingItem = yield new Promise((resolve, reject) => {
                database_1.default.all('SELECT * FROM grocery_items WHERE id = ?', [id], function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
            if (existingItem.length === 0) {
                return res.status(404).json({ message: `Grocery item with ID ${id} not found` });
            }
            const { name, price, quantity: availableQuantity } = existingItem[0];
            if (availableQuantity < quantity) {
                return res.status(400).json({ message: `Insufficient quantity for item: ${name}` });
            }
            // Update inventory level
            yield new Promise((resolve, reject) => {
                database_1.default.run('UPDATE grocery_items SET quantity = quantity - ? WHERE id = ?', [quantity, id], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (this.changes > 0) {
                            resolve({ message: 'Book items successful' });
                        }
                        else {
                            reject(new Error('Item not found'));
                        }
                    }
                });
            });
        }
        res.status(200).json({ message: 'Items booked successfully' });
    }
    catch (error) {
        console.error('Error booking items:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.bookItems = bookItems;
//# sourceMappingURL=userController.js.map