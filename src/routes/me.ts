import { Router } from 'express';
import {getLoggedUser } from '../entities/Auth/Auth.controller';
import { checkTokenAuth } from  '../shared/functions';

const router = Router();


//get a currently logged user
router.get('', checkTokenAuth, getLoggedUser );

export default router