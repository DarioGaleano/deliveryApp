"use strict";
import React, { useEffect, useState, useReducer } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, AsyncStorage, FlatList } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { Loader } from '../components'
import { orderServices } from '../services'
import { data } from '../constants'
import formatAmount from '../helpers/formatAmount'

export default function OrderScreen ({ route, navigation }) { 

    const [loading, setLoading]=useState(false)
    const [page, setPage]=useState(1)
    const [orders, dispatch] = useReducer((myArray, { type, value }) => {
        switch (type) {
          case "add":
            return [...myArray, value];
          case "remove":
            return myArray.filter((_, index) => index !== value);
          case "removeAll":
            return [];
          default:
            return myArray;
        }
      }, []);    
    
    const showToastMessage = (message) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }

    const getOrders = async () =>{
        try{
            setLoading(true)
            const { status, response } = await orderServices.geTOrders({ page });
            setLoading(false)
            if(status===200)
            {
                if(response.error)
                {
                    console.log('error 1', response)
                } else {
                    dispatch(response.docs)
                    response.docs.forEach(element => {
                        dispatch({type:"add", value:element})
                    });
                    setPage(page+1)
                }
            }else{
                console.log('error 2', response)
            }
        }catch(e){
            setLoading(false)
            console.log('error catch', e)
        }
    }

    useEffect(()=>{
        async function init(){
            getOrders()
        }
        init()
    },[])


  return (
    
      <View style={{ alignItems: "center", justifyContent:"center", width: '100%', flex:1, paddingTop:30, paddingHorizontal:25 }}>
        <Loader loading={loading} />
        <View style={{width:"100%"}}>
            <Text>Selecciona una orden para ver la información detallada.</Text>
        </View>
        <View style={{width:"100%", height:60, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", borderBottomWidth:1}}>
            <View style={{width:"70%"}}><Text>Id de la orden</Text></View>
            <View style={{width:"30%", alignItems:"flex-end"}}><Text>Monto total</Text></View>
        </View>
        <FlatList
            data={orders}
            horizontal={false}
            contentContainerStyle={{justifyContent:'center', alignItems:'center', paddingTop:5, paddingBottom:5}}
            renderItem={ ({ item }) => 
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('OrderDetails', { order:item })}
                    style={{width:"100%", height:60, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", borderBottomWidth:1}}
                >
                    <View style={{width:"70%"}}><Text>{item.ref}</Text></View>
                    <View style={{width:"30%", alignItems:"flex-end"}}><Text>{`$${formatAmount(item.totalAmount)}`}</Text></View>
                </TouchableOpacity>
            }
            onEndReached={()=> getOrders()}
            onEndReachedThreshold={0.1}
            keyExtractor={item => item._id}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center"
  },
});
