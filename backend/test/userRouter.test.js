const mongoose = require('mongoose');
const supertest = require('supertest');
const { generatePasswordHash } = require('../utils');
const NormalUser = require('../models/normalUser');
const AdminUser = require('../models/adminUser');
const app = require('../app');

const api = supertest(app);

const userData = {
	username: 'johndoe',
	password: '12345678',
	email: 'johndoe@outlook.com',
	name: {
		first: 'john',
		last: 'doe'
	}
}

describe("creating user", () => {
	
	beforeEach(async () => {
		await NormalUser.deleteMany({});
	})

	test("POST /users (bad values)", async () => {
		await api
			.post('/users')
			.send({ badkey: 'badvalue' })
			.set('Content-Type', 'application/json')
			.expect(400);
	})

	test("POST /users", async () => {
		await api
			.post('/users')
			.send({...userData})
			.set('Content-Type', 'application/json')
			.expect(201);
	})

});


describe("updating a created user", () => {
	
	let loginToken = null;
	let userId = null;

	beforeAll(async () => {
		// clear up all existing users
		await NormalUser.deleteMany({});

		// generate a password hash
		const passwordHash = await generatePasswordHash(userData.password);

		// create a user
		const user = new NormalUser({
			username: userData.username,
			email: userData.email,
			passwordHash,
			name: userData.name
		});

		await user.save();

		userId = user.id;
	})

	beforeEach(async () => {
		// authenticate before updating.
		const res = await api
			.post('/auth/signin')
			.send({ email: userData.email, password: userData.password })
			.set('Content-Type', 'application/json')
		

		expect(res.status).toBe(200);
		expect(res.body.auth).toBeDefined();

		loginToken = res.body.auth;		
	});

	test("PUT /users/:id (no login token)", async () => {
		api
			.put(`/users/${userId}`)
			.send({ username: 'doejohn' })
			.set('Content-Type', 'application/json')
			.expect(401);
	})

	test("PUT /users/:id (updating email does not work)", async () => {
		const updatedEmail = 'doejohn@outlook.com';

		const res = await api
			.put(`/users/${userId}`)
			.send({ email: updatedEmail })
			.set('Authorization', `Bearer ${loginToken}`)
			.set('Content-Type', 'application/json')
		

		expect(res.status).toBe(200)
		expect(res.body.email).not.toBe(updatedEmail);

	})

	test("PUT /users/:id", async () => {
		const updates = {
			username: 'doejohn',
			name: {
				first: 'doe',
				last: 'john'
			}
		};

		const res = await api
			.put(`/users/${userId}`)
			.send({ ...updates })
			.set('Authorization', `Bearer ${loginToken}`)
			.set('Content-Type', 'application/json')
		

		expect(res.status).toBe(200)
		expect(res.body.username).toBe(updates.username);
		expect(res.body.name).toEqual(updates.name);

	})

});

describe("get all users", () => {
	
	let loginToken = null;
	let adminId = null;

	beforeAll(async () => {
		// clear up all existing users and admins
		await NormalUser.deleteMany({});
		await AdminUser.deleteMany({});

		// generate a password hash
		const passwordHash = await generatePasswordHash(userData.password);

		// create an admin
		const admin = new AdminUser({
			username: userData.username,
			email: userData.email,
			passwordHash,
			name: userData.name
		});

		await admin.save();

		adminId = admin.id;
	})

	beforeEach(async () => {
		// authenticate before updating.
		const res = await api
			.post('/admin/signin')
			.send({ email: userData.email, password: userData.password })
			.set('Content-Type', 'application/json')
		

		expect(res.status).toBe(200);
		expect(res.body.auth).toBeDefined();

		loginToken = res.body.auth;		
	});

	test("GET /users (no auth)", () => {
		api
			.get('/users')			
			.expect(401);
	})

	test("GET /users", () => {
		api
			.get('/users')
			.set('Authorization', `Bearer ${loginToken}`)
			.expect(200);
	})
})

describe("delete a user", () => {
	let loginToken = null;
	let adminId = null;
	let userId = null;

	beforeAll(async () => {
		// clear up all existing users and admins
		await NormalUser.deleteMany({});
		await AdminUser.deleteMany({});

		// generate a password hash
		const passwordHash = await generatePasswordHash(userData.password);

		// create an admin
		const admin = new AdminUser({
			username: userData.username,
			email: userData.email,
			passwordHash,
			name: userData.name
		});

		// create a user
		const user = new NormalUser({
			username: userData.username,
			email: 'doejohn@outlook.com',
			passwordHash,
			name: userData.name
		});

		await admin.save();
		await user.save();

		adminId = admin.id;
		userId = user.id;
	})

	beforeEach(async () => {
		// authenticate before updating.
		const res = await api
			.post('/admin/signin')
			.send({ email: userData.email, password: userData.password })
			.set('Content-Type', 'application/json')
		

		expect(res.status).toBe(200);
		expect(res.body.auth).toBeDefined();

		loginToken = res.body.auth;		
	});	

	test("DELETE /users/:id (no auth)", async () => {
		api
			.delete(`/users/${userId}`)
			.expect(401);
	})

	test("DELETE /users/:id", async () => {
		api
			.delete(`/users/${userId}`)
			.set('Authorization', `Bearer ${loginToken}`)
			.expect(204);
	})
})

afterAll(() => {
	mongoose.connection.close();
});