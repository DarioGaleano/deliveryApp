import React, { Component, useReducer, useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image, SafeAreaView, FlatList,AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import config from '../config'
import Product from '../components/Product'
import Colors from '../constants/Colors';
import Loader from '../components/Loader'
import ButtonBottom from '../components/ButtonBottom'

export default class ShoppinCartScreen extends Component{


    constructor(props){
      super(props)
      this.state={
        products:[],
        loading:false,
        isFetching:false,
        total:''
      }
    }
    getProducts= async () => {
        await this.setState({Loading:true})
        try {
          await this.setState({loading:true})
          let request = await fetch(config.endpoint + "/getproductshoppingcart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await AsyncStorage.getItem("token"))
            },
          });

          await this.setState({loading:false})

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
                await this.setState({total: response.totalAmount})
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

    setProduct=async(data, newTotal)=>{
      await this.setState({total:newTotal})
      await this.setState({products:data})
    }
    setNewTotal=async(newTotal)=>{
      console.log("newTotal",newTotal)
      await this.setState({total:newTotal})
    }
    componentWillMount(){
      this.focusListener =  this.props.navigation.addListener("didFocus", async () => {
        this.getProducts()
        console.log("Focused")
        
      })
    }

    render(){
      const {products, loading}= this.state
      return(
      <View style={styles.container}>
          <View style={{justifyContent:'space-around', alignItems:'center', width:'100%', height:'20%', flexDirection:'row'}}>
              <View style={{width:'30%', height: '70%', }}>
                  <Image
                      style={{width:'100%', height: '100%'}}
                      resizeMode={'contain'}
                      source={require("../assets/images/shopping-cart.png")}
                  />
              </View>
              <View style={{width:'70%', height: '70%', padding:10}}>
                <View>
                  <Text>Total a pagar:  {this.state.total}</Text>
                </View>
              </View>
              
          </View>
          <View style={{width:'100%', height: '70%',}}>
          <FlatList
            data={ products[0]!=={}? products : null }
            horizontal={false}
            contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
            renderItem={ (item) => 
              <Product 
                name={item.item.product.name} 
                price={item.item.product.price}
                image={item.item.product.image}
                id={item.item._id}
                cart={true}
                quantity={item.item.quantity}
                setProduct={this.setProduct}
                newTotal={this.setNewTotal}
              />
            }
            keyExtractor={item=> item._id}
          />
          </View>
          
          <ButtonBottom
            onPress={()=>this.props.navigation.navigate('payment',{totalAmount:this.state.total})}
            text={'Realizar Compra'}
          />
          <Loader
            loading={loading}
          />
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