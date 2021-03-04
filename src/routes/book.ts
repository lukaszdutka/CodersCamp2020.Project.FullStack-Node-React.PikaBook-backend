import { Router } from 'express';
import { addBook, deleteBook, getBookById, getBooks, updateBook } from '@entities/Book/Book.controller';

const router = Router();


router
    .get('', getBooks)
    .get('/:id', getBookById)
    .post('', addBook)
    .put('/:id', updateBook)
    .delete('/:id', deleteBook);


export default router;