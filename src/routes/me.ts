import { Router } from 'express';
import { getLoggedUser, getLoggedUserBooks, getConversationByInterlocutorsId } from '../entities/Me/Me.controller';

const router = Router();


//get a currently logged user
router.get('', 
getLoggedUser );

//get all books of the currently logged user
router.get('/books', 
getLoggedUserBooks );

//get a conversation with a specific user
router.get('/messages/:id', 
getConversationByInterlocutorsId );

export default router