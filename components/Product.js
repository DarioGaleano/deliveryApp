import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";

export default function Product(props) {
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
                <TouchableOpacity style={styles.buttom}>
                    <Text>Añadir</Text>
                </TouchableOpacity>
            </View>
            </View>
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
        backgroundColor: '#fbd30a',
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }

})