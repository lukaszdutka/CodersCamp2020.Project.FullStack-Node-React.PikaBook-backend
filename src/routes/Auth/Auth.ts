import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
//import { paramMissingError, IRequest } from '@shared/constants';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../entities/User/User.schema';
import validateAuthReq from '../../entities/Auth/Auth.validation';

const router = Router();
const { BAD_REQUEST, OK } = StatusCodes;
const User = userModel;

// authenticate users
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req: Request, res: Response) => {
    const { error } = validateAuthReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(BAD_REQUEST).send("Invalid email or password");
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(BAD_REQUEST).send('Invalid email or password');
    const token = jwt.sign({_id: user._id}, `${process.env.JWT_PRIVATE_KEY}`);
    return res.status(OK).send(token);
});

export default router;