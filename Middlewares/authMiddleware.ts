import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Payload } from '../Models/AuthModel';
 
dotenv.config();
 
export interface ExtendedRequest extends Request {
  info?: Payload;
}
 
export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).json({ message: 'Authorization header missing' });
      }
 
      const token = authHeader.split(' ')[1];
      if (!token) {
        console.log('Token missing');
        return res.status(401).json({ message: 'Token missing' });
      }
 
      const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload;
      console.log('Decoded Data:', decodedData);
      req.info = decodedData;
      next();
    } catch (err) {
        const error = err as Error;
      console.log('Invalid Token:', error.message);
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }
 
export function isAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
}
 
export function isUserOrAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.Sub === req.params.id || req.info?.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
}