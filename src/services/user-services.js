import { urls } from "../constants";

const forgotPassword = async ({ emailReset }) => {
  const request = await fetch(urls.forgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${emailReset}`,
  });
  const response = await request.json();
  return {
    status: request.status,
    response,
  };
};

const login = async ({ user, password }) => {
  const request = await fetch(urls.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

const register = async ({
  completeName,
  email,
  userName,
  completePhoneNumber,
  document,
  address,
  password,
}) => {
  const request = await fetch(config.endpoint + "/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: completeName,
      email: email,
      userName: userName,
      phoneNumber: completePhoneNumber,
      document: document,
      address: address,
      password: password,
    }),
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
});

export default userServices;
