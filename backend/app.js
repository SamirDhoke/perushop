const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const middleware = require('./middleware');
const userRouter = require('./routes/userRouter');
const userAuthRouter = require('./routes/userAuthRouter');
const adminAuthRouter = require('./routes/adminAuthRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const paymentRouter = require('./routes/paymentRouter');
const { logger } = require('./utils');

const connectionOptions = {};

mongoose
	.connect(config.MONGO_DB_URL, connectionOptions)
	.then(() => logger.info('Database connected!'))
	.catch(e => logger.error(`error connecting database - ${e.message}`));

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

if ( process.env.NODE_ENV === 'dev' ) {
	app.use(middleware.requestLogger);
}

app.use('/api/auth', userAuthRouter);
app.use('/api/admin', adminAuthRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymentRouter);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})

// app.use(middleware.unknownRouteHandler);
app.use(middleware.errorHandler);

module.exports = app;