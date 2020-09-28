"use strict";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import DatePicker from "react-native-datepicker";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Loader } from '../../components'
import { userServices } from '../../services'

let index = 0;

const data = [
  { key: index++, section: true, label: "Code Area" },
  { key: index++, label: "Venezuela", value: "+58" },
  { key: index++, label: "Colombia", value: "+57" }
];

export default function SignInScreen (props) { 

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument]= useState('')
  const [code, setCode] = useState('+58');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress]=useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const validate = () => {
    if (email==='') {
      Toast.show("El registro debe contener un correo electrónico", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!userName) {
      Toast.show("El registro debe contener un nombre de usuario", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!name) {
      Toast.show("El registro debe contener su nombre", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!lastName) {
      Toast.show("El registro debe contener su apellido", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!document) {
      Toast.show("El registro debe tener su cedula", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!code) {
      Toast.show("El registro debe contener el código de su teléfono", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!phoneNumber) {
      Toast.show("El registro debe contener su teléfono", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!address) {
      Toast.show("El registro debe contener su dirección", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!password) {
      Toast.show("El registro debe contener su clave", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else if (!passwordConfirm) {
      Toast.show("Debe confirmar su clave", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validateEmail= () => {
    let email = email;
    if (email !== "") {
      let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(String(email).toLowerCase());
    } else {
      //this.ref.focus();
      return true;
    }
  }

  const handleOnBlurEmail = () => {
    if (!validateEmail()) {
      Toast.show("Formato de correo electrónico es invalido", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  };

  const register = async () => {
    console.log("AQUI 1")
    if (!validate()) {
      setLoading(false);
      return false;
    }
    setLoading(true);

    if (password !== passwordConfirm) {
      setLoading(false);
      Toast.show("La confirmación de su clave no coincide", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
      return false;
    }
    let completeName=name+' '+lastName;
    let completePhoneNumber=code+phoneNumber;
    console.log(completeName)
    console.log(email)
    console.log(userName)
    console.log(completePhoneNumber)
    console.log(document)
    console.log(address)
    console.log(password)
    try {
      const { status, response } = await userServices.register({completeName, email, userName, completePhoneNumber, document, address, password});
      console.log(response);

      if (status === 200) {
        if (response.error) {
          await setLoading(false);
          console.log(response.error);
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
          await setLoading(false);
          Toast.show("Bienvenido Sr(a) " + name, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
          props.navigation.navigate("login");
        }
      } else {
        await setLoading(false);
        console.log(response);
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
      await setLoading(false);
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
      <View style={{ alignItems: "center", width: '100%', height:550, justifyContent: 'space-around'}}>
        <TextInput
          style={styles.input}
          textContentType={"emailAddress"}
          onBlur={handleOnBlurEmail}
          onChangeText={text => setEmail(text.toLowerCase())}
          placeholder={"Correo electronico"}
          placeholderTextColor="#a4a4a4"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setUserName(text)}
          placeholder={"Nombre de usuario"}
          placeholderTextColor="#a4a4a4"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          placeholder={"Nombre"}
          placeholderTextColor="#a4a4a4"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setLastName(text)}
          placeholder={"Apellido"}
          placeholderTextColor="#a4a4a4"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setDocument(text)}
          placeholder={"Cedula"}
          placeholderTextColor="#a4a4a4"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setAddress(text)}
          placeholder={"Direccion"}
          placeholderTextColor="#a4a4a4"
        />
        <View style={styles.phoneView}>
          <ModalSelector
            style={styles.selectCode}
            data={data}
            supportedOrientations={["portrait"]}
            accessible={true}
            scrollViewAccessibilityLabel={"Scrollable options"}
            cancelButtonAccessibilityLabel={"Cancel Button"}
            onChange={text => setCode(text.value)}
          >
            <TextInput
              editable={false}
              placeholder={code}
              placeholderTextColor={'#a4a4a4'}
            />
          </ModalSelector>
          <TextInput
            style={styles.inputPhone}
            placeholder="Numero de telefono"
            placeholderTextColor="#a4a4a4"
            keyboardType={"phone-pad"}
            maxLength={10}
            onChangeText={text => setPhoneNumber(text)}
          />
        </View>
        <View style={styles.viewPasswordInput}>
          <TextInput
            style={styles.inputPassword}
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
        <View style={styles.viewPasswordInput}>
          <TextInput
            style={styles.inputPassword}
            placeholderTextColor="#a4a4a4"
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

SignInScreen.navigationOptions = ({ navigation }) => ({
  title: "Crear Cuenta",
  headerStyle: {
    backgroundColor: "rgb(26, 23, 152)"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  headerRight: <View></View>,
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.goBack(null)}>
      <Ionicons
        name={"ios-arrow-back"}
        size={30}
        style={{ paddingLeft: 10 }}
        color="white"
      />
    </TouchableOpacity>
  )
});

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
    borderRadius: 5
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
    borderRadius: 5
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
