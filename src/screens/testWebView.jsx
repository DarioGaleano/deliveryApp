import React, { useContext, useState, } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ToastAndroid, AsyncStorage } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { Loader } from '../components'
import { userServices } from '../services'
import WebView from 'react-native-webview'
import { urls } from '../constants/'
import { BadgeContext } from '../context'
export default function TestWebView({route, navigation}){

    const [loading, setLoading]=useState(false)
    const { Decrement } = useContext(BadgeContext)

    const onMessage = (event) =>{
        const data=JSON.parse(event.data)
        console.log('data', data)
        if(data.type==='loading')
        {
            setLoading(data.state.loading)
        }
        if(data.type==='response'){
            if(data.status===200){
                console.log(data.state)
                let quantity=0;
                data.state.items.forEach(item => quantity=quantity+item.quantity)
                Decrement({number:quantity})
                navigation.navigate('thanks', { paymentType:route.params.paymentType, orderId:data.state.orderId })
            }
            if(data.status===400){
                console.log(data.state.error)
            }
        }
    }

    console.log(`${urls.payment}?${route.params.paymentType==='Paypal'?'button=paypal':''}&name=${route.params.name}%20${route.params.lastName}&address=${route.params.address}%201&token=${route.params.token}`)

    return(
        <View style={{flex:1}}>
            <Loader loading={loading}/>
             <WebView 
                injectedJavaScript={`(function() {
                    window.postMessage = function(data) {                     
                        window.ReactNativeWebView.postMessage(data);
                    };
                })()`}
                onMessage={(event) => {  onMessage(event.nativeEvent) }}
                source={{ uri: `${urls.payment}?${route.params.paymentType==='Paypal'?'button=paypal':''}&name=${route.params.name}%20${route.params.lastName}&address=${route.params.address}%201&token=${route.params.token}` }} 
            />  
        </View>
    )
}