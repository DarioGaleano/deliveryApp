import React, { Component, useReducer, useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image, SafeAreaView, FlatList,AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import config from '../config'
import Product from '../components/Product'
import Colors from '../constants/Colors';

export default function ShoppinCartScreen(props){

    const [products, dispatch]=useReducer((myArray, { type, value }) => {
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
    }, [])

    const getProducts= async () => {
        setLoading(true)
        setIsFetching(true)
        try {
          let request = await fetch(config.endpoint + "/getproductshoppingcart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
            },
          });
    
          const response = await request.json();
          console.log("AQUI SI",response)
          if (request.status === 200) {
            if (response.error) {
              setLoading(false )
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
                response.items.forEach(element => {
                    dispatch({type:"add", value:element})
                });
            }
          } else {
            setLoading(false)
            Toast.show(response.error.message, {
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
        console.log(products)
        setIsFetching(false)
    };

    const[Loading,setLoading]=useState(false)
    const[isFetching, setIsFetching]=useState(false)
    useEffect(()=>{getProducts()},[])

    return(
    <View style={styles.container}>
        <View style={{justifyContent:'space-around', alignItems:'center', width:'100%', height:'20%'}}>
            <View style={{width:'100%', height:'30%',backgroundColor: Colors.tabIconSelected,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontWeight:'bold'}}>Carrito de Compras</Text>
            </View>
            <View style={{width:'100%', height: '70%'}}>
                <Image
                    style={{width:'100%', height: '100%'}}
                    resizeMode={'contain'}
                    source={require("../assets/images/shopping-cart.png")}
                />
            </View>
             
        </View>
        <View style={{width:'100%', height: '70%',}}>
        <FlatList
          data={ products[0]!=={}? products : null }
          horizontal={false}
          renderItem={ (item) => 
            <Product 
              name={item.item.product.name} 
              price={item.item.product.price}
              image={item.item.product.image}
              id={item.item._id}
              addMore={true}
            />
          }
          keyExtractor={item=> item._id}
        />
        </View>
        <View style={{width:'100%', height: '14%',justifyContent:'center', alignItems:'center', }}>
          <TouchableOpacity style={{backgroundColor: Colors.tabIconSelected, height: '50%', width:'90%', borderRadius:50, justifyContent:'center', alignItems:'center'}}>
              <Text style= {{color:'white', fontWeight:'bold'}}>Realizar Compra</Text>
          </TouchableOpacity>
        </View>
    </View>)
}

ShoppinCartScreen.navigationOptions = {
    header: null,
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:'8%'
    },
})