const mongoose = require('mongoose');
const supertest = require('supertest');
const NormalUser = require('../models/normalUser');
const app = require('../app');

const api = supertest(app);

describe("signin", () => {

	const userData = {
		name: {
			first: 'john',
			last: 'doe'
		},
		username: 'johndoe',
		password: '12345678',
		email: 'johndoe@gmail.com'
	}

	beforeEach(async () => {
		await NormalUser.deleteMany({});
		await api.post('/users').send({...userData}).set("Content-Type", "application/json");
	})

	test("POST /signin (invalid credential)", async () => {
		const res = await api
			.post('/auth/signin')
			.send({ email: 'somerandomemail@gmail.com', password: 'pass' })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")

		expect(res.status).toBe(400);
	});

	test("POST /signin", async () => {
		const res = await api
			.post('/auth/signin')
			.send({ email: userData.email, password: userData.password })
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