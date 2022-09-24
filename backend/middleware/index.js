const validateUser = require('./auth');

const errorHandler = (err, req, res, next) => {
	console.log("*ERROR*");
	console.log(err.status);
	console.log(err.message);
	return res
		.status(err.status || 500)
		.json({ error: err.message || 'Internal server error' });
}

const unknownRouteHandler = (req, res, next) => {
	return res
		.status(404)
		.send('this route does not exist.');
}

const requestLogger = (req, res, next) => {
	console.log('---');
	console.log('METHOD -', req.method);
	console.log('URL -', req.url);
	console.log('BODY', req.body);
	next();
}	

module.exports = {
	errorHandler,
	unknownRouteHandler,
	requestLogger	
};