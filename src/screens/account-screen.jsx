import React, { Component, useReducer, useEffect, useState, useContext } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image, SafeAreaView, FlatList,AsyncStorage } from 'react-native';
import {colors} from '../constants'
import { AuthContext } from '../context'
export default function AccountScreen({ route, navigation }){
    const { signOut } = useContext(AuthContext);

   
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor: colors.tabIconSelected, height: '10%', width:'90%', borderRadius:50, justifyContent:'center', alignItems:'center'}}
                onPress={signOut}
            >
              <Text style= {{color:'white', fontWeight:'bold'}}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    )
}
