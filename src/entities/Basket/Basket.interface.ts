import * as mongoose from "mongoose";

export type StatusType = 'pending'| 'accepted'|'rejected'|'cancelled'|'failedByRequestor'|'failedByTarget'|'successByRequestor'|'success'|'successByTarget';

interface IStatusOrders extends Record<StatusType, number>  { }
export const StatusOrder: IStatusOrders = {
    'rejected': -1, 'cancelled': -1, 'failedByRequestor': -1, 'failedByTarget': -1,
    'pending': 0, 
    'accepted': 1,
    'successByRequestor': 2, 'successByTarget': 2,
    'success': 3,
}

function isNotUndefined(status: any): status is StatusType {
    return typeof status !== "undefined";
}

export function getStatusValue(status?: StatusType) {
    return isNotUndefined(status) ? StatusOrder[status] : 999;
}

export interface IBasket {
  _id: mongoose.Types.ObjectId;
  createdByUserId?: mongoose.Types.ObjectId;
  targetUserID: mongoose.Types.ObjectId;
  booksOffered: mongoose.Types.ObjectId[];
  booksRequested: mongoose.Types.ObjectId[];
  status?: StatusType;
  timeCreated?: Date;
  read?: boolean;
}

export default IBasket;
