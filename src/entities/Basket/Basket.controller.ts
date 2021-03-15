import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import Basket from './Basket.schema';
import User from '../User/User.schema';

const { BAD_REQUEST, CREATED, OK, NOT_FOUND, FORBIDDEN } = StatusCodes;

export const updateBasket = async (req: Request, res: Response) => {
    
    const user = await User.findById(req.user);
    if (!user)
    return res.status(BAD_REQUEST).send("The user is not logged in");

    if( !req.body.status ) {
        return res.status(BAD_REQUEST).send('Wrong data to update');
    }

    try {
        const basket = await Basket
        .findById( { _id: req.params.id })
        .populate('createdByUserId', 'name')
        .populate('targetUserID', 'name')
        
        if (!basket) {
            return res.status(NOT_FOUND).send('There is no basket to be updated')
        }

        if( basket.createdByUserId ) {
            if (!basket.createdByUserId.equals(user._id) && !basket.targetUserID.equals(user._id)) {
                return res.status(FORBIDDEN).send("Basket does not belong to the user");
            }
        } 

        if (basket.status === req.body.status) {
            return res.status(OK).send('Basket status did not change (new status is same as current status)');
        }

        await Basket.updateOne( { _id: req.params.id }, { status: req.body.status });
        return res.status(OK).send("Basket status updated");
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}