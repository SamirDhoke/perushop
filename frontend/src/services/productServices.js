import axios from 'axios';

import { API } from '../config';

const ENDPOINT = `${API}/products`;

const getProducts = (category='') => {
	let URL_WITH_PARAMS = ENDPOINT;

	if (category) {
		URL_WITH_PARAMS = `${ENDPOINT}?category=${category}`;
	}

	return axios
		.get(URL_WITH_PARAMS)
		.then(res => res.data);
};

const getFilteredProducts = (searchQuery) => {
	let URL_WITH_PARAMS = ENDPOINT;

	if (searchQuery) {
		URL_WITH_PARAMS = `${ENDPOINT}?search=${searchQuery}`;
	}

	return axios
		.get(URL_WITH_PARAMS)
		.then(res => res.data);
};

const getProduct = (id) => {
	return axios
		.get(`${ENDPOINT}/${id}`)
		.then(res => res.data);
}

export default {
	getProducts,
	getProduct,
	getFilteredProducts
};