import { Router } from 'express';
import { addBook, deleteBook, getBookById, getBooks, updateBook } from '@entities/Book/Book.controller';
import { checkTokenAuth } from '../shared/functions';

const router = Router();


router
    .get('', getBooks)
    .get('/:id', getBookById)
    .post('', checkTokenAuth, addBook)
    .put('/:id', updateBook)
    .delete('/:id', deleteBook);


export default router;