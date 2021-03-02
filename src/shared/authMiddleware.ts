import { NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

const { UNAUTHORIZED, BAD_REQUEST } = StatusCodes;

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(UNAUTHORIZED).send('Access denied. No token provided');
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`); 
        req.user = decoded;
        next()   
    } 
    catch (ex) {
        res.send(BAD_REQUEST).send('Invalid token');
    }
}

export default auth