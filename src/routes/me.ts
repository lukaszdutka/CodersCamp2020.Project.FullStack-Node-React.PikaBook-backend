import { Router } from 'express';
import { getLoggedUser, getLoggedUserBooks, getLoggedUserBaskets } from '../entities/Me/Me.controller';
import checkToken from  'express-jwt';

const router = Router();


//get a currently logged user
router.get('', 
checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
getLoggedUser );

//get all books of the currently logged user
router.get('/books', 
checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
getLoggedUserBooks );

//get all books of the currently logged user
router.get('/baskets', 
checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
getLoggedUserBaskets );

export default router