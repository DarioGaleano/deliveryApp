import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {  ButtonBottom } from '../components'
import formatAmount from '../helpers/formatAmount'


export default function OrderDetails({route, navigation}){

    const[name, setName]=useState('')
    const[address, setAdress]=useState('')
    const[ref, setRef]=useState('')
    const[products, setProducts]=useState([])
    const[totalAmount, setTotalAmount]=useState(0)

    useEffect(()=>{
        async function init(){
            console.log('order', route.params.order)
            setName(route.params.order.shipping.name)
            setAdress(route.params.order.shipping.address)
            setRef(route.params.order.payment.ref)
            setProducts(route.params.order.products)
            setTotalAmount(route.params.order.totalAmount)
        }
        init()
    },[])

    return(
        <View style={{flex:1, display:"flex", alignItems:"center", paddingHorizontal:20, paddingTop:30}}>
            <View style={styles.boxShadow}>
                <View style={{flexDirection:"row", height:20, }}>
                    <Text style={{fontSize:12}}>{`Nombre: ${name}`}</Text>
                </View>
                <View style={{flexDirection:"row", height:20, }}>
                    <Text style={{fontSize:12}}>{`Dirección: ${address}`}</Text>
                </View>
                <View style={{flexDirection:"row", height:20,}}>
                    <Text style={{fontSize:12}}>{`Referencia Paypal: #${ref}`}</Text>
                </View>
                <View style={{flexDirection:"row", height:20, }}>
                    <Text style={{fontSize:12}}>{`Estatus: ${route.params.order.status}`}</Text>
                </View>
            </View>
            <ScrollView>
              <View style={[styles.boxShadow, {minHeight:200, paddingBottom:20}]}>
                <View style={{width:"100%",height:30, flexDirection:"row", borderBottomColor:"#CCCCCC", borderBottomWidth:1, alignItems:"flex-end"}}>
                    <View style={{width:"20%",}}><Text>Cant</Text></View>
                    <View style={{width:"50%",}}><Text>Producto</Text></View>
                    <View style={{width:"30%", alignItems:"flex-end"}}><Text>Monto</Text></View>
                </View>
                {
                    products.map((product, index)=>(
                        <View key={index} style={{width:"100%",height:40, flexDirection:"row", borderBottomColor:"#CCCCCC", borderBottomWidth:1, alignItems:"flex-end"}}>
                            <View style={{width:"20%",}}><Text>{product.quantity}</Text></View>
                            <View style={{width:"50%",}}><Text>{product.product.name}</Text></View>
                            <View style={{width:"30%", alignItems:"flex-end"}}><Text>{`$${formatAmount(product.product.price*product.quantity)}`}</Text></View>
                        </View>
                    ))
                    
                }
                <View style={{width:"100%", flexDirection:"row", height:30, alignItems:"flex-end"}}>
                    <View style={{width:"20%",}}></View>
                    <View style={{width:"50%",}}><Text style={{fontWeight:"bold"}}>Total:</Text></View>
                    <View style={{width:"30%", alignItems:"flex-end"}}><Text>{`$${formatAmount(totalAmount)}`}</Text></View>
                </View>
                </View>
            </ScrollView>
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