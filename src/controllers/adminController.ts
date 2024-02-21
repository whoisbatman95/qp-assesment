import { Request, Response } from 'express';
import db from '../database';

export const addGroceryItem = async (req: Request, res: Response) => {
    try {
        const { name, price, quantity } = req.body;
      
        // Validate request data
        if (!name || !price || !quantity) {
            return res.status(400).json({ message: 'Please provide name, price, and quantity' });
        }
  
        // Insert the new grocery item into the database
        const result = await new Promise<any>((resolve, reject) => {
            db.run(
                'INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)',
                [name, price, quantity],function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                });
        });
  
        res.status(201).json({ message: 'Grocery item added successfully', data: result });
    } catch (error : any) {
        console.error('Error adding grocery item:', error);
        res.status(500).json({ message: error.message });
    }
};
  

export const viewGroceryItems = async (req: Request, res: Response) => {
    try {
        // Fetch all grocery items from the database
        const result = await new Promise<any>((resolve, reject) => {
            db.all('SELECT * FROM grocery_items',function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
      
        res.status(200).json({ data: result });
    } catch (error : any) {
        console.error('Error fetching grocery items:', error);
        res.status(500).json({ message: error.message });
    }
};
  

export const removeGroceryItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
  
        // Validate request data
        if (!id) {
            return res.status(400).json({ message: 'Please provide the ID of the grocery item to remove' });
        }
  
        // Delete the grocery item from the database
        const result = await new Promise<any>((resolve, reject) => {
            db.run('DELETE FROM grocery_items WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes > 0) {
                        resolve({ message: 'Delete successful' });
                    } else {
                        reject(new Error('No rows were affected by the delete'));
                    }
                }
            });
        });
  
        res.status(200).json({ message: 'Grocery item removed successfully', data: result });
    } catch (error : any) {
        console.error('Error removing grocery item:', error);
        res.status(500).json({ message: error.message });
    }
};
  

export const updateGroceryItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
  
        // Validate request data
        if (!id || (!name && !price && !quantity)) {
            return res.status(400).json({ message: 'Please provide the ID of the grocery item to update and at least one field to update' });
        }
  
        // Update the grocery item in the database
        const result = await await new Promise<any>((resolve, reject) => {
            db.run('UPDATE grocery_items SET name = ?, price = ?, quantity = ? WHERE id = ?',
                [name, price, quantity, id], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes > 0) {
                            resolve({ message: 'Update successful' });
                        } else {
                            reject(new Error('No rows were affected by the update'));
                        }
                    }
                });
        });
  
        res.status(200).json({ message: 'Grocery item updated successfully', data: result });
    } catch (error : any) {
        console.error('Error updating grocery item:', error);
        res.status(500).json({ message: error.message });
    }
};
  

export const manageInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
  
        // Validate request data
        if (!id || !quantity) {
            return res.status(400).json({ message: 'Please provide the ID of the grocery item and the quantity to manage inventory' });
        }
  
        // Update the inventory level of the grocery item in the database
        const result = await await new Promise<any>((resolve, reject) => {
            db.run('UPDATE grocery_items SET quantity = quantity + ? WHERE id = ?',
                [quantity, id], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes > 0) {
                            resolve({ message: 'Update successful' });
                        } else {
                            reject(new Error('No rows were affected by the update'));
                        }
                    }
                });
        });
  
        res.status(200).json({ message: 'Inventory managed successfully', data: result });
    } catch (error : any) {
        console.error('Error managing inventory:', error);
        res.status(500).json({ message: error.message });
    }
};
  
