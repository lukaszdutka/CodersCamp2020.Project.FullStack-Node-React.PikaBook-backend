import { Router } from 'express';
import {getLoggedUser, authTokenCheck } from '../entities/Auth/Auth.controller'
const router = Router();


//get a currently logged user
router.get('', authTokenCheck, getLoggedUser );

export default router