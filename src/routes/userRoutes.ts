import express from 'express';
import { viewAvailableItems, bookItems } from '../controllers/userController';

const router = express.Router();

router.get('/view', viewAvailableItems);
router.post('/book', bookItems);

export default router;
