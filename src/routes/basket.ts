import { Router } from 'express';
import checkToken from  'express-jwt';
import { getBasketById, addBasket } from '../entities/Basket/Basket.controller';

const router = Router();


router
    .get('/:id', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), getBasketById)
    .post('', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), addBasket)

export default router;