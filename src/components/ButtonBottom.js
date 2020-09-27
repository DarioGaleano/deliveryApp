import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import Colors from '../constants/Colors'

export default function ButtonBottom(props){

    return(
        <View style={{width:'100%', height: 60,justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor: Colors.tabIconSelected, height: '100%', width:'90%', borderRadius:50, justifyContent:'center', alignItems:'center'}}
                onPress={props.onPress}
            >
                <Text style= {{color:'white', fontWeight:'bold'}}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}