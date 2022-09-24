import axios from 'axios';

import { API } from '../config';

const ENDPOINT = API;

const login = (email, password) => {
	let URL = `${ENDPOINT}/auth/signin`;

	return axios
		.post(URL, { email, password })
		.then(res => res.data);
};

const signup = (userData) => {
	let URL = `${ENDPOINT}/users`;

	return axios
		.post(URL, { ...userData })
		.then(res => res.data);
};

export default {
	login,
	signup
};