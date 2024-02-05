import { base } from '../constants';

const createOrder = async ({ shipping, payment, paymentInfo, token, tokens }) => {
	const request = await fetch(`${base}/createOrder`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			shipping,
			payment,
			paymentInfo,
			tokens,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const getOrder = async ({ id, token }) => {
	const request = await fetch(`${base}/getorder/${id}`, {
		method: 'GET',
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

const getOrders = async ({ page = 1, limit = 100, token }) => {
	const request = await fetch(`${base}/getorders?page=${page}&limit=${limit}`, {
		method: 'GET',
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

const getDolarPrice = async () => {
	const request = await fetch(`${base}/dolarprice`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const finishedOrder = async ({ orderId, token }) => {
	const request = await fetch(`${base}/orders/completed?order=${orderId}`, {
		method: 'GET',
		headers: {
			// 'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const orderServices = Object.freeze({
	createOrder,
	getOrder,
	getOrders,
	getDolarPrice,
	finishedOrder,
});

export default orderServices;
