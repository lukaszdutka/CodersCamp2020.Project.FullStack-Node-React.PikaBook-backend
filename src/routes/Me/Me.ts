import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
//import { paramMissingError, IRequest } from '@shared/constants';
import userModel from '../../entities/User/User.schema';
import checkToken from 'express-jwt';

const router = Router();
const { OK } = StatusCodes;
const User = userModel;


//get a currently logged user
router.get('',
checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}),
 async (req: Request, res: Response) => {
    const user = await User.findById(req.user).select('-password');
    res.status(OK).send(user);
});

export default router