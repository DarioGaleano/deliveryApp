import React, { useState } from "react";
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
	            quantity: 1
              })
            });
      
            const response = await request.json();
            console.log("AQUI",response)
            if (request.status === 200) {
              if (response.error) {
                setLoading(false)
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
                setLoading(false) 
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
              setLoading(false)
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
            setLoading(false)
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
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            <View style={{width: '40%',height: '100%', justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{width: "90%", height: "90%"}}

                    source={{uri: props.image}}
                    resizeMode={'contain'}
                />
            </View>
            <View style={{width: '60%',paddingHorizontal:"5%", height:'100%', justifyContent:'space-around', alignItems: 'flex-start'}}>
                <Text>{props.name}</Text>
                <Text>Precio: {props.price}</Text>
                <View style={{width: '100%',height:'30%', justifyContent: 'center'}}>
                  {
                    props.addMore?
                    <View style={{width:'100%', height:'80%', flexDirection:'row'}}>
                      <View style={{width:'30%',justifyContent:'center', alignItems: 'center'}} onPress={addToShoppingCart}>
                        {
                          count===1?
                          <TouchableOpacity onPress={()=>props.remove(props.id)}>
                            <Ionicons
                              name={"ios-trash"}
                              size={30}
                              color={"gray"}  
                            />
                          </TouchableOpacity>
                          
                          :
                          <TouchableOpacity onPress={()=>setCont(count-1)}>
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
                      <TouchableOpacity style={{width:'30%',alignItems:'center', justifyContent:'center'}} onPress={()=> setCont(count+1)}>
                        <Ionicons
                          name={"ios-add"}
                          size={30}
                          color={"gray"}  
                        />
                      </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={styles.buttom} onPress={addToShoppingCart}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Añadir</Text>
                    </TouchableOpacity>
                  }
                </View>
            </View>
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
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }

})