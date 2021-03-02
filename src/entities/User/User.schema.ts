import * as mongoose from 'mongoose';
import User from './User.interface';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true, 
    unique: true, 
    // eslint-disable-next-line max-len
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { 
    type: String, 
  required: true 
  },
  location: String
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
