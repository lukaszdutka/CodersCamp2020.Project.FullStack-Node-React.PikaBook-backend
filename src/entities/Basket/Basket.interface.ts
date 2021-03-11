import * as mongoose from 'mongoose';

type StatusType = 'pending'| 'accepted'|'rejected'|'cancelled'|'offered'|'failedByRequestor'|'failedByTarget'

export interface Basket{
    _id: mongoose.Types.ObjectId,
    createdByUserId? : mongoose.Types.ObjectId,
    targetUserID: mongoose.Types.ObjectId,
    booksOffered: mongoose.Types.ObjectId[],
    booksRequested: mongoose.Types.ObjectId[],
    status: StatusType,
    timeCreated: Date
}

export default Basket;

