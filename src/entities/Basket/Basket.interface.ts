import * as mongoose from 'mongoose';

type StatusType = 'pending'| 'accepted'|'rejected'|'cancelled'|'offered'|'failedByRequestor'|'failedByTarget'|'success';

interface IStatusOrders extends Record<StatusType, number>  { }
export const StatusOrder: IStatusOrders = {
    'pending': 0,
    'rejected': 1, 'cancelled': 1, 
    'accepted': 2, 
    'offered': 3,
    'failedByRequestor': 4, 'failedByTarget': 4,
    'success': 5,
}

function isUndefined(status: any): status is StatusType {
    return typeof status === "undefined";
}

export function getStatusValue(status?: StatusType) {
    return isUndefined(status) ? StatusOrder[status] : 999;
}

export interface IBasket{
    _id: mongoose.Types.ObjectId,
    createdByUserId? : mongoose.Types.ObjectId,
    targetUserID: mongoose.Types.ObjectId,
    booksOffered: mongoose.Types.ObjectId[],
    booksRequested: mongoose.Types.ObjectId[],
    status?: StatusType,
    timeCreated?: Date
}

export default IBasket;

