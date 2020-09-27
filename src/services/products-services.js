import { urls } from "../constants";
const getProducts = async ({ page }) => {
  const request = await fetch(urls.getProducts, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      //limit: items per page
      limit: 5,
    }),
  });

  const response = await request.json();

  return {
    status: request.status,
    response,
  };
};

const findProducts = async ({ page, textInput }) => {
  const request = await fetch(urls.findProducts, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      //limit: items per page
      limit: 1,
      query: textInput,
    }),
  });
  const response = await request.json();
  return {
    status: request.status,
    response,
  };
};

const producServices = Object.freeze({
  getProducts,
  findProducts,
});

export default producServices;
