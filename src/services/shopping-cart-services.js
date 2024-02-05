import { base } from '../constants';

const getProductShoppingCart = async ({ token }) => {
	let request = await fetch(`${base}/getproductshoppingcart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const addProductShoppingCart = async ({ id, count, token }) => {
	const request = await fetch(`${base}/addproductshoppingcart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			product: id,
			quantity: count,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const incrementProductShoppingCart = async ({ id, token }) => {
	const request = await fetch(`${base}/incrementproductshoppingcart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			item: id,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const decrementProductShoppingCart = async ({ id, token }) => {
	const request = await fetch(`${base}/decrementproductshoppingcart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			item: id,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const removeProductShoppingCart = async ({ id, token }) => {
	const request = await fetch(`${base}/removeproductshoppingcart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			item: id,
		}),
	});

	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const shoppingCartServices = Object.freeze({
	getProductShoppingCart,
	addProductShoppingCart,
	incrementProductShoppingCart,
	decrementProductShoppingCart,
	removeProductShoppingCart,
});

export default shoppingCartServices;
