import React, {  useContext } from 'react';
import {  View, TouchableOpacity,  Text,  Alert } from 'react-native';
import {colors} from '../constants'
import { AuthContext } from '../context'
export default function AccountScreen({ route, navigation }){
    const { signOut } = useContext(AuthContext);

    const gotOut = ()=>{
        Alert.alert(
            'Cerrar sesion',
            'Esta seguro de cerrar la sesion ahora?',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
              },
              { text: 'OK', onPress: signOut }
            ],
            { cancelable: false }
        );
    }
   
    return(
        <View style={{flex:1, padding:10}}>
            <TouchableOpacity style={{width:"100%", height: '10%', justifyContent:"center", borderBottomColor:colors.tabIconSelected, borderBottomWidth:3}} onPress={()=>{navigation.navigate('UpdateProfile')}}> 
                <Text style={{color:"#000", fontSize:20}}>Ediar Perfil</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={{width:"100%", height: '10%', justifyContent:"center", borderBottomColor:colors.tabIconSelected, borderBottomWidth:3}} onPress={()=>{navigation.navigate('UpdateProfile')}}> 
                <Text style={{color:"#000", fontSize:20}}>Mis Ordenes</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={{ height: '10%', width:'100%', justifyContent:'center', borderBottomWidth:3, borderBottomColor:colors.tabIconSelected }} onPress={gotOut}>
                <Text style={{color:"#000", fontSize:20 }}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    )
}
