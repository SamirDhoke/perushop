const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');


const transformSchema = (doc, updated) => {
	updated.id = updated._id.toString();
	delete updated._id;
	delete updated.__v;
}

const logger = {
	logToConsole: function (level, msg) {
		console.log(level, msg);
	},

	logToFile: function (level, msg) {
		return null;
	},

	get log() {
		if (process.env.NODE_ENV === 'dev') {
			return this.logToConsole;
		} else {
			return this.logToFile;
		}
	},

	info: function (msg) { 
		this.log('[INFO]', msg)
	},
	error: function (msg) {
		this.log('[ERROR]', msg)
	},
	warning: function (msg) {
		this.log('[WARNING]', msg);
	}
}

const generatePasswordHash = (plaintext) =>  {
	return bcrypt
		.hash(plaintext, config.SALT_ROUNDS)		
}

const verifyPassword = (plaintext, user) => {
	return bcrypt
		.compare(plaintext, user.passwordHash)		
}

const generateJwtToken = (payload) => {
	return jwt.sign(payload, config.JWT_TOKEN_SECRET, { expiresIn: '1h' });
}

const verifyJwtToken = (token) => {
	return jwt.verify(token, config.JWT_TOKEN_SECRET);
}

module.exports = {
	transformSchema,
	logger,
	generatePasswordHash,
	verifyPassword,
	generateJwtToken,
	verifyJwtToken
};