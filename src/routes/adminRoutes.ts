import express from 'express';
import { 
    addGroceryItem, 
    viewGroceryItems, 
    removeGroceryItem, 
    updateGroceryItem, 
    manageInventory 
} from '../controllers/adminController';
import { verifyHeaders } from '../middlewares/auth';

const router = express.Router();

router.post('/add', verifyHeaders, addGroceryItem);
router.get('/view', verifyHeaders, viewGroceryItems);
router.delete('/remove/:id', verifyHeaders, removeGroceryItem);
router.put('/update/:id', verifyHeaders, updateGroceryItem);
router.patch('/manage/:id', verifyHeaders, manageInventory);

export default router;
