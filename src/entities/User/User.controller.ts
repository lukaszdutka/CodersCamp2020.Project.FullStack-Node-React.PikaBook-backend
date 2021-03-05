import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import userModel from "./User.schema";
import validateUser from './User.validation';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import bookModel from '../../entities/Book/Book.schema';

const { BAD_REQUEST, OK, CREATED } = StatusCodes;
const User = userModel;
const Book = bookModel;

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    return res.status(OK).json(users);
}


export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(OK).json(user);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const getUsersBooksById = async (req: Request, res: Response) => {
    try {
        const books = await Book.find({ownerId: req.params.id});
        return res.status(OK).json(books);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(BAD_REQUEST).send("Email already registered");

    user = await User.findOne({name: req.body.name});
    if (user) return res.status(BAD_REQUEST).send("Name already registered");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: password,
        location: req.body.location
    });
    await newUser.save();
    return res.status(CREATED).json(_.pick(newUser, ['name', 'email', 'location']));
} 
