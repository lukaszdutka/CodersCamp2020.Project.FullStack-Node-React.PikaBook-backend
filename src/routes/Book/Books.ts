import { Book } from '@entities/Book/Book.interface';
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import bookModel from '../../entities/Book/Book.schema'

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/******************************************************************************
 *                      Get All books - "GET /api/books"
 ******************************************************************************/

router.get('', async (req: Request, res: Response) => {
    const books = await bookModel.find({})
    return res.status(OK).json({books})
});

/******************************************************************************
 *                      Get All books - "GET /api/books"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const book = await bookModel.find({_id: req.params.id})
    return res.status(OK).json({book})
});

/******************************************************************************
 *                       Add One - "POST /api/books"
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
    const book = new bookModel(req.body)
    try {
        await book.save()
        return res.status(CREATED).send(book);
    } catch(error) {
        return res.status(BAD_REQUEST).send(error._message);
    }   
});


/******************************************************************************
 *                       Update - "PUT /api/books/:id"
 ******************************************************************************/

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const book = await bookModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        return res.status(OK).send('Book updated').end()
    } catch(error) {
        return res.status(BAD_REQUEST).send(error.message);
        
    }
});


/******************************************************************************
 *                    Delete - "DELETE /api/books/:id"
 ******************************************************************************/

router.delete('/:id', async (req: Request, res: Response) => {
    await bookModel.findByIdAndRemove(req.params.id)
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;