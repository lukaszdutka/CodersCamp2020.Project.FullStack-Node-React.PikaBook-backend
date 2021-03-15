import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBasketReq from './Basket.validation';
import Basket from './Basket.schema';
import User from "../User/User.schema"

const { BAD_REQUEST, FORBIDDEN, CREATED, OK } = StatusCodes;

export const getBasketById = async (req: Request, res: Response) => {
    const user = await User.findById(req.user);
    try {
        const basket = await Basket
            .findById(req.params.id)
            .populate('createdByUserId', 'name')
            .populate('targetUserID', 'name')
            .populate('booksOffered', 'name')
            .populate('booksRequested', 'name')
        if (!basket?.createdByUserId?.equals(user?._id) && !basket?.targetUserID.equals(user?._id)) {
            return res.status(FORBIDDEN).send("Basket does not belong to the user")}   
        return res.status(OK).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const addBasket = async (req: Request, res: Response) => {
    const { error } = validateBasketReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    
    const user = await User.findById(req.user)
    if (user?._id == req.body.targetUserID) return res.status(BAD_REQUEST).send('targetUserID should be different that createdByUserId')
    
    const basketData = req.body;
    const createdByUserId = {createdByUserId: req.user}
    const basket = new Basket({...basketData, ...createdByUserId})
    try {
        await basket.save()
        return res.status(CREATED).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}