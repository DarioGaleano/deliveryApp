import { base } from '../constants';

const getCategorys = async () => {
	const request = await fetch(`${base}/categories?status=true`, {
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

const getProducts = async ({ page = 1, limit = 100 }) => {
	const request = await fetch(`${base}/getproducts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			page,
			limit,
		}),
	});

	const response = await request.json();

	return {
		status: request.status,
		response,
	};
};

const findProducts = async ({ page = 1, limit = 100, textInput }) => {
	const request = await fetch(`${base}/findproducts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			page,
			limit,
			query: textInput,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const productsPerCategory = async ({ page = 1, limit = 100, category }) => {
	const request = await fetch(`${base}/getproductspercategory`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			page,
			limit,
			category,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const producServices = Object.freeze({
	getCategorys,
	getProducts,
	findProducts,
	productsPerCategory,
});

export default producServices;
