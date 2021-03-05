import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import Book from '../../entities/Book/Book.schema'

const { BAD_REQUEST, CREATED, OK } = StatusCodes;


export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.find({})
    return res.status(OK).json({ books })
}


export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.find({ _id: req.params.id })
        return res.status(OK).json({ book })
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }

}


export const addBook = async (req: Request, res: Response) => {
    const book = new Book(req.body)
    try {
        await book.save()
        return res.status(CREATED).send(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}


export const updateBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        return res.status(OK).send('Book updated').end()
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}


export const deleteBook = async (req: Request, res: Response) => {
    try {
        await Book.findByIdAndRemove(req.params.id)
        return res.status(OK).end();
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}
