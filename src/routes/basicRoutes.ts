import UserRouter from './user';
import BookRouter from './book';
import AuthRouter from './auth';
import MeRouter from './me';
import MessageRouter from './message'
import checkToken from  'express-jwt';
import { Router } from 'express';


// Init router and path
const router = Router();

// Add sub-routes
router
    .use('/users', UserRouter)
    .use('/books', BookRouter)
    .use('/auth', AuthRouter)
    .use('/me',
    checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
     MeRouter)
    .use('/messages', MessageRouter)

// Export the base-router
export default router;
