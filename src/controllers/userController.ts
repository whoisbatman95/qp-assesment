import { Request, Response } from 'express';
import db from '../database';

export const viewAvailableItems = async (req: Request, res: Response) => {
    try {
        const result = await new Promise<any>((resolve, reject) => {
            db.all('SELECT * FROM grocery_items WHERE quantity > 0',function(err: any, rows: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.status(200).json({ data: result });
    } catch (error : any) {
        console.error('Error fetching available grocery items:', error);
        res.status(500).json({ message: error.message });
    }
};

export const bookItems = async (req: Request, res: Response) => {
    try {
        const itemsToBook = req.body.items;

        if (!itemsToBook || !Array.isArray(itemsToBook) || itemsToBook.length === 0) {
            return res.status(400).json({ message: 'Please provide a valid list of items to book' });
        }

        // Check availability and update inventory
        for (const item of itemsToBook) {
            const { id, quantity } = item;
                // Fetch the item from the database
                const existingItem = await new Promise<any>((resolve, reject) => {
                    db.all('SELECT * FROM grocery_items WHERE id = ?', [id],function(err: any, rows: any) {
                        if (err) {
                            reject(err);
                        } else {
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
                await new Promise<any>((resolve, reject) => {
                    db.run('UPDATE grocery_items SET quantity = quantity - ? WHERE id = ?', [quantity, id],function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes > 0) {
                            resolve({ message: 'Book items successful' });
                        } else {
                            reject(new Error('Item not found'));
                        }
                    }
                });
            });
        }
        res.status(200).json({ message: 'Items booked successfully' });
    } catch (error : any) {
        console.error('Error booking items:', error);
        res.status(500).json({ message: error.message });
    }
};