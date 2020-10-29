"use strict";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ToastAndroid, AsyncStorage, } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { Loader } from '../components'
import { userServices } from '../services'
import { filterNumber, onBlurEmail, FormValidator } from '../helpers'

const validator = new FormValidator([
  {
    field: "name",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese nombre",
  },
  {
    field: "lastName",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese apellido",
  },
  {
    field: "userName",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese nombre de usuario",
  },
  
  {
    field: "email",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese email",
  },
  {
    field: "email",
    method: "isEmail",
    validWhen: true,
    message: "Email invalido",
  },
  {
    field: "document",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese numero de documento",
  },
  {
    field: "phoneNumber",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese numero de telefono",
  },
  {
    field: "address",
    method: 'isEmpty',
    validWhen: false,
    message: "Ingrese dirección",
  },
])

export default function UpdateProfile ({ route, navigation }) { 

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument]= useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress]=useState('');
  const [loading, setLoading] = useState(false);

  const [errorName, setErrorName]=useState('')
  const [errorLastName, setErrorLastName]=useState('')
  const [errorUserName, setErrorUserName]=useState('')
  const [errorEmail, setErrorEmail]=useState('')
  const [errorDocument, setErrorDocument]=useState('')
  const [errorPhoneNumber, setErrorPhoneNumber]=useState('')
  const [errorAddress, setErrorAddress]=useState('')


  const showToastMessage = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
  }

  useEffect(()=>{
    async function init(){
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      setName(user.name)
      setLastName(user.lastName)
      setUserName(user.userName)
      setAddress(user.address)
      setEmail(user.email)
      setDocument(user.document)
      setPhoneNumber(user.phoneNumber)
    }
    init()
  },[])

  const validate = () => {
    const validation = validator.validate({
      name,
      lastName,
      userName,
      email,
      document,
      phoneNumber,
      address,
    })
    setErrorName(validation.name.message)
    setErrorLastName(validation.lastName.message)
    setErrorUserName(validation.userName.message)
    setErrorEmail(validation.email.message)
    setErrorDocument(validation.document.message)
    setErrorPhoneNumber(validation.phoneNumber.message)
    setErrorAddress(validation.address.message)

    if(validation.isValid) 
      return true;

    return false;
  };

  const register = async () => {
    if(!validate())
      return;

    try{
      setLoading(true)
      const { status, response } = await userServices.updateUser({ email, userName, name, lastName, document, address, phoneNumber });
      setLoading(false)
      console.log('resp', response)
      if(status===200){
        if(response.error)
        {
          showToastMessage(response.error.message)
        }
        else {
          await AsyncStorage.setItem('user', JSON.stringify({ email, userName, name, lastName, document, address, phoneNumber }))
          showToastMessage('Datos de usuario actualizados')
          navigation.goBack()
        }
      }
      else {
        showToastMessage(response.error)
      }
    }catch(e){
      setLoading(false)
      console.log(e)
    }
    
  };

  return (
    
      <ScrollView contentContainerStyle={{ alignItems: "center", width: '100%', flex:1, paddingTop:50 }}>
      <TextInput
          style={styles.input}
          textContentType={"emailAddress"}
          onBlur={() => setErrorEmail(onBlurEmail(email))}
          value={email}
          onChangeText={(text)=> setEmail(text.trim())}
          placeholder={"Correo electronico"}
          placeholderTextColor="#a4a4a4"
        />
        { errorEmail===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorEmail}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorUserName(userName!==''?'':'Ingrese nombre de usuario')}
          onChangeText={text => setUserName(text)}
          value={userName}
          placeholder={"Nombre de usuario"}
          placeholderTextColor="#a4a4a4"
          
        />
        { errorUserName===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorUserName}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorName(name!==''?'':'Ingrese nombre')}
          value={name}
          onChangeText={text => setName(text)}
          placeholder={"Nombre"}
          placeholderTextColor="#a4a4a4"
        />
        { errorName===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorName}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorLastName(lastName!==''?'':'Ingrese apellido')}
          onChangeText={text => setLastName(text)}
          value={lastName}
          placeholder={"Apellido"}
          placeholderTextColor="#a4a4a4"
        />
        { errorLastName===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorLastName}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorDocument(document!==''?'':'Ingrese documento')}
          value={document}
          onChangeText={text => setDocument(filterNumber(text))}
          placeholder={"Cedula"}
          keyboardType={"phone-pad"}
          placeholderTextColor="#a4a4a4"
        />
        { errorDocument===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorDocument}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorAddress(address!==''?'':'Ingrese dirección')}
          onChangeText={text => setAddress(text)}
          value={address}
          placeholder={"Direccion"}
          placeholderTextColor="#a4a4a4"
        />
        { errorAddress===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorAddress}</Text> }
          <TextInput
            style={styles.input}
            onBlur={() => setErrorPhoneNumber(phoneNumber!==''?'':'Ingrese numero de telefono')}
            placeholder="Numero de telefono"
            value={phoneNumber}
            placeholderTextColor="#a4a4a4"
            keyboardType={"phone-pad"}
            maxLength={11}
            onChangeText={text => setPhoneNumber(filterNumber(text))}
          />
          { errorPhoneNumber===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorPhoneNumber}</Text> }
        <View style={{ width: "100%", alignItems: "center", paddingTop:20 }}>
          <TouchableOpacity style={styles.sendButton} onPress={register}>
            <Text style={styles.textButton}>Actualizar</Text>
          </TouchableOpacity>
        </View>
        <Loader loading={loading} />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center"
  },
  sendButton: {
    width: 250,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
    borderRadius: 10
  },
  input: {
    paddingLeft: 10,
    width: '80%',
    height: 40,
    borderColor: "#a4a4a4",
    borderWidth: 1,
    borderRadius: 5,
    marginTop:5
  },
  textButton: {
    fontWeight: "bold",
    color: "#FFF"
  },
});
