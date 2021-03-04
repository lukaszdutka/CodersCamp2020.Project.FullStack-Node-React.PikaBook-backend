import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import userModel from "../../entities/User/User.schema";

const { BAD_REQUEST, OK } = StatusCodes;
const User = userModel;


export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find({});
    return res.status(OK).json({ users });
}


export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.find({ _id: req.params.id });
        return res.status(OK).json({ user });
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}
