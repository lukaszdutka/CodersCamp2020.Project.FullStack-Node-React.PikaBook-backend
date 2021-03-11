import { Router } from 'express';
// import checkToken from  'express-jwt';
import { addBasket } from '@entities/Basket/Basket.controller';

const router = Router();


router
    // .get('', getBaskets)
    // .get('/:id', getBasketById)
    .post('', addBasket)
    // .put('/:id', updateBasket)
    // .delete('/:id', deleteBasket)


export default router;