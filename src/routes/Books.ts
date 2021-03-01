import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { bookModel } frames '../entities/Book/Book.schema.ts'

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/******************************************************************************
 *                      Get All books - "GET /api/books"
 ******************************************************************************/

router.get('', async (req: Request, res: Response) => {
    const books = await bookModel.find()
    return res.status(OK).json({books})
});

/******************************************************************************
 *                       Add One - "POST /api/books"
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
    const book = new bookModel(req.body)
    await book.save()
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/books/:id"
 ******************************************************************************/
/*
router.put('/:id', async (req: IRequest, res: Response) => {
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
 *                    Delete - "DELETE /api/books/:id"
 ******************************************************************************/
/*
router.delete('/:id', async (req: IRequest, res: Response) => {
    const { id } = req.params;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});

*/

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;