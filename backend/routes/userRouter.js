const router = require('express').Router();
const NormalUser = require('../models/normalUser');
const config = require('../config');

const { validateAuth, validateUser, validateAdmin } = require('../middleware/auth');
const { logger, generatePasswordHash } = require('../utils');

router.get('/', validateAuth, validateAdmin, (req, res) => {
	const user = req.user;

	if (!user.isAdmin) {
		return next({
			status: 400,
			message: "unauthorized"
		});
	}

	NormalUser
		.find({})
		.then(users => res.json(users))
		.catch(e => res.status(500).json({ error: e.message }));
});

router.post('/', (req, res, next) => {
	const {
		email,
		username,
		name,
		password
	} = req.body;	

	if (!email || !username || !password) {
		next({ status: 400, message: "email, username, password are required fields." });
	}

	if (!NormalUser.isEmailUnique(email)) {
		return next({ status: 400, message: "email is taken." });
	}

	generatePasswordHash(password)
		.then(passwordHash => {
			const normalUser = new NormalUser({
				email,
				username,
				name,
				passwordHash
			});

			return normalUser;
		})
		.then(normalUser => normalUser.save())
		.then(createdUser => res.status(201).json(createdUser))
		.catch(e => next({ status: 500, message: e.message }));
})

router.get('/:userId', validateAuth, validateUser, validateAdmin, (req, res, next) => {
	const id = req.params.userId;

	const user = req.user;

	if (user._id !== id || !user.isAdmin ) {
		next({
			status: 400,
			message: "unauthorized"
		});
	}

	NormalUser
		.findById(id)
		.then(user => res.json(user))
		.catch(e => next({ status: 500, message: e.message }));
})

router.put('/:userId', validateAuth, validateUser, (req, res, next) => {
	const id = req.params.userId;
	const updatedUserData = req.body;

	const user = req.user;

	if (user.id !== id) {
		next({
			status: 400,
			message: "unauthorized"
		});
	}

	const updates = {
		name: updatedUserData.name || user.name,
		username: updatedUserData.username || user.username,
		address: updatedUserData.address || user.address
	}

	NormalUser
		.findByIdAndUpdate(id, updates, { new: true })		
		.then(updatedUser => res.json(updatedUser))
		.catch(e => next({ status: e.status || 500, message: e.message }));
})

router.delete('/:userId', validateAuth, validateAdmin, (req, res, next) => {
	const id = req.params.userId;

	const user = req.user;

	if (!user.isAdmin) {
		next({
			status: 400,
			message: "unauthorized"
		});
	}

	NormalUser
		.findByIdAndDelete(id)
		.then(() => res.status(204).end())
		.catch(e => res.status(500).json({ error: e.message }));
})

module.exports = router;