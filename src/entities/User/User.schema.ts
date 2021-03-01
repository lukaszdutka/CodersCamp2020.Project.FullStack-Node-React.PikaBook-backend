import * as mongoose from 'mongoose';
import IUser from './User';

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
  password: { 
    type: String, 
    required: true }
});

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
