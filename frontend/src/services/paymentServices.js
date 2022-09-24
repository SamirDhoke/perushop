import axios from 'axios';

import { API } from '../config';

const ENDPOINT = `${API}/payment`;

const generateBearerToken = token => `Bearer ${token}`;

const getPublishableKey = () => {
	const URL = `${ENDPOINT}/get_publishable_key`
	return axios
		.get(URL)
		.then(res => res.data);
}

const createPayment = (userToken, orderDetails) => {
	const URL = `${ENDPOINT}/create-payment-intent`;

	const headers = {
		Authorization: generateBearerToken(userToken)
	}

	return axios
		.post(URL, { order: orderDetails }, { headers })
		.then(res => res.data);
}

const confirmPayment = (userToken, clientSecret, paymentDetails) => {
	const URL = `${ENDPOINT}/confirm-payment-intent`;

	const headers = {
		Authorization: generateBearerToken(userToken)
	}

	return axios
		.post(URL, { secret: clientSecret, details: paymentDetails }, { headers })
		.then(res => res.data);
}

export default {
	createPayment,
	confirmPayment,
	getPublishableKey
}