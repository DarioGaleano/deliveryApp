
//production
const base='https://infinite-citadel-83328.herokuapp.com/api/v1'
//test
//const base='http://192.168.86.56:8000/api/v1'
const urls = {
    //user
    register:`${base}/register/`,
    login:`${base}/login`,
    forgotPassword:`${base}/users/generatetoken`,
    updateUser:`${base}/updateuser`,
    //products
    getCategorys:`${base}/getcategories`,
    getProducts:`${base}/getproducts`,
    findProducts:`${base}/findproducts`,
    productsPerCategory:`${base}/getproductspercategory`,
    //shoppingcart
    getProductShoppingCart:`${base}/getproductshoppingcart`,
    addProductShoppingCart:`${base}/addproductshoppingcart`,
    incrementProductShoppingCart:`${base}/incrementproductshoppingcart`,
    decrementProductShoppingCart:`${base}/decrementproductshoppingcart`,
    removeProductShoppingCart:`${base}/removeproductshoppingcart`,
    //Payment
    payment:`${base}/view/payment`,
    //Order
    getOrder:`${base}/getorder`,
    getOrders:`${base}/getorders`
}

export default urls