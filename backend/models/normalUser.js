const { Schema, model } = require('mongoose');
const { transformSchema } = require('../utils');
const userSchema = require('./user');
const addressSchema = require('./address');

const normalUserSchema = new Schema({
	...userSchema,
	...addressSchema,
	phone: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

normalUserSchema.set('toJSON', {
	transform: transformSchema
});

normalUserSchema.statics.isEmailUnique = function(email) { 
	return !! this.find({ email: email }); 
}

normalUserSchema.methods.verifyUser = function() {	
	const model = this.model(this.constructor.modelName, this.schema);
	return model.findByIdAndUpdate(this._id, {
		isVerified: true
	}, { new: true });
}

const NormalUser = model('NormalUser', normalUserSchema);

module.exports = NormalUser;