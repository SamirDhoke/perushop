const mongoose = require('mongoose');
const supertest = require('supertest');
const AdminUser = require('../models/adminUser');
const { generatePasswordHash } = require('../utils');
const { mockUser } = require('./helpers');
const app = require('../app');

const api = supertest(app);

describe("signin", () => {

	beforeEach(async () => {
		await AdminUser.deleteMany({});
		passwordHash = await generatePasswordHash(mockUser.password);
		// await api.post('/users').send({...mockUser}).set("Content-Type", "application/json");
		await new AdminUser({
			name: mockUser.name,
			username: mockUser.username,
			passwordHash: passwordHash,
			email: mockUser.email
		}).save();
	})

	test("POST /signin (invalid credential)", async () => {
		const res = await api
			.post('/admin/signin')
			.send({ email: 'somerandomemail@gmail.com', password: 'pass' })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")

		expect(res.status).toBe(400);
	});

	test("POST /signin (no auth)", async () => {
		const res = await api
			.post('/admin/signin')
			.send({ email: mockUser.email, password: mockUser.password })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")	

		expect(res.status).toBe(200);
		expect(res.body.user).toBeDefined();
		expect(res.body.auth).toBeDefined();
	});

	afterAll(() => {
		mongoose.connection.close();
	});

})