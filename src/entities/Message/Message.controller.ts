import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateMessageReq from './Message.validation';
import Message from '../../entities/Message/Message.schema'

const { BAD_REQUEST, CREATED } = StatusCodes;

export const sendMessage = async (req: Request, res: Response) => {
    const { error } = validateMessageReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    if (req.body.recipient === req.user) {
        return res.status(BAD_REQUEST).send("You can't send a message to yourself")  
    } 
    const sentData = req.body;
    const defaultData = {
        sender: req.user, 
        read: false
    }
    const message = new Message({...sentData, ...defaultData})
    try {
        await message.save()
        return res.status(CREATED).json(message);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}

