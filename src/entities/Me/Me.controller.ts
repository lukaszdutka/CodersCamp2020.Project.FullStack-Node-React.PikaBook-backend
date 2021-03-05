import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import User from '../User/User.schema';
import Book from '../../entities/Book/Book.schema';

const { BAD_REQUEST, OK } = StatusCodes;

export const getLoggedUser = async (req: Request, res: Response) => {
    const user = await User
        .findById(req.user)
        .select('-password')
        .populate('ownerId', 'name')
    res.status(OK).json(user);
 }

 export const getLoggedUserBooks = async (req: Request, res: Response) => {
    const books = await Book
        .find({ownerId: req.user})
    res.status(OK).json(books);
 }

