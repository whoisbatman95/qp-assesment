"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
// Connect to SQLite database (creates the file if it doesn't exist)
const db = new sqlite3_1.default.Database('grocery.db');
exports.default = db;
//# sourceMappingURL=database.js.map