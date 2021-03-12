import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBasketReq from './Basket.validation';
import Basket from './Basket.schema'

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const getBasketById = async (req: Request, res: Response) => {
    try {
        const basket = await Basket
            .findById(req.params.id)
            .populate('createdByUserId', 'name')
            .populate('targetUserID', 'name')
        return res.status(OK).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const addBasket = async (req: Request, res: Response) => {
    const { error } = validateBasketReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
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