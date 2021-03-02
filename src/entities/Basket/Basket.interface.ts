import * as mongoose from 'mongoose';

type statusType = 'pending'| 'accepted'|'rejected'|'cancelled'|'offered'|'failedByRequestor'|'failedByTarget'

export interface Basket{
    _id: mongoose.Types.ObjectId,
    createdByUserId: mongoose.Types.ObjectId,
    targetUserID: mongoose.Types.ObjectId,
    booksOffered: mongoose.Types.ObjectId[],
    booksRequested: mongoose.Types.ObjectId[],
    status: statusType
}

// createdByUserId
// targetUserId
// booksOffered
// booksRequested
// status: pending/accepted/rejected/cancelled/offered/failedByRequestor/failedByTarget
// timeCreated
