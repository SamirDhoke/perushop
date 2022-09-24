const router = require('express').Router();
const AdminUser = require('../models/adminUser');
const { generateJwtToken, verifyPassword } = require('../utils');

router.post('/signin', (req, res, next) => {
	const cred = req.body;
	if (!cred.email || !cred.password) {
		next({
			status: 400,
			message: 'invalid credentials'
		});
	}

	AdminUser
		.findOne({ email: cred.email })
		.then(user => {
			if (!user) {
				next({ status: 400, message: 'invalid credentials'});
			}
			verifyPassword(cred.password, user)
				.then(result => {
					if (!result) {
						next({ status: 400, message: 'invalid credentials'});	
					}
					const authToken = generateJwtToken(user.id);
					res.json({ user: user.username, auth: authToken });
				})
				.catch(e => next({ status: e.status || 500, message: e.message }));
		})		
		.catch(e => next({ status: e.status || 500, message: e.message }));
})

module.exports = router;