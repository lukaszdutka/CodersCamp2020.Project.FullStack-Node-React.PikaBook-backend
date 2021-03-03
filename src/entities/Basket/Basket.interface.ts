import * as mongoose from 'mongoose';

export interface Basket{
    _id: mongoose.Types.ObjectId,
    createdByUserId: mongoose.Types.ObjectId,
    targetUserID: mongoose.Types.ObjectId,
    booksOffered: mongoose.Types.ObjectId[],
    booksRequested: mongoose.Types.ObjectId[],
    status: String
}

export default Basket;

// createdByUserId
// targetUserId
// booksOffered
// booksRequested
// status: pending/accepted/rejected/cancelled/offered/failedByRequestor/failedByTarget
// timeCreated
