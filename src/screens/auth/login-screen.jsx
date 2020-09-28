import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { Loader, ModalPopUp } from '../../components'
import { colors } from '../../constants'
import { userServices } from "../../services"
import { AuthContext } from '../../context'

export default function LoginScreen({route, navigation}) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { signIn } = React.useContext(AuthContext);

  const validate = () => {
    if (!user) {
      Toast.show("Debe ingresar su nombre de usuario o correo electronico", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return false;
    } else if (!password) {
      Toast.show("Debe ingresar su contraseña", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return false;
    } else return true;
  };

  const loginPressed = async () => {
    if (!validate()) return false;
    try {
      setLoading(true);
      const { status, response } = await userServices.login({user, password});
      setLoading(false);      
      console.log('response',{ status , response});
      if (status === 200) {
        if (response.error) {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          return;
        } else {
          Toast.show("Bienvenido Sr(a).  " + response.user.name, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          signIn({ token: response.token, username:response.user.name})
        }
      } else {
        Toast.show(response.error, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show("Problemas al enviar o recibir los datos", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  const setVisible = (visible) => {
    setModalVisible(visible);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <KeyboardAvoidingView >

      <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
          /*<Image
          style={styles.logo}
          source={require("../assets/images/logo-remeny.png")}
        />*/
          <Text>Market Place</Text>
        }
      </View>

      <View
        style={{
          width: "100%",
          height: 100,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TextInput
          style={[
            styles.input,
            { borderColor: "#a4a4a4", borderWidth: 1, borderRadius: 5 },
          ]}
          onChangeText={(text) => setUser(text.toLowerCase())}
          placeholder={"Correo o nombre de usuario"}
          placeholderTextColor="#a4a4a4"
        />
        <View style={styles.viewPasswordInput}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Contraseña"}
            placeholderTextColor="#a4a4a4"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPassword(!showPassword)}
          >
            <View style={styles.icon}>
              <Ionicons
                name={showPassword ? "ios-eye-off" : "ios-eye"}
                size={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.loginButton}
          onPress={loginPressed/*onLoginTest*/}
        >
          <Text style={styles.textButton}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.forgotPasswordText}>Olvide mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerSection}>
        <Text style={{ color: "#40434E" }}>¿No tienes cuenta?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("signin")}
        >
          <Text style={styles.textButton}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 100,
        }}
      >
        <Text style={{ color: "#40434E" }}>Al continuar esta aceptando</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#40434E" }}>los </Text>
          <Text style={styles.conditionsText}>terminos y condiciones</Text>
        </View>
        <Text style={{ color: "#40434E" }}>
          de uso y la politica de privacidad.
        </Text>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
      <Loader loading={loading} />
      <ModalPopUp isVisible={modalVisible} setVisible={setVisible} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  logo: {
    width: 100,
    height: 100,
  },
  loginButton: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tabIconSelected,
    borderRadius: 10,
    marginBottom: 5,
  },
  registerButton: {
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tabIconSelected,
    borderRadius: 10,
    marginTop: 5,
  },
  input: {
    paddingLeft: 10,
    width: "80%",
    height: 40,
  },
  forgotPasswordText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
  },
  conditionsText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  registerSection: {
    alignItems: "center",
    justifyContent: "center",
    height:100,
    width: "100%",
  },
  viewPasswordInput: {
    width: "80%",
    flexDirection: "row",
    borderColor: "#a4a4a4",
    borderWidth: 1,
    borderRadius: 5,
  },

  button: {
    width: "20%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 5,
  },
  inputStyleModal: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#a4a4a4",
    borderWidth: 1,
    color: "#a4a4a4",
    height: 45,
    width: "100" + "%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  buttonsSpaceResetPassword: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100" + "%",
    height: 60,
  },
  loginBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  resetBtn: {
    backgroundColor: colors.tabIconSelected,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "40" + "%",
    height: 45,
  },
});
