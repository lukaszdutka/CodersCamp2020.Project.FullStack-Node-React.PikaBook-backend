import StatusCodes from "http-status-codes";
import { query, Request, Response } from "express";
import User from "../User/User.schema";
import Book from "../../entities/Book/Book.schema";
import Conversation from "../Conversation/Conversation.schema";
import Basket from "../Basket/Basket.schema";

const { BAD_REQUEST, OK, NOT_FOUND } = StatusCodes;

export const getLoggedUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user)
    .select("-password")
    .populate("ownerId", "name");
  res.status(OK).json(user);
};

export const getLoggedUserBooks = async (req: Request, res: Response) => {
  const books = await Book.find({ ownerId: req.user });
  res.status(OK).json(books);
};

export const getAllConversations = async (req: Request, res: Response) => {
  const sender = await User.findById(req.user);
  if (!sender)
    return res.status(BAD_REQUEST).send("The sender is not a logged user");
  const conversations = await Conversation.find(
    { interlocutors: sender._id },
    { messages: { $slice: 1 } }
  ).populate("interlocutors", "name");
  return res.status(OK).json(conversations);
};

export const getConversationByInterlocutorsId = async (
  req: Request,
  res: Response
) => {
  const sender = await User.findById(req.user);
  if (!sender)
    return res.status(BAD_REQUEST).send("The sender is not a logged user");
  const limit =
    req.query.limit && typeof req.query.limit == "string"
      ? parseInt(req.query.limit)
      : NaN;
  const conversation = await Conversation.findOne(
    { interlocutors: { $all: [req.params.id, sender._id] } },
    { messages: { $slice: limit } }
  ).populate("interlocutors", "name");
  if (!conversation)
    res.status(NOT_FOUND).send("There are no messages between users");
  res.status(OK).json(conversation);
};


export const getLoggedUserBaskets = async (
  req: Request,
  res: Response
) => {
  const sender = await User.findById(req.user);
  console.log(sender?._id)
  if (!sender) {
    return res.status(BAD_REQUEST).send("The sender is not a logged user");
  }
  let { status } = req.query;
  if ( status ) {
    const baskets = await Basket.find({$or: [{ createdByUserId: sender._id as string}, { targetUserID: sender._id as string }]})
                                .where('status').equals(status)
    return res.status(OK).json(baskets);
  }
  const baskets = await Basket.find({$or: [{ createdByUserId: sender._id as string}, { targetUserID: sender._id as string }]});
  return res.status(OK).json(baskets);
};