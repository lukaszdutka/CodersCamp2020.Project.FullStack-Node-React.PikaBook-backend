import { Response } from 'supertest';
import { User } from '@entities/User/User.interface';
import { Book } from '@entities/Book/Book.interface';


export interface IResponse extends Response {
    body: {
        users: User[];
        // books: Book[];
        error: string;
    };
}

export interface IReqBody {
    user?: User;
    // book?: Book;
}
