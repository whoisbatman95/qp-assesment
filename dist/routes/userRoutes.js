"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/view', userController_1.viewAvailableItems);
router.post('/book', userController_1.bookItems);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map