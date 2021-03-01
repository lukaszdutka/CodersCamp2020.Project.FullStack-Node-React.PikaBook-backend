import * as mongoose from 'mongoose';
import Book from './Book.interface';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String
  },
  genres: {
    type: [String]
  },
  year: {
    type: Number
  },
  publisher: {
    type: String
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

const bookModel = mongoose.model<Book & mongoose.Document>('Book', bookSchema);

export default bookModel;
