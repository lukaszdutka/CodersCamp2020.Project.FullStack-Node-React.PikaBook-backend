import UserRouter from './user';
import BookRouter from './book';
import BasketRouter from './basket';
import AuthRouter from './auth';
import MeRouter from './me';
import ConversationRouter from './conversation'
import checkToken from  'express-jwt';
import { Router } from 'express';


// Init router and path
const router = Router();

// Add sub-routes
router
    .use('/users', UserRouter)
    .use('/books', BookRouter)
    .use('/baskets', BasketRouter)
    .use('/auth', AuthRouter)
    .use('/me', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), MeRouter)
    .use('/conversations', ConversationRouter)

// Export the base-router
export default router;
