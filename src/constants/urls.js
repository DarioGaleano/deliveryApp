
const base='https://infinite-citadel-83328.herokuapp.com/api/v1'
const urls = {
    //user
    register:`${base}/register/`,
    login:`${base}/login`,
    forgotPassword:`${base}/users/generatetoken`,
    //products
    getProducts:`${base}/getproducts`,
    findProducts:`${base}/findproducts`,
    //shoppingcart
    getProductShoppingCart:`${base}/getproductshoppingcart`,
    addProductShoppingCart:`${base}/addproductshoppingcart`,
    incrementProductShoppingCart:`${base}/incrementproductshoppingcart`,
    decrementProductShoppingCart:`${base}/decrementproductshoppingcart`,
    removeProductShoppingCart:`${base}/removeproductshoppingcart`
    

    //endpoint: 'http://192.168.86.36:8000/api/v1'
}

export default urls