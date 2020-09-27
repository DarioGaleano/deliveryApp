import { urls } from "../constants";
import { AsyncStorage } from 'react-native'

const getProductShoppingCart = async() => {
    let request = await fetch(urls.getProductShoppingCart, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
        },
      });
      const response = await request.json();
      return{
          status: request.status,
          response
      }

}
const addProductShoppingCart = async ({ id, count }) => {
  const request = await fetch(urls.addProductShoppingCart, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
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

const incrementProductShoppingCart = async ({ id }) => {
  const request = await fetch(urls.incrementProductShoppingCart, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
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

const decrementProductShoppingCart = async ({ id }) => {
  const request = await fetch(urls.decrementProductShoppingCart, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
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

const removeProductShoppingCart = async ({ id }) => {
  const request = await fetch(urls.removeProductShoppingCart, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
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
