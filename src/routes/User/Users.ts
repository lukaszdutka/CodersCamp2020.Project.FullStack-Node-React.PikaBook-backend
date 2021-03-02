import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
//import { paramMissingError, IRequest } from '@shared/constants';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import userModel from '../../entities/User/User.schema';
import validateUser from '../../entities/User/User.validation';
import jwt from 'jsonwebtoken';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const User = userModel;

//get all users
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req: Request, res: Response) => {
    const users = await User.find();
    return res.status(OK).send(users);
});

// create a new user
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(BAD_REQUEST).send("Email already registered");
    user = await User.findOne({name: req.body.name});
    if (user) return res.status(BAD_REQUEST).send("Name already registered");
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: password,
        location: req.body.location
    });
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, `${process.env.JWT_PRIVATE_KEY}`);
    return res.status(CREATED).header('x-auth-token', token).send(_.pick(newUser, ['name', 'email', 'location']));
});

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
