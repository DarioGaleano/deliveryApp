import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';


export default function SearchBar(props){

    const [textInput, setTexInput]=useState(props.setTexInput);

    return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button]} onPress={props.goBack}>
          <View style={styles.icon}>
            {
              props.arrowBack?<Icon 
                name={'ios-arrow-back'}
                size= {20}  
                color="black"
              />:null
            } 
          </View>
      </TouchableOpacity>
        <TextInput
            style={styles.input}
            onChangeText={(text) => props.onChangeText(text)}
            placeholder={'Buscar producto'}
            placeholderTextColor="#a4a4a4"
            onSubmitEditing={()=>props.startSearch(true)}                        
            onKeyPress={ (event) => {
                if(event.nativeEvent.key == "Enter"){
                    //console.log(event.nativeEvent.key) //called when multiline is true
                    // this.signIn();
                } 
                else {
                    //console.log('Something else Pressed') 
                }
            }}
        />
        <TouchableOpacity style={[styles.button]} onPress={()=>props.startSearch(true)}>
          <View style={styles.icon}>
            <Icon 
              name={'ios-search'}
              size= {20}  
              color="black"
            />
              
          </View>
      </TouchableOpacity>
    </View>
    )
}

const styles=StyleSheet.create({
  container: {
    justifyContent:'center', 
    alignItems:'center', 
    flexDirection:'row',
    width: '100%',
    height: 40,
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
  },
  input:{
    width: "80%",
    height: '100%', 
  },
  button:{
    width:"10%",
    height: "100%",
    justifyContent:'center',
    alignItems: 'center', 
  },
  icon:{
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
  },
 
  text: {
    color: 'white',
  }
})
