import { Request, Response, NextFunction } from 'express';

export const verifyHeaders = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization === '1234567890987654321') {
        next();
    } else {
        return res.status(401).json({ message: 'Access Denied' });
    }
};