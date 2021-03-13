import * as mongoose from 'mongoose';
import Basket from './Basket.interface';

const basketSchema = new mongoose.Schema({
    createdByUserId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    targetUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booksOffered: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        required: true
    },
    booksRequested: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','rejected','cancelled','offered','failedByRequestor','failedByTarget'],
        default: 'offered',
    },
    timeCreated: {
        type: Date,
        default: Date.now
    }
});

const basketModel = mongoose.model<Basket & mongoose.Document>('Basket', basketSchema);


export default basketModel;