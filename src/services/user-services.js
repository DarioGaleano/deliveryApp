import { base } from '../constants';

const forgotPassword = async ({ email }) => {
	const request = await fetch(`${base}/generatetoken`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const login = async ({ user, password }) => {
	const request = await fetch(`${base}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: user,
			password: password,
		}),
	});

	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const register = async ({ name, lastName, email, userName, phoneNumber, document, address, password }) => {
	const request = await fetch(`${base}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			lastName,
			email,
			userName,
			phoneNumber,
			document,
			address,
			password,
		}),
	});

	const response = await request.json();

	return {
		status: request.status,
		response,
	};
};

const updateUser = async ({ email, userName, name, lastName, document, address, phoneNumber, token }) => {
	const request = await fetch(`${base}/updateuser`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			email,
			userName,
			name,
			lastName,
			document,
			address,
			phoneNumber,
		}),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const updatePassword = async ({ token, password }) => {
	const request = await fetch(`${base}/editpassword`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token, password }),
	});
	const response = await request.json();
	return {
		status: request.status,
		response,
	};
};

const getTokensBalance = async ({ token }) => {
	const request = await fetch(`${base}/users/balance`, {
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

const userServices = Object.freeze({
	register,
	forgotPassword,
	login,
	updateUser,
	updatePassword,
	getTokensBalance,
});

export default userServices;
