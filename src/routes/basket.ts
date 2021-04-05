import { Router } from 'express';
import checkToken from  'express-jwt';
import { getBasketById, addBasket, updateBasketStatus, updateBasketRead } from '../entities/Basket/Basket.controller';

const router = Router();


router
    .get('/:id', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), getBasketById)
    .post('', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), addBasket)
    .put('/status/:id', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), updateBasketStatus)
    .put('/read', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), updateBasketRead)

export default router;