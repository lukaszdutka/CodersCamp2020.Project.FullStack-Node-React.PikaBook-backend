import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import validateBasketReq, { validateBasketStatus } from "./Basket.validation";
import Basket from "./Basket.schema";
import User from "../User/User.schema";
import Book from "../Book/Book.schema";
import IBook from "../Book/Book.interface";
import { getStatusValue, StatusType } from "./Basket.interface";
import { markBookExchanged } from "@entities/Book/Book.controller";

const { BAD_REQUEST, FORBIDDEN, CREATED, OK, NOT_FOUND } = StatusCodes;

export const getBasketById = async (req: Request, res: Response) => {
  const user = await User.findById(req.user);
  try {
    const basket = await Basket.findById(req.params.id)
      .populate("createdByUserId", "name")
      .populate("targetUserID", "name")
      .populate("booksOffered", "name")
      .populate("booksRequested", "name");
    if (
      !basket?.createdByUserId?.equals(user?._id) &&
      !basket?.targetUserID.equals(user?._id)
    ) {
      return res.status(FORBIDDEN).send("Basket does not belong to the user");
    }
    return res.status(OK).json(basket);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error.message);
  }
};

const validateBooksOwner = (books: IBook[], booksFromReqBody: string[]) => {
  const booksId: string[] = books.map((book) => book._id.toString());
  const booksFromReqBodyId = booksFromReqBody.map((id) => id.toString());
  if (
    !booksFromReqBodyId.every(
      (bookId) => booksId.indexOf(bookId) > -1
    )
  ) {
    return false;
  }
  return true;
};

const validateBooksAvailable = (books: IBook[], booksFromReqBody: string[]) => {
    const booksForExchange = books.filter((book) => booksFromReqBody.indexOf(book._id.toString()) > -1);
    const booksExchange: boolean[] = booksForExchange.map((book) => book.exchanged);
    return !booksExchange.includes(true);
};

export const addBasket = async (req: Request, res: Response) => {
  const { error } = validateBasketReq(req.body);
  if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

  const user = await User.findById(req.user);
  if (user?._id == req.body.targetUserID)
    return res
      .status(BAD_REQUEST)
      .send("targetUserID should be different that createdByUserId");

  const booksToOffer = await Book.find({ ownerId: req.user });
  const booksToOfferFromReqBody: string[] = req.body.booksOffered;
  if (!validateBooksOwner(booksToOffer, booksToOfferFromReqBody)) {
    return res
      .status(BAD_REQUEST)
      .send("You are offering a book that you don't have.");
  }

  if (!validateBooksAvailable(booksToOffer, booksToOfferFromReqBody)) {
    return res
    .status(BAD_REQUEST)
    .send("You are offering a book that has been already exchanged.");
  }

  const booksToRequest = await Book.find({ ownerId: req.body.targetUserID });
  const booksToRequestFromReqBody: string[] = req.body.booksRequested;
  if (!validateBooksOwner(booksToRequest, booksToRequestFromReqBody)) {
    return res
      .status(BAD_REQUEST)
      .send("You are requesting a book that target user doesn't have.");
  }

  if (!validateBooksAvailable(booksToRequest, booksToRequestFromReqBody)) {
    return res
    .status(BAD_REQUEST)
    .send("You are requesting a book that has been already exchanged.");
  }

  const basketData = req.body;
  const createdByUserId = { createdByUserId: req.user };
  const basket = new Basket({ ...basketData, ...createdByUserId });
  try {
    await basket.save();
    return res.status(CREATED).json(basket);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error._message);
  }
};

export const updateBasketStatus = async (req: Request, res: Response) => {
    
    const { error } = validateBasketStatus(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

    const user = await User.findById(req.user);
    if (!user)
    return res.status(BAD_REQUEST).send("The user is not logged in");

    try {
        const basket = await Basket
        .findById( { _id: req.params.id })
        .populate('createdByUserId', 'name')
        .populate('targetUserID', 'name')
        
        if (!basket) {
            return res.status(NOT_FOUND).send('There is no basket to be updated')
        }


        if (isFailureStatus(basket.status)) {
          return res.status(OK).send('Basket status did not changed (basket is already in failure status)');
        }

        if (basket.status === req.body.status) {
            return res.status(OK).send('Basket status did not change (new status is the same as a current status)');
        }

        if ( isPreviousStatus(req.body.status, basket.status) && !isFailureStatus(req.body.status)) {
            return res.status(OK).send('Incorrect basket status (you cannot return to the previous status)');
        }

        if ( !isSubsequentStatus(req.body.status, basket.status) && !isFailureStatus(req.body.status)) {
          return res.status(OK).send('Incorrect basket status (new status is not subsequent to the previous one)');
        }

        if( basket.createdByUserId ) {
          if (!basket.createdByUserId.equals(user._id) && !basket.targetUserID.equals(user._id)) {
              return res.status(FORBIDDEN).send("Basket does not belong to the user");
          }
          if ((basket.createdByUserId.equals(user._id) && 
          (req.body.status == 'rejected' || 
          req.body.status == 'accepted' ||
          req.body.status == 'successByTarget') ||
          (req.body.status == 'success' && basket.status  == 'successByRequestor')
          )) {
            return res.status(OK).send('Basket status did not changed (status not allowed for basket creator)');
          }
          if ((basket.targetUserID.equals(user._id)) && 
          (req.body.status == 'cancelled' ||
          req.body.status == 'successByRequestor' ||
          (req.body.status == 'success' && basket.status == 'successByTarget')
          )) {
            return res.status(OK).send('Basket status did not changed (status not allowed for basket target user)');
          }
      }
      if (req.body.status == "success") {
        basket.booksOffered.forEach( async (book) => {
          const id = book as unknown as string;
          const changed = await markBookExchanged(id);
          if (!changed) return res.status(OK).send('Problem in changing the exchange status of books offered');
        })
        basket.booksRequested.forEach( async (book) => {
          const id = book as unknown as string;
          const changed = await markBookExchanged(id);
          if (!changed) return res.status(OK).send('Problem in changing the exchange status of books requested');
        })
      }
      await Basket.updateOne( { _id: req.params.id }, { status: req.body.status });
      await Basket.updateOne( { _id: req.params.id }, { read: false});
      return res.status(OK).send("Basket status updated");
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
};

const isFailureStatus = (status: StatusType | undefined) => {
  return getStatusValue(status) == -1
}

const isPreviousStatus = (newStatus: StatusType | undefined, oldStatus: StatusType | undefined) => {
  return getStatusValue(oldStatus) > getStatusValue(newStatus) 
}

const isSubsequentStatus = (newStatus: StatusType | undefined, oldStatus: StatusType | undefined) => {
  return getStatusValue(newStatus) - getStatusValue(oldStatus) == 1
}



export const updateBasketRead = async (req: Request, res: Response) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(BAD_REQUEST).send("The user is not logged in");
  try {
    await Basket.updateMany(
      { targetUserID: user._id },
      { $set: { read: true } }
    );
    return res.status(OK).send("Basket status updated");
  } catch (error) {
    return res.status(BAD_REQUEST).send(error.message);
  }
};

