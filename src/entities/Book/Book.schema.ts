import * as mongoose from 'mongoose';
import IBook from './Book';

const bookSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  ownerId: mongoose.Schema.Types.ObjectId
});

const bookModel = mongoose.model<IBook & mongoose.Document>('Book', bookSchema);

export default bookModel;
