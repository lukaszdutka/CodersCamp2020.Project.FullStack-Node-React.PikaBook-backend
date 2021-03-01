import * as mongoose from 'mongoose';
import User from './User.interface';

const userSchema = new mongoose.Schema({
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

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
