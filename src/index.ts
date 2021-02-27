import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import mongoose from 'mongoose'


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.svu8r.mongodb.net/Pikabook?retryWrites=true&w=majority`, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true}, () => {
    console.log("connected to db");
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongodb Connection Error'))

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
