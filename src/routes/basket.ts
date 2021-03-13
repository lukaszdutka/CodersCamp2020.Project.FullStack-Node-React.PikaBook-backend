import { Router } from 'express';
import checkToken from  'express-jwt';
import { updateBasket } from '@entities/Basket/Basket.controller';

const router = Router();


router
    // .get('', getBaskets)
    // .get('/:id', getBasketById)
    // .post('', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), addBasket)
    .patch('/:id', updateBasket)
    // .delete('/:id', deleteBasket)


export default router;