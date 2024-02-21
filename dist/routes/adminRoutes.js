"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.post('/add', adminController_1.addGroceryItem);
router.get('/view', adminController_1.viewGroceryItems);
router.delete('/remove/:id', adminController_1.removeGroceryItem);
router.put('/update/:id', adminController_1.updateGroceryItem);
router.patch('/manage/:id', adminController_1.manageInventory);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map