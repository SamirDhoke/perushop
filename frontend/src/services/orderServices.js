import axios from 'axios';

import { API } from '../config';

const ENDPOINT = `${API}/orders`;

const generateBearerToken = token => `Bearer ${token}`;

const createOrder = (order, userToken) => {
	const URL = ENDPOINT;

	const headers = {
		Authorization: generateBearerToken(userToken)
	}

	return axios
		.post(URL, order, { headers })
		.then(res => res.data);
};

const getOrder = (orderId, userToken) => {
	const URL = `${ENDPOINT}/${orderId}`;

	const headers = {
		Authorization: generateBearerToken(userToken)
	}

	return axios
		.get(URL, { headers })
		.then(res => res.data);
};

const getOrders = (userToken) => {
	const URL = ENDPOINT;

	const headers = {
		Authorization: generateBearerToken(userToken)
	}

	return axios
		.get(URL, { headers })
		.then(res => res.data);
}

export default {
	createOrder,
	getOrder,
	getOrders
};