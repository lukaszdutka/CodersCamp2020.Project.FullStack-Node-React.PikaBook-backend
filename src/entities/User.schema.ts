import * as mongoose from 'mongoose';
import IUser from './User';

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String
});

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
