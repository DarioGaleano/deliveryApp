"use strict";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ToastAndroid } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Loader } from '../../components'
import { userServices } from '../../services'
import { filterNumber, onBlurEmail, FormValidator } from '../../helpers'

export default function SignInScreen (props) { 

  const showToastMessage = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
  }

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument]= useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress]=useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  //Errors
  const [errorName, setErrorName]=useState('')
  const [errorLastName, setErrorLastName]=useState('')
  const [errorUserName, setErrorUserName]=useState('')
  const [errorEmail, setErrorEmail]=useState('')
  const [errorDocument, setErrorDocument]=useState('')
  const [errorPhoneNumber, setErrorPhoneNumber]=useState('')
  const [errorAddress, setErrorAddress]=useState('')
  const [errorPassword, setErrorPassword]=useState('')
  const [errorPasswordConfirm, setErrorPasswordConfirm]=useState('')

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
    {
      field: "password",
      method: 'isEmpty',
      validWhen: false,
      message: "Ingrese contraseña",
    },
    {
      field: "passwordConfirm",
      method: 'isEmpty',
      validWhen: false,
      message: "Confirme su contraseña",
    },
    {
      field: 'passwordConfirm',
      method: (passwordConfirm) => passwordConfirm===password? true : false,
      validWhen: true,
      message: 'Las contraseñas no coinciden.'
    },
  ]);

  const validate = () => {
    const validation = validator.validate({
      name,
      lastName,
      userName,
      email,
      document,
      phoneNumber,
      address,
      password,
      passwordConfirm
    })
    setErrorName(validation.name.message)
    setErrorLastName(validation.lastName.message)
    setErrorUserName(validation.userName.message)
    setErrorEmail(validation.email.message)
    setErrorDocument(validation.document.message)
    setErrorPhoneNumber(validation.phoneNumber.message)
    setErrorAddress(validation.address.message)
    setErrorPassword(validation.password.message)
    setErrorPasswordConfirm(validation.passwordConfirm.message)

    if(validation.isValid) 
      return true;

    return false;
  }

  const register = async () => {
    
    if (!validate())
      return false;
    
    try {
      setLoading(true)
      const { status, response } = await userServices.register({name, lastName, email:email.toLowerCase(), userName, phoneNumber, document, address, password});
      setLoading(false)
      console.log(response);

      if (status === 200) {
        if (response.error) {
          console.log(response.error);
          showToastMessage(response.error.message);
          return;
        } else {
          showToastMessage(`Bienvenido Sr(a) ${name}`);
          props.navigation.navigate("login");
        }
      } else {
        console.log(response);
        showToastMessage(response.error.message);
      }
    } catch (error) {
      await setLoading(false);
      console.log(error)
      showToastMessage("Problemas al enviar o recibir los datos");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          height:70,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
      { /*<Image
          style={styles.logo}
          source={require("../assets/images/logo-remeny.png")}
          />*/
          <Text>Market Place</Text>
      }
      </View>
      <View style={{ alignItems: "center", width: '100%', justifyContent: 'space-around'}}>
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
          placeholder={"Nombre de usuario"}
          placeholderTextColor="#a4a4a4"
          
        />
        { errorUserName===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorUserName}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorName(name!==''?'':'Ingrese nombre')}
          onChangeText={text => setName(text)}
          placeholder={"Nombre"}
          placeholderTextColor="#a4a4a4"
        />
        { errorName===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorName}</Text> }
        <TextInput
          style={styles.input}
          onBlur={() => setErrorLastName(lastName!==''?'':'Ingrese apellido')}
          onChangeText={text => setLastName(text)}
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
        <View style={styles.viewPasswordInput}>
          <TextInput
            style={styles.inputPassword}
            onBlur={() => setErrorPassword(password!==''?'':'Ingrese contraseña')}
            placeholderTextColor="#a4a4a4"
            onChangeText={text => setPassword(text)}
            placeholder={"Contraseña"}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <View style={styles.icon}>
              <Ionicons
                name={passwordVisible ? "ios-eye-off" : "ios-eye"}
                size={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
        { errorPassword===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorPassword}</Text> }
        <View style={styles.viewPasswordInput}>
          <TextInput
            style={styles.inputPassword}
            placeholderTextColor="#a4a4a4"
            onBlur={() => setErrorPasswordConfirm(passwordConfirm===''?'Valide su contraseña': password!==passwordConfirm?'Las contraseñas deben coincidir':'')}
            onChangeText={text => setPasswordConfirm(text)}
            placeholder={"Confirmar contraseña"}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setPasswordVisible(!passwordVisible)
            }
          >
            <View style={styles.icon}>
              <Ionicons
                name={passwordVisible ? "ios-eye-off" : "ios-eye"}
                size={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
        { errorPasswordConfirm===''? null : <Text style={{fontSize:12, color:"tomato", width:"80%", paddingLeft:10}}>{errorPasswordConfirm}</Text> }
        <View style={{ width: "100%", alignItems: "center", paddingTop:20 }}>
        <TouchableOpacity style={styles.sendButton} onPress={register}>
          <Text style={styles.textButton}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop:20
        }}
      >
        <Text style={{ color: "#40434E" }}>Al continuar esta aceptando</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#40434E" }}>los </Text>
          <Text style={styles.conditionsText}>terminos y condiciones</Text>
        </View>
        <Text style={{ color: "#40434E" }}>de uso y la politica de privacidad.</Text>
      </View>
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
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 30
  },
  sendButton: {
    width: 250,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbd30a",
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
  inputPassword: {
    paddingLeft: 10,
    width: "80%",
    height: 40,
  },
  textButton: {
    fontWeight: "bold",
    color: "blue"
  },
  pickers: {
    width: '80%',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerView: {
    borderWidth: 1,
    borderColor: "#a4a4a4",
    borderRadius: 5,
    width: 140,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerStyle: {
    width: "100%",
    color: "#344953"
  },
  datePicker: {
    width: 140,
    height: 40,
    borderColor: "#a4a4a4",
    borderRadius: 5
  },
  phoneView: {
    height: 40,
    alignItems: "center",
    width: '80%',
    justifyContent: "center",
    flexDirection: "row",
  },
  inputPhone: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#a4a4a4",
    width: "80%",
    height: 40,
    borderLeftWidth: 0,
    borderTopRightRadius:5,
    borderBottomRightRadius: 5,
  },
  selectCode: {
    width: "20%",
    height: 40,
    borderWidth: 1,
    borderColor: "#a4a4a4",
    borderBottomLeftRadius:5,
    borderTopLeftRadius:5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectGender: {
    width: "100%",
    height: 40,
    borderColor: "#a4a4a4",
    justifyContent: "center",
    alignItems: "center"
  },
  viewPasswordInput: {
    width: '80%',
    flexDirection: "row",
    borderColor: "#a4a4a4",
    borderWidth: 1,
    borderRadius: 5,
    marginTop:5
  },
  button: {
    width: "20%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    justifyContent: "center",
    alignItems: "center"
  },
  conditionsText: {
    color: "blue",
    textDecorationLine: "underline"
  },
});
