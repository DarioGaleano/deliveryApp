import { urls } from "../constants";
import { AsyncStorage } from 'react-native'

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
  console.log('login', response)
  return {
    status: request.status,
    response,
  };
};

const register = async ({
  name,
  lastName,
  email,
  userName,
  phoneNumber,
  document,
  address,
  password,
}) => {
  const request = await fetch(urls.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      lastName,
      email,
      userName,
      phoneNumber,
      document,
      address,
      password
    }),
  });

  const response = await request.json();

  return {
    status: request.status,
    response,
  };
};

const updateUser = async({email, userName,  name, lastName, document, address, phoneNumber}) => {
  const request = await fetch(urls.updateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(await AsyncStorage.getItem('token'))}`,
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
    response
  }

}

const userServices = Object.freeze({
  register,
  forgotPassword,
  login,
  updateUser
});

export default userServices;
