import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import User from '../User/User.schema';
import Book from '../../entities/Book/Book.schema';
import Message from '../../entities/Message/Message.schema';

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

 export const getConversationByInterlocutorsId = async (req: Request, res: Response) => {
    const messages = await Message
        .find({ $or: [
            { sender: req.user, recipient: req.params.id }, 
            { sender: req.params.id, recipient: req.user }
        ]})
        .populate('recipient', 'name')
        .populate('sender', 'name')
        .sort('-date')
    res.status(OK).json(messages);
 }


