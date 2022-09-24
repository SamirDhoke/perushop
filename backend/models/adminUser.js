const { Schema, model } = require('mongoose');
const { transformSchema } = require('../utils');
const userSchema = require('./user');

const adminUserSchema = new Schema({
	...userSchema,
	isAdmin: {
		type: Boolean,
		default: true
	}
});

adminUserSchema.set('toJSON', {
	transform: transformSchema
});

adminUserSchema.methods.isAdminExist = function() {
	const model = this.model(this.constructor.modelName, this.schema);
	return model
		.findOne({ isAdmin: true })
		.then(function( existingAdmin ) {
			if ( existingAdmin ) {
				return false;
			}
			return true;			
		});	
}

const AdminUser = model("AdminUser", adminUserSchema);

module.exports = AdminUser;