import * as mongoose from 'mongoose';

export interface Basket{
    _id: mongoose.Types.ObjectId,
    createdByUserId: mongoose.Types.ObjectId,
    targetUserID: mongoose.Types.ObjectId,
    booksOffered: mongoose.Types.ObjectId[],
    booksRequested: mongoose.Types.ObjectId[],
    status: String
    timeCreated: Date
}

export default Basket;

