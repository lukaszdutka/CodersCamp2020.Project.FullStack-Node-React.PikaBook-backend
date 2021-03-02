import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { paramMissingError, IRequest } from '@shared/constants';

import bookModel from '../../entities/Book/Book.schema';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const Book = bookModel;



/******************************************************************************
 *                      Get All Users - "GET /api/books/all"
 *****************************************************************************/
/*
router.get('/all', async (req: Request, res: Response) => {
    const books = await Book.find();
    return res.status(OK).json({books});
});
*/


/******************************************************************************
 *                       Add One - "POST /api/books/add"
 ******************************************************************************/
/*
router.post('/add', async (req: IRequest, res: Response) => {
    // const { user } = req.body;
    // if (!user) {
    //     return res.status(BAD_REQUEST).json({
    //         error: paramMissingError,
    //     });
    // }
    // await userDao.add(user);
    // return res.status(CREATED).end();
    

    const bookData = req.body;
    const createdBook = new Book(bookData);
    createdBook.save()
      .then((savedBook) => {
        res.send(savedBook);
      });
});
*/
/******************************************************************************
 *                       Update - "PUT /api/books/update"
 ******************************************************************************/
/*
router.put('/update', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});


*/
/******************************************************************************
 *                    Delete - "DELETE /api/books/delete/:id"
 ******************************************************************************/
/*
router.delete('/delete/:id', async (req: IRequest, res: Response) => {
    const { id } = req.params;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});

*/

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
