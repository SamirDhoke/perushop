const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Order = require('../models/order');
const Product = require('../models/product');
const NormalUser = require('../models/normalUser');
const AdminUser = require('../models/adminUser');
const api = supertest(app);

const { mockUser, mockOrder, mockProduct } = require('./helpers');
const { generatePasswordHash } = require('../utils');

let auth = null;
let userId, adminId;
const products = [];

beforeAll(async () => {
	await NormalUser.deleteMany({});

	const passwordHash = await generatePasswordHash(mockUser.password);

	const user = new NormalUser({
		username: mockUser.username,
		email: mockUser.email,
		name: mockUser.name,
		passwordHash
	});

	const admin = new AdminUser({
		username: mockUser.username,
		email: mockUser.email,
		name: mockUser.name,
		passwordHash
	})

	const product = new Product({
		...mockProduct
	});

	await product.save();
	await user.save();
	await admin.save();

	products.push({ qty: 1, product: product._id });
	userId = user._id;
	adminId = admin._id;
})

describe('creating an order', () => {

	beforeEach(async () => {
		await Order.deleteMany({});

		// authenticate yourself
		const res = await api
			.post('/auth/signin')
			.send({ email: mockUser.email, password: mockUser.password })
			.set('Content-Type', 'application/json');

		expect(res.status).toBe(200);
		auth = res.body.auth;
	})

	test('POST /order', async () => {
		const res = await api
			.post('/orders')
			.send({...mockOrder, products})
			.set('Authorization', `Bearer ${auth}`)
			.set('Content-Type', 'application/json')
		expect(res.status).toBe(201);
	})
})

describe('updating an order', () => {
	let orderId;

	beforeAll(async () => {
		const order = new Order({
			...mockOrder,
			products,
			orderedBy: userId
		});
		await order.save();
		orderId = order._id;
	})

	beforeEach(async () => {

		// authenticate yourself
		const res = await api
			.post('/admin/signin')
			.send({ email: mockUser.email, password: mockUser.password })
			.set('Content-Type', 'application/json');

		expect(res.status).toBe(200);
		auth = res.body.auth;
	})

	test('PUT /order/:id', async () => {
		const res = await api
			.put(`/orders/${orderId}`)
			.send({ status: 'DISPATCHED' })
			.set('Authorization', `Bearer ${auth}`)
			.set('Content-Type', 'application/json')
		expect(res.status).toBe(200);
		expect(res.body.status).toBe('DISPATCHED');
	})

})

afterAll(() => {
	mongoose.connection.close();
})