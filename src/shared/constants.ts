import { Request } from 'express';
import { IUser } from '@entities/User/User';
import { IBook } from '@entities/Book/Book';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        user: IUser;
        book: IBook;
    }
} 
