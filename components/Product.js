import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, AsyncStorage } from "react-native";
import config from '../config/'
import Loader from '../components/Loader'
import Toast from "react-native-root-toast";
import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors';

export default function Product(props) {
    const [loading, setLoading]=useState(false)
    const [count, setCont]=useState(1);

    const addToShoppingCart=async ()=>{
        await setLoading(true)
        console.log("TOKEEEN",await AsyncStorage.getItem("token"))
        try {
            let request = await fetch(config.endpoint + "/addproductshoppingcart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
              },
              body: JSON.stringify({
                product:props.id,
	            quantity: count
              })
            });
            await setLoading(false)
            await setCont(1)
            const response = await request.json();
            console.log("AQUI",response)
            if (request.status === 200) {
              if (response.error) {
                Toast.show(response.error.message, {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0
                });
                return;
              } else {
                Toast.show("Añadido a tu carrito con exito", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0
                  });               
              }
            } else {
              Toast.show(response.error, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
              });
            }
          } catch (error) {
            console.log(error)
            Toast.show("Problemas al enviar o recibir los datos", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
            });
          }
        };

    
    incrementProduct=async ()=>{
      console.log(props.id)
      try {
        let request = await fetch(config.endpoint + "/incrementproductshoppingcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
          },
          body: JSON.stringify({
            item:props.id,
          })
        });

        const response = await request.json();
        console.log("AQUI",response)
        if (request.status === 200) {
          if (response.error) {
            Toast.show(response.error.message, {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
            });
            return;
          } else {
            await setCont(count+1);               
          }
        } else {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        }
      } catch (error) {
        console.log(error)
        Toast.show("Problemas al enviar o recibir los datos", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
      }
  }
  
  decrementProduct=async ()=>{
    console.log(props.id)
    try {
      let request = await fetch(config.endpoint + "/decrementproductshoppingcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
        },
        body: JSON.stringify({
          item:props.id,
        })
      });

      const response = await request.json();
      console.log("AQUI",response)
      if (request.status === 200) {
        if (response.error) {
          Toast.show(response.error.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
          return;
        } else {
          await setCont(count-1);               
        }
      } else {
        Toast.show(response.error, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
      }
    } catch (error) {
      console.log(error)
      Toast.show("Problemas al enviar o recibir los datos", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
}

    removeProduct=async ()=>{
      console.log(props.id)
      try {
        let request = await fetch(config.endpoint + "/removeproductshoppingcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
          },
          body: JSON.stringify({
            item:props.id,
          })
        });

        const response = await request.json();
        console.log("AQUI",response)
        if (request.status === 200) {
          if (response.error) {
            Toast.show(response.error.message, {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
            });
            return;
          } else {
            props.setProduct(response.cart.items)              
          }
        } else {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        }
      } catch (error) {
        console.log(error)
        Toast.show("Problemas al enviar o recibir los datos", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
      }
    }

    useEffect(()=>{
      props.cart?setCont(props.quantity):setCont(count)
    },[])
    

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            <View style={{width: !props.cart?'40%':'50%',height: '100%', justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{width: "90%", height: "90%"}}

                    source={{uri: props.image}}
                    resizeMode={'contain'}
                />
            </View>
            <View style={{width: !props.cart?'60%':'40%',paddingHorizontal:"5%", height:'100%', justifyContent:'space-around', alignItems: 'flex-start'}}>
                <View style={{height:'10%', justifyContent:'center', alignItems:'center'}}>
                  <Text>{props.name}</Text>
                </View>
                <View style={{height:'10%', justifyContent:'center', alignItems:'center'}}>
                  <Text>Precio: {props.price}</Text>
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
    )
}

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: 'gray',
        marginBottom:5,
        width: "100%",
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