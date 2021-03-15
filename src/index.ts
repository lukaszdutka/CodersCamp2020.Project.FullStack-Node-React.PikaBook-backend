import './pre-start'; // Must be the first import
import app from './Server';
import logger from './shared/Logger';
import mongoose from 'mongoose'

if (!process.env.JWT_PRIVATE_KEY) {
    logger.err('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1);
}
const dbUrl = `${process.env.DB_URL}`
    .replace('<USER>', process.env.DB_USER as string)
    .replace('<PASSWORD>', process.env.DB_PASSWORD as string);
mongoose.connect(dbUrl, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true}, () => {
        logger.info("connected to db");
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongodb Connection Error'))

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
