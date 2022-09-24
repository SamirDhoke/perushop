const router = require('express').Router();
const Product = require('../models/product');
const { validateAuth, validateAdmin } = require('../middleware/auth');

router.get('/', (req, res, next) => {
	const category = req.query.category || '';
	const searchQuery = req.query.search || '';
	const filter = {};

	if (category) {
		filter["category"] = category;
	}

	if (searchQuery) {
		filter["name"] = {
			$regex: RegExp(searchQuery),
			$options: 'i'
		}
	}

	Product
		.find(filter)
		.then(products => res.json(products))
		.catch(e => next({ status: 500, message: e.message }));
})

router.post('/', validateAuth, validateAdmin, (req, res, next) => {
	const user = req.user;
	const productData = req.body;

	if (!user.isAdmin) {
		return next({
			status: 401,
			message: 'unauthorized'
		});
	}
	
	const product = new Product({ ...productData });	
	
	product
		.save()
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(e => next({ status: 500, message: e.message }));
})

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;

	Product
		.findById(id)
		.then(product => {
			res.json(product);
		})
		.catch(e => next({ status: 500, message: e.message }));
})

router.put('/:productId', validateAuth, validateAdmin, (req, res, next) => {
	const user = req.user;
	const updates = req.body;
	const id = req.params.productId;

	if (!user.isAdmin) {
		return next({
			status: 401,
			message: 'unauthorized'
		});
	}
	
	Product
		.findById(id)
		.then(oldProduct => {
			if (!oldProduct) {
				return next({
					status: 404,
					message: 'product not found'
				});
			}

			const productUpdates = {
				name: updates.name || oldProduct.name,
				description: updates.description || oldProduct.description,
				stock: updates.stock || oldProduct.stock,
				discount: updates.discount || oldProduct.discount,
				images: updates.images || oldProduct.images
			}

			return Product.findByIdAndUpdate(id, productUpdates, { new: true });
		})	
		.then(newProduct => res.json(newProduct))
		.catch(e => next({ status: e.status || 500, message: e.message }));
})

router.delete('/:productId', validateAuth, validateAdmin, (req, res, next) => {
	const user = req.user;
	const id = req.params.productId;

	if (!user.isAdmin) {
		return next({
			status: 401,
			message: 'unauthorized'
		});
	}
	
	Product
		.findById(id)
		.then(oldProduct => {
			if (!oldProduct) {
				return next({
					status: 404,
					message: 'product not found'
				});
			}

			return Product.findByIdAndDelete(id);
		})	
		.then(() => res.status(204).end())
		.catch(e => next({ status: e.status || 500, message: e.message }));
})

module.exports = router;