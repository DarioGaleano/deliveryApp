import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { FormValidator } from '../../helpers'
import { Ionicons } from "@expo/vector-icons";



export default function ForgotPasswordScreen(props){

    const [token, setToken]=useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [errorToken, setErrorToken]=useState('')
    const [errorPassword, setErrorPassword]=useState('')
    const [errorPasswordConfirm, setErrorPasswordConfirm]=useState('')

    const [passwordVisible, setPasswordVisible] = useState(false);

    const validator=new FormValidator([
      {
        field: "token",
        method: 'isEmpty',
        validWhen: false,
        message: "Ingrese codigo de validación",
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
        message: "Valide su contraseña",
      },
      {
        field: 'passwordConfirm',
        method: (passwordConfirm) => passwordConfirm===password? true : false,
        validWhen: true,
        message: 'Las contraseñas deben coincidir'
      },
    ])

    const validate = () => {
      const validation = validator.validate({
        token,
        password,
        passwordConfirm
      })
      setErrorToken(validation.token.message)
      setErrorPassword(validation.password.message)
      setErrorPasswordConfirm(validation.passwordConfirm.message)

      if(validation.isValid)
        return true;
      return false;
    }
    
    const onSubmit = () =>{
      if(!validate())
        return;
      //fetch here
        props.navigation.navigate("login")
    }


    return (
      <View style={styles.container}>
         <ScrollView>
          <KeyboardAvoidingView >
            <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text>Market Place</Text>
            </View>
            <View style={{  width: '100%', height: 360, justifyContent:"center", alignItems:"center" }}>
              <TextInput
                style={styles.input}
                onBlur={() => setErrorToken(token!==''?'': 'Ingrese codigo de validación')}
                onChangeText={text => setToken({ text })}
                placeholder={"Ingresar codigo"}
              />
              { errorToken===''? null : <Text style={{fontSize:12, color:"tomato", width:"100%", paddingLeft:10}}>{errorToken}</Text> }
              <View style={styles.viewPasswordInput}>
                <TextInput
                  style={styles.inputPassword}
                  onBlur={() => setErrorPassword(password!==''?'':'Ingrese contraseña')}
                  placeholderTextColor="#a4a4a4"
                  onChangeText={text => setPassword(text)}
                  placeholder={"Contraseña"}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity style={styles.button} onPress={() => setPasswordVisible(!passwordVisible)}>
                  <View style={styles.icon}>
                    <Ionicons name={passwordVisible ? "ios-eye-off" : "ios-eye"} size={20} color="black"/>
                  </View>
                </TouchableOpacity>
              </View>
              { errorPassword===''? null : <Text style={{fontSize:12, color:"tomato", width:"100%", paddingLeft:10}}>{errorPassword}</Text> }
              <View style={styles.viewPasswordInput}>
                <TextInput
                  style={styles.inputPassword}
                  placeholderTextColor="#a4a4a4"
                  onBlur={() => setErrorPasswordConfirm(passwordConfirm===''?'Valide su contraseña': password!==passwordConfirm?'Las contraseñas deben coincidir':'')}
                  onChangeText={text => setPasswordConfirm(text)}
                  placeholder={"Confirmar contraseña"}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity style={styles.button} onPress={() => setPasswordVisible(!passwordVisible)}>
                  <View style={styles.icon}>
                    <Ionicons name={passwordVisible ? "ios-eye-off" : "ios-eye"} size={20} color="black"/>
                  </View>
                </TouchableOpacity>
              </View>
              { errorPasswordConfirm===''? null : <Text style={{fontSize:12, color:"tomato", width:"100%", paddingLeft:10 }}>{errorPasswordConfirm}</Text> }
              <TouchableOpacity style={styles.sendButton} onPress={onSubmit}>
                <Text style={styles.textButton}>VALIDAR</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:25
  },
  logo: {
    width: 100,
    height: 100,
  },
  sendButton: {
    width: '100%',
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbd30a",
    borderRadius: 10,
    marginTop:10
  },
  input: {
    paddingLeft: 10,
    width: '100%',
    height: 40,
    borderColor: "#a4a4a4",
    borderWidth: 1,
    borderRadius: 5,
    marginTop:5
    
  },
  textButton: {
    fontWeight: "bold",
    color: "blue"
  },
  inputPassword: {
    paddingLeft: 10,
    width: "80%",
    height: 40,
  },
  viewPasswordInput: {
    width: '100%',
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
});
