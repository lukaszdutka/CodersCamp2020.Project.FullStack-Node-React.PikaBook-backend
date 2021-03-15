import { Router } from 'express';
import checkToken from  'express-jwt';
import { getLoggedUser, getLoggedUserBooks, getLoggedUserBaskets, getConversationByInterlocutorsId, getAllConversations } from '../entities/Me/Me.controller';

const router = Router();


//get a currently logged user
router.get('', 
getLoggedUser );

//get all books of the currently logged user
router.get('/books', 
getLoggedUserBooks );

//get all books of the currently logged user
router.get('/baskets', 
checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
getLoggedUserBaskets );

//get all conversations of the currently logged user
router.get('/conversations', 
getAllConversations );

//get a conversation with a specific user
router.get('/conversations/:id', 
getConversationByInterlocutorsId );

//get all baskets of currently logged user
router.get('/baskets', getLoggedUserBaskets);


export default router