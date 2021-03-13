import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBookReq from './Book.validation';
import Book from '../../entities/Book/Book.schema'

const { BAD_REQUEST, CREATED, OK } = StatusCodes;


export const getBooks = async (req: Request, res: Response) => {
    const books = await Book
        .find()
        .populate('ownerId', 'name')
    return res.status(OK).json(books);
}


export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book
            .findById(req.params.id)
            .populate('ownerId', 'name')
        return res.status(OK).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const addBook = async (req: Request, res: Response) => {
    const { error } = validateBookReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    const bookData = req.body;
    const ownerData = {ownerId: req.user}
    const book = new Book({...bookData, ...ownerData})
    try {
        await book.save()
        return res.status(CREATED).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}

export const updateBook = async (req: Request, res: Response) => {
    const { error } = validateBookReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    try {
        const book = await Book
            .findOneAndUpdate({ _id: req.params.id, ownerId: req.user }, 
                { $set: req.body }, 
                { new: true })
            .populate('ownerId', 'name')
        if (!book) return res.status(BAD_REQUEST).send('There is no book to be updated')
        return res.status(OK).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const deleteBook = async (req: Request, res: Response) => { 
    try {
        const deletedBook = await Book
            .findOneAndRemove({ _id: req.params.id, ownerId: req.user });
        if (!deletedBook) return res.send(BAD_REQUEST).send('There is no book to be updated')
        return res.status(OK).json(deletedBook);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }  
}
