import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBookReq from './Book.validation';
import Book from '../../entities/Book/Book.schema';
import User from '../../entities/User/User.schema';
import { NOTFOUND } from 'node:dns';

const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;


export const getBooks = async (req: Request, res: Response) => {
    const reqLocation = req.query.location as string || ""
    const reqName = req.query.name as string || ""
    const reqAuthor = req.query.author as string || ""
    const reqYear = req.query.year as string || ""
    const reqGenres = req.query.genres as string || ""
    let reqGenresList: string[] = []

    if (reqGenres) {
        reqGenresList = reqGenres.split(",");
    }

    let userIds = []
    if (reqLocation) {
        const users = await User.find({ location: new RegExp(reqLocation, "i")}, '_id');
        userIds = users.map((val) => val._id.toString());
    }
    interface QueryObject {
        name: RegExp,
        ownerId: any,
        author: RegExp,
        year: number,
        genres: any,
    }
    
    let queryObject: QueryObject = {
            ownerId: { $in: userIds },
            name: new RegExp(reqName, "i"),
            author: new RegExp(reqAuthor, "i"),
            year: reqYear as unknown as number,
            genres: { $in: reqGenresList },
    };

    // remove unnecessary fileds from query
    if (!reqName) delete queryObject["name" as keyof QueryObject]
    if (!reqAuthor) delete queryObject["author" as keyof QueryObject]
    if (!reqLocation) delete queryObject["ownerId" as keyof QueryObject]
    if (!reqYear) delete queryObject["year" as keyof QueryObject]
    if (!reqGenres) delete queryObject["genres" as keyof QueryObject]

    const books = await Book.find(queryObject).populate('ownerId', ['location', 'name'])

    return res.status(OK).json(books)
}


export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book
            .findById(req.params.id)
            .populate('ownerId', ['location', 'name']);
        if (!book) return res.status(NOT_FOUND).send('Book not found');
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
        if (!book) return res.status(NOT_FOUND).send('There is no book to be updated')
        return res.status(OK).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const deleteBook = async (req: Request, res: Response) => { 
    try {
        const deletedBook = await Book
            .findOneAndRemove({ _id: req.params.id, ownerId: req.user });
        if (!deletedBook) return res.status(NOT_FOUND).send('There is no book to be deleted')
        return res.status(OK).json(deletedBook);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }  
}
