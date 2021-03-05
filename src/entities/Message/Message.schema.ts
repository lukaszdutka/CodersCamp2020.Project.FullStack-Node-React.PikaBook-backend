import * as mongoose from 'mongoose';
import IMessage from './Message.interface';

const schema = new mongoose.Schema({
  sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }, 
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, 
  content: String, 
  date: {
      type: Date,
      default: Date.now
  },
  read: Boolean
});

const Message = mongoose.model<IMessage & mongoose.Document>('Message', schema);

export default Message;