import { Router } from 'express';
import { getLoggedUser, getLoggedUserBooks, getConversationByInterlocutorsId, getAllConversations } from '../entities/Me/Me.controller';

const router = Router();


//get a currently logged user
router.get('', 
getLoggedUser );

//get all books of the currently logged user
router.get('/books', 
getLoggedUserBooks );

//get all conversations of the currently logged user
router.get('/conversations', 
getAllConversations );

//get a conversation with a specific user
router.get('/conversations/:id', 
getConversationByInterlocutorsId );


export default router