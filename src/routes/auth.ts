import { Router } from 'express';
import { authenticateUser } from '../entities/Auth/Auth.controller';
import cors from "cors"


const router = Router();

// authenticate users
router.post('/', cors(), authenticateUser);

export default router;