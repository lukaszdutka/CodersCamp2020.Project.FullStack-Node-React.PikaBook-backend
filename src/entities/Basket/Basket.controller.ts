import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
// import validateBasketReq from './Basket.validation';
import Basket from './Basket.schema'

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const addBasket = async (req: Request, res: Response) => {
    // const { error } = validateBasketReq(req.body);
    // if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    console.log(req.user)
    const basketData = req.body;
    // const ownerData = {ownerId: req.user}
    const basket = new Basket({...basketData})
    try {
        await basket.save()
        return res.status(CREATED).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}