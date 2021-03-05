import { Router } from 'express';
import checkToken from  'express-jwt';
import { sendMessage } from '@entities/Message/Message.controller';

const router = Router();


router
    .post('', 
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        sendMessage)

export default router;