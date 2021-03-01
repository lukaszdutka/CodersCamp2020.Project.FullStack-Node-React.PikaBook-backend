import * as mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId,
  name: string,
  email: string,
  password: string
}

class User implements IUser {

    public _id: mongoose.Types.ObjectId;
    public name: string;
    public email: string;
    public password: string;

    constructor(nameOrUser: string | IUser, email?: string, _id?: mongoose.Types.ObjectId, password?: string) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
            this._id = _id || new mongoose.Types.ObjectId();
            this.password = password || "";
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this._id = nameOrUser._id;
            this.password = nameOrUser.password;
        }
    }
}

export default User;
