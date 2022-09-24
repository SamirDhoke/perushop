const userSchema = {
	email: {
		type: String,
		required: true,
		validate: {
			validator: function(value) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			},
			message: props => 'please enter a valid email address.'
		}
	},
	name: {
		first: String,
		last: String
	},
	username: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	isVerified: {
		type: Boolean,
		default: false
	}
}

module.exports = userSchema;