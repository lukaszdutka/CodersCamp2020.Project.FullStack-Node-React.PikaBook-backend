import UserRouter from './user';
import BookRouter from './book';
import AuthRouter from './auth';
import MeRouter from './me';
import { Router } from 'express';

// Init router and path
const router = Router();

// Add sub-routes
router
    .use('/users', UserRouter)
    .use('/books', BookRouter)
    .use('/auth', AuthRouter)
    .use('/me', MeRouter);

// Export the base-router
export default router;
