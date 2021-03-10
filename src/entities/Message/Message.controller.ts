import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateMessageReq from './Message.validation';
import Message from '../../entities/Message/Message.schema'
import User from '../User/User.schema'

const { BAD_REQUEST, CREATED } = StatusCodes;

export const sendMessage = async (req: Request, res: Response) => {
    const { error } = validateMessageReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    const sender = await User.findById(req.user);
    if (!sender) return res.status(BAD_REQUEST).send("The sender is not a logged user")
    if (req.body.recipient == sender._id) {
        return res.status(BAD_REQUEST).send("You can't send a message to yourself")  
    } 
    const sentData = req.body;
    const defaultData = {
        sender: sender._id, 
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

