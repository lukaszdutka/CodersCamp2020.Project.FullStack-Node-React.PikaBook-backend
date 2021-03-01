import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { paramMissingError, IRequest } from '@shared/constants';

import userModel from '../../entities/User/User.schema';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const User = userModel;



/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/
/*
router.get('/all', async (req: Request, res: Response) => {
    const users = await User.find();
    return res.status(OK).json({users});
});
*/


/******************************************************************************
 *                       Add One - "POST /api/users/add"
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
    

    const userData = req.body;
    const createdUser = new User(userData);
    createdUser.save()
      .then((savedUser) => {
        res.send(savedUser);
      });
});
*/
/******************************************************************************
 *                       Update - "PUT /api/users/update"
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
 *                    Delete - "DELETE /api/users/delete/:id"
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
