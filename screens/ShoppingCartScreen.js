import React, { Component, useReducer, useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image, SafeAreaView, FlatList,AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import config from '../config'
import Product from '../components/Product'
import Colors from '../constants/Colors';

export default class ShoppinCartScreen extends Component{


    constructor(props){
      super(props)
      this.state={
        products:[],
        Loading:false,
        isFetching:false
      }
    }
    getProducts= async () => {
        await this.setState({Loading:true})
        try {
          let request = await fetch(config.endpoint + "/getproductshoppingcart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
            },
          });

          await this.setState({Loading:true})

          const response = await request.json();
          console.log("AQUI SI",response)
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
              let productsAux=[];
                response.items.forEach(element => {
                    productsAux.push(element)
                });
                await this.setState({products: productsAux})
            }
          } else {
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
          Toast.show("Problemas al enviar o recibir los datos", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
        }
        console.log(this.state.products)
    };

    setProduct=async(data)=>{
      await this.setState({products:data})
    }
    componentWillMount(){
      this.focusListener =  this.props.navigation.addListener("didFocus", async () => {
        this.getProducts()
        console.log("Focused")

        
      })
    }

    render(){
      const {products}= this.state
      return(
      <View style={styles.container}>
          <View style={{justifyContent:'space-around', alignItems:'center', width:'100%', height:'20%'}}>
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
                cart={true}
                quantity={item.item.quantity}
                setProduct={this.setProduct}
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
}

ShoppinCartScreen.navigationOptions = {
  title: 'Carrito de Compras',
  headerStyle: {
    backgroundColor: Colors.tabIconSelected,
  },
  headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign:"center", 
          flex:1 
        },
  headerRight: (
    <View>
    </View>
  ),
  headerLeft: (
    <View>
    </View>
  ),
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:'8%',
        marginHorizontal:10,

    },
})