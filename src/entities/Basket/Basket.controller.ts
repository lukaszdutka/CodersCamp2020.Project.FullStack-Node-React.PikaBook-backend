import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
// import validateBasketReq from './Basket.validation';
import Basket from './Basket.schema';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const updateBasket = async (req: Request, res: Response) => {
    
    const basketStatus = req.body;
    try {
        const basket = await Basket
        .findOneAndUpdate(
        { _id: req.params.id }, 
        { $set: basketStatus }, 
        { new: true })
        .populate('createdByUserId', 'name')
        .populate('targetUserID', 'name')
        
        if (!basket) {
            return res.send(BAD_REQUEST).send('There is no basket to be updated')
        }
        return res.status(OK).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}