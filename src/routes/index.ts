import UserRouter from './user'
import BookRouter from './book';
import { Router } from 'express';


// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/books', BookRouter);


// Export the base-router
export default router;
