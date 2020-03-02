import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen(props){
  
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: '30%', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/*<Image
            style={styles.logo}
            source={require("../assets/images/logo-remeny.png")}
          />*/
          <Text>Market Place</Text>
          }
        </View>
        <View style={{ alignItems: "center", width: '100%', height: '30%', justifyContent: 'space-around' }}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            placeholder={"Ingresar codigo"}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            placeholder={"Contraseña"}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            placeholder={"Confirmar contraseña"}
          />
        </View>
        <View style={{width: '100%', height: '40%', alignItems: 'center', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.props.navigation.navigate("login")}
          >
            <Text style={styles.textButton}>VALIDAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

ForgotPasswordScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  },
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.goBack(null)}>
      <Ionicons
        name={"ios-arrow-back"}
        size={30}
        style={{ paddingLeft: 15 }}
      />
    </TouchableOpacity>
  )
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100,
  },
  sendButton: {
    width: '70%',
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbd30a",
    borderRadius: 10,
  },
  input: {
    paddingLeft: 10,
    width: '80%',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  textButton: {
    fontWeight: "bold",
    color: "blue"
  }
});
