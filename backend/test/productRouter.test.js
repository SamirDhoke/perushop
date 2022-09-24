const mongoose = require('mongoose');
const supertest = require('supertest');
const AdminUser = require('../models/adminUser');
const Product = require('../models/product');
const app = require('../app');
const { generatePasswordHash } = require('../utils');

const { mockUser, mockProduct } = require('./helpers');

const api = supertest(app);

describe('creating product', () => {

	let loginToken = null;

	beforeAll(async () => {
		await AdminUser.deleteMany({});

		// generate password hash
		const passwordHash = await generatePasswordHash(mockUser.password);

		// create an admin
		const admin = new AdminUser({
			username: mockUser.username,
			email: mockUser.email,
			name: mockUser.name,
			passwordHash
		});

		await admin.save();
	})

	beforeEach(async () => {
		// authenticate admin
		const res = await api
			.post('/admin/signin')
			.send({ email: mockUser.email, password: mockUser.password })
			.set('Content-Type', 'application/json');

		expect(res.status).toBe(200);
		expect(res.body.auth).toBeDefined();

		loginToken = res.body.auth;
	})

	test('POST /products (no auth)', async () => {
		const res = await api
			.post('/products')
			.send({...mockProduct})
			.set('Content-Type', 'application/json')
			.expect(401);		
	})

	test('POST /products (bad auth)', async () => {
		const res = await api
			.post('/products')
			.send({...mockProduct})
			.set('Authorization', `Bearer random`)
			.set('Content-Type', 'application/json')
		

		expect(res.status).not.toBe(201);			
	})

	test('POST /products', async () => {
		const res = await api
			.post('/products')
			.send({...mockProduct})
			.set('Authorization', `Bearer ${loginToken}`)
			.set('Content-Type', 'application/json')
			.expect(201);		
	})
})

describe('updating a product', () => {
	
	let loginToken = null;
	let productId = null;

	beforeAll(async () => {
		await AdminUser.deleteMany({});

		// generate password hash
		const passwordHash = await generatePasswordHash(mockUser.password);

		// create an admin
		const admin = new AdminUser({
			username: mockUser.username,
			email: mockUser.email,
			name: mockUser.name,
			passwordHash
		});

		// create product
		const product = new Product({
			...mockProduct
		});

		await product.save();
		await admin.save();

		productId = product.id;
	})

	beforeEach(async () => {
		// authenticate admin
		const res = await api
			.post('/admin/signin')
			.send({ email: mockUser.email, password: mockUser.password })
			.set('Content-Type', 'application/json');

		expect(res.status).toBe(200);
		expect(res.body.auth).toBeDefined();

		loginToken = res.body.auth;
	})

	test("PUT /products/:id (invalid ID)", async () => {
		const updates = {
			name: 'mixer grinder',
			stock: 3
		}

		api
			.put(`/users/abcdefgh`)
			.send({...updates})
			.set('Authorization', `Bearer ${loginToken}`)
			.set('Content-Type', 'application/json')
			.expect(404);
	})

	test("PUT /products/:id", async () => {
		const updates = {
			name: 'mixer grinder',
			stock: 3
		}

		api
			.put(`/users/${productId}`)
			.send({...updates})
			.set('Authorization', `Bearer ${loginToken}`)
			.set('Content-Type', 'application/json')
			.expect(200);
	})

})

afterAll(() => {
	mongoose.connection.close();
})