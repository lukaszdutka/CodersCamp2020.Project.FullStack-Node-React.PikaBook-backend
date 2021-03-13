import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import Basket from './Basket.schema';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const updateBasket = async (req: Request, res: Response) => {
    
    const basketStatus = req.body;
    if( !basketStatus.status ) {
        return res.status(BAD_REQUEST).send('Wrong data to update!');
    }

    try {
        const basket = await Basket
        .findOneAndUpdate(
        { _id: req.params.id }, 
        { $set: { status: basketStatus.status } }, 
        { new: true })
        .populate('createdByUserId', 'name')
        .populate('targetUserID', 'name')
        
        if (!basket) {
            return res.status(BAD_REQUEST).send('There is no basket to be updated')
        }
        return res.status(OK).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}