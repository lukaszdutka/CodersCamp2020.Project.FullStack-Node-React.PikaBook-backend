import * as mongoose from 'mongoose';

export interface IBook {
  _id: mongoose.Types.ObjectId,
  name: string,
  ownerId: mongoose.Types.ObjectId
}

class Book implements IBook {

  public _id: mongoose.Types.ObjectId;
  public name: string;
  public ownerId: mongoose.Types.ObjectId;

  constructor(nameOrUser: string | IBook, _id?: mongoose.Types.ObjectId, ownerId?: mongoose.Types.ObjectId) {
      if (typeof nameOrUser === 'string') {
          this.name = nameOrUser;
          this._id = _id || new mongoose.Types.ObjectId();
          this.ownerId = ownerId || new mongoose.Types.ObjectId();
      } else {
          this.name = nameOrUser.name;
          this._id = nameOrUser._id;
          this.ownerId = nameOrUser.ownerId;
      }
  }
}

export default Book;
