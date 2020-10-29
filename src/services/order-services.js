import { urls } from '../constants'
import { AsyncStorage } from 'react-native'

const getOrder = async({ id }) => {
    const request = await fetch(urls.getOrder, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(await AsyncStorage.getItem('token'))}`,
        },
        body: JSON.stringify({
            orderId:id
        }),
    });
    const response = await request.json();
    return {
        status: request.status,
        response
    }
}

const geTOrders = async({page}) => {
    const request = await fetch(urls.getOrders, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(await AsyncStorage.getItem('token'))}`,
        },
        body: JSON.stringify({
            page:page,
            limit:10
        }),
    })
        const response = await request.json();
        return {
            status: request.status,
            response
        }
};

const orderServices = Object.freeze({
  getOrder,  
  geTOrders
})
export default orderServices;