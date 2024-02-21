import express from 'express';
import { 
    addGroceryItem, 
    viewGroceryItems, 
    removeGroceryItem, 
    updateGroceryItem, 
    manageInventory 
} from '../controllers/adminController';

const router = express.Router();

router.post('/add', addGroceryItem);
router.get('/view', viewGroceryItems);
router.delete('/remove/:id', removeGroceryItem);
router.put('/update/:id', updateGroceryItem);
router.patch('/manage/:id', manageInventory);

export default router;
