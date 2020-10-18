import { urls } from "../constants";

const getCategorys = async () => {
  const request = await fetch(urls.getCategorys, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();  
  return {
    status:request.status,
    response
  }
}

const getProducts = async ({ page }) => {
  const request = await fetch(urls.getProducts, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
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
      limit: 5,
      query: textInput,
    }),
  });
  const response = await request.json();
  return {
    status: request.status,
    response,
  };
};

const productsPerCategory = async ({ page, category}) => {
  const request = await fetch(urls.productsPerCategory, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      //limit: items per page
      limit: 5,
      category: category,
    }),
  });
  const response = await request.json();
  return {
    status: request.status,
    response
  }
}

const producServices = Object.freeze({
  getCategorys,
  getProducts,
  findProducts,
  productsPerCategory
});

export default producServices;
