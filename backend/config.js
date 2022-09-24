if (process.env.NODE_ENV === 'dev') {
	require('dotenv').config();
}

let DB_NAME; 

if ( process.env.NODE_ENV === 'test' ) {
	DB_NAME = 'peru_test';
} else if ( process.env.NODE_ENV === 'dev' ) {
	DB_NAME = 'dev';
} else {
	DB_NAME = 'perushop';
}

let URL = `mongodb://127.0.0.1:27017/${DB_NAME}`;

if ( process.env.NODE_ENV === 'production' ) {
	const APP_NAME = process.env.APP_NAME;	
	const APP_PASS = process.env.APP_PASS;
	URL = `mongodb+srv://${APP_NAME}:${APP_PASS}@cluster0.i6eur.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
}

const SALT_ROUNDS = 10;

const JWT_TOKEN_SECRET = process.env.JWT_SECRET;

const STRIPE_SECRET = process.env.STRIPE_SECRET;

const STRIPE_PK = process.env.STRIPE_PK;

module.exports = {
	MONGO_DB_URL: URL,
	SALT_ROUNDS,
	JWT_TOKEN_SECRET,
	STRIPE_SECRET,
	STRIPE_PK
}