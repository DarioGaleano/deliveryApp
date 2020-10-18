import React, { useEffect, useState, useCallback} from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ToastAndroid, AsyncStorage } from "react-native";
import { orderServices } from '../services'
import { useFocusEffect } from "@react-navigation/native";
import { Loader, ButtonBottom } from '../components'
import formatAmount from '../helpers/formatAmount'


export default function ThankyouPage({route, navigation}){

    const[name, setName]=useState('')
    const[address, setAdress]=useState('')
    const[ref, setRef]=useState('')
    const[products, setProducts]=useState([])
    const[totalAmount, setTotalAmount]=useState(0)

    const [error, setError]=useState(false)
    const [loading, setLoading]=useState(false)

    const showToastMessage = (message) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }

    useFocusEffect(
        useCallback(() => {
          let isActive = true;
          const fetchData = async () => {
            try {
              if (isActive) {
                setLoading(true);
                const { status, response } = await orderServices.getOrder({id:route.params.orderId})
                setLoading(false);
                if (status === 200) {
                  if (response.error) {
                    showToastMessage(response.error.message);
                    return;
                  } else {
                    console.log({order:response})
                    await AsyncStorage.setItem('orderId', JSON.stringify(route.params.orderId))
                    setName(response.shipping.name)
                    setAdress(response.shipping.address)
                    setRef(response.payment.ref)
                    setProducts(response.products)
                    setTotalAmount(response.totalAmount)
                    setError(false)
                  }
                } else {
                  showToastMessage(response.error.message);
                  setError(true)
                  console.log(response.error)
                }
              }
            } catch (e) {
              // Handle error
            }
          };
          fetchData();
          return () => {
            isActive = false;
          };
        }, [])
    );

    return(
        <View style={{flex:1, display:"flex", alignItems:"center", paddingHorizontal:20}}>
            <Loader loading={loading} />
            {
                loading? null:
            <>
            <View style={{height:60, justifyContent:"center"}}>            
                <Text style={{fontSize:24}}>Gracias por su compra</Text>
            </View>
            <View style={styles.boxShadow}>
                <View style={{flexDirection:"row", height:20, }}>
                    <Text style={{fontSize:12}}>{`Nombre: ${name}`}</Text>
                </View>
                <View style={{flexDirection:"row", height:20, }}>
                    <Text style={{fontSize:12}}>{`Dirección: ${address}`}</Text>
                </View>
                <View style={{flexDirection:"row", height:20, }}>
                    <Text style={{fontSize:12}}>{`Tipo de pago: ${route.params.paymentType}`}</Text>
                </View>
                <View style={{flexDirection:"row", height:20,}}>
                    <Text style={{fontSize:12}}>{`Referencia Paypal: #${ref}`}</Text>
                </View>
            </View>
            <ScrollView>
              <View style={[styles.boxShadow, {minHeight:200, paddingBottom:20}]}>
                <View style={{width:"100%",height:30, flexDirection:"row", borderBottomColor:"#CCCCCC", borderBottomWidth:1, alignItems:"flex-end"}}>
                    <View style={{width:"20%",}}><Text>Cant</Text></View>
                    <View style={{width:"50%",}}><Text>Producto</Text></View>
                    <View style={{width:"30%",}}><Text>Monto</Text></View>
                </View>
                {
                    products.map((product, index)=>(
                        <View key={index} style={{width:"100%",height:40, flexDirection:"row", borderBottomColor:"#CCCCCC", borderBottomWidth:1, alignItems:"flex-end"}}>
                            <View style={{width:"20%",}}><Text>{product.quantity}</Text></View>
                            <View style={{width:"50%",}}><Text>{product.product.name}</Text></View>
                            <View style={{width:"30%",}}><Text>{`$${formatAmount(product.product.price*product.quantity)}`}</Text></View>
                        </View>
                    ))
                    
                }
                <View style={{width:"100%", flexDirection:"row", height:30, alignItems:"flex-end"}}>
                    <View style={{width:"20%",}}></View>
                    <View style={{width:"50%",}}><Text style={{fontWeight:"bold"}}>Total:</Text></View>
                    <View style={{width:"30%",}}><Text>{`$${formatAmount(totalAmount)}`}</Text></View>
                </View>
                </View>
            </ScrollView>
            <View style={{height:50, width:"100%", justifyContent:"center"}}>
                <ButtonBottom text={"Finalizar"}
                    style={{width:"80%", height:40, justifyContent:"center", alignitems:"center", }}
                />
            </View>
            </>
            }
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop: Platform.OS === "android" ? 25 : 0,
        paddingHorizontal:25,
    },
    boxShadow:{
        padding:10,
        flexDirection:'column',
        width:'100%',
        borderRadius:10,
        backgroundColor:'white',
        zIndex:1,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width:2 },
        shadowOpacity: 2, 
        elevation: 2,
        marginBottom:10
    },
})