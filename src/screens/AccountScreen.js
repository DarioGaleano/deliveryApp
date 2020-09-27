import React, { Component, useReducer, useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image, SafeAreaView, FlatList,AsyncStorage } from 'react-native';
import {colors} from '../constants/'

export default function AccountScreen(props){

    const closeSesion=async ()=>{
        await AsyncStorage.removeItem('token');
        props.navigation.navigate('Auth')
    }
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor: colors.tabIconSelected, height: '10%', width:'90%', borderRadius:50, justifyContent:'center', alignItems:'center'}}
                onPress={closeSesion}
            >
              <Text style= {{color:'white', fontWeight:'bold'}}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    )
}

AccountScreen.navigationOptions = {
    header: null,
};