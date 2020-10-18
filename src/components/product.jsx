import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, AsyncStorage, ToastAndroid, Alert } from "react-native";
import Loader from './loader'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors';
import { shoppingCartServices } from '../services'
import formatAmount from '../helpers/formatAmount'
import { BadgeContext } from '../context'
export default function Product(props) {
  const [loading, setLoading]=useState(false)
  const [count, setCont]=useState(1);

  useEffect(()=>{
    props.cart?setCont(props.quantity):setCont(count)
  },[])
  const { Increment, Decrement }=useContext(BadgeContext)

  const showToastMessage = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
  }

  const addToShoppingCart=async ()=>{
      setLoading(true)
      
      try {
          const { status, response } = await shoppingCartServices.addProductShoppingCart({ id: props.id, count });
          setLoading(false)
         
          setCont(1)
          console.log({ status, response })
          if (status === 200) {
            if (response.error) {
              console.log('error1',response)
              showToastMessage(response.error.message)
            
              return;
            } else {
              console.log('AÑADIENDO')
              Increment({number:count})
              showToastMessage("Añadido a tu carrito con exito")               
            }
          } else {
            console.log('error2',response)
            showToastMessage(response.message)
          }
        } catch (error) {
          console.log('errorCatch',error)
          showToastMessage("Problemas al enviar o recibir los datos")
        }
  };
    
    const incrementProduct=async ()=>{
      try {
        const { status, response } = await shoppingCartServices.incrementProductShoppingCart({ id: props.id });
        if (status === 200) {
          if (response.error) {
            
            showToastMessage(response.error.message);
            return;
          } else {
            setCont(count+1);  
            Increment({number:1})   
            props.newTotal(response.cart.totalAmount)          
          }
        } else {
          showToastMessage(response.error);
        }
      } catch (error) {
        console.log(error)
        showToastMessage("Problemas al enviar o recibir los datos");
      }
  }
  
  const decrementProduct=async ()=>{
    console.log(props.id)
    try {
      const { status, response } = await shoppingCartServices.decrementProductShoppingCart({ id: props.id });
      
      if (status === 200) {
        if (response.error) {
          showToastMessage(response.error.message);
          return;
        } else {
          setCont(count-1);    
          console.log('AÑADIENDO')
          Decrement({number:1}) 
          props.newTotal(response.cart.totalAmount)                    
        }
      } else {
        showToastMessage(response.error);
      }
    } catch (error) {
      console.log(error)
      showToastMessage("Problemas al enviar o recibir los datos");
    }
  }

  const removeProduct = ()=>{
    console.log(props.id)
    Alert.alert(
      'Eliminar producto',
      `Esta seguro de eliminar ${props.name} de su carrito de compras?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        { 
          text: 'OK', 
          onPress: async () => {
            try {
              const { status, response } = await shoppingCartServices.removeProductShoppingCart({ id: props.id });
              if (status === 200) {
                if (response.error) {
                  showToastMessage(response.error.message);
                  return;
                } else {
                  Decrement({number:count})
                  props.setProduct(response.cart.items, response.cart.totalAmount)              
                }
              } else {
                showToastMessage(response.error);
              }
            } catch (error) {
              console.log(error)
              showToastMessage("Problemas al enviar o recibir los datos");
            }
          }}
      ],
      { cancelable: false }
    );
  }

    return (
      <>
     
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            <View style={{width: !props.cart?'40%':'50%',height: '100%', justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{width: "90%", height: "90%"}}

                    source={{uri: props.image}}
                    resizeMode={'contain'}
                />
            </View>
            <View style={{width: !props.cart?'60%':'40%',paddingHorizontal:"5%", paddingTop:10, height:'100%', justifyContent:'space-around', alignItems: 'flex-start'}}>
                <View style={{height:'10%', justifyContent:'center', alignItems:'center'}}>
                  <Text>{props.name}</Text>
                </View>
                <View style={{height:'10%', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:13}}>{`Precio: $${formatAmount(props.price)}`}</Text>
                </View>
                <View style={{width: '100%',height:'30%', justifyContent: 'center', }}>
                    <View style={{width:'100%', height:'80%', flexDirection:'row', }}>
                      <View style={{width:'30%',justifyContent:'center', alignItems: 'center'}} onPress={addToShoppingCart}>
                        {
                          count===1?null:
                          <TouchableOpacity onPress={!props.cart?()=>setCont(count-1):decrementProduct}>
                            <Ionicons
                              name={"ios-remove"}
                              size={30}
                              color={"gray"}  
                            />
                          </TouchableOpacity>
                          
                        }
                      </View>
                      <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:20}}>{count}</Text>
                      </View>
                      <TouchableOpacity style={{width:'30%',alignItems:'center', justifyContent:'center'}} onPress={!props.cart?()=>setCont(count+1):incrementProduct}>
                        <Ionicons
                          name={"ios-add"}
                          size={30}
                          color={"gray"}  
                        />
                      </TouchableOpacity>
                    </View>
                </View>
                {
                  !props.cart?
                  <TouchableOpacity style={styles.buttom} onPress={addToShoppingCart}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Añadir</Text>
                  </TouchableOpacity>
                  : null
                }
            </View>
            {
              !props.cart?null:
            <View style={{width: '10%',height: '100%', paddingRight:10, paddingTop:10, justifyContent:'flex-start', alignItems:'flex-end'}}>
              <TouchableOpacity style={{width:'100%',alignItems:'flex-end', justifyContent:'flex-end'}} onPress={removeProduct}>
                <Ionicons
                  name={"ios-trash"}
                  size={30}
                  color={"gray"}  
                />
              </TouchableOpacity>
            </View>
            }

            <Loader
                loading={loading}
            />
        </TouchableOpacity>
        </>
    )
}

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: 'gray',
        marginBottom:5,
        backgroundColor:'white',
        width: "90%",
        justifyContent: 'center',
        alignItems:'center',
        height: 150,
        zIndex:1,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width:2 },
        shadowOpacity: 2, 
        elevation: 2,
    },
    Image:{
        width:'100%',
        height:'50%'
    },
    text:{

    },
    buttom:{
        backgroundColor: Colors.tabIconSelected,
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }

})