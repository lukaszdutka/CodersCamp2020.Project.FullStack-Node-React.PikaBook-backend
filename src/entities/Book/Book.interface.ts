import * as mongoose from 'mongoose';

export interface Book {
  _id: mongoose.Types.ObjectId,
  name: string,
  author?: string[],
  genres?: string[],
  year?: number,
  publisher?: string,
  description? : string,
  ownerId: mongoose.Types.ObjectId
}

export default Book;
