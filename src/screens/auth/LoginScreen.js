import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { StackActions } from "react-navigation";
import { Loader } from '../../components'
import Modal from "react-native-modal";
import { colors } from '../../constants'
import { userServices } from "../../services";

function RenderButton(props) {
  return (
    <TouchableOpacity
      disabled={props.sending}
      style={[styles.resetBtn]}
      onPress={props.onPress}
    >
      <Text style={styles.loginBtnText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

function RenderModalContent(props) {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailReset, setEmailReset] = useState("");

  const sendMailTest = async () => {
    props.navigation.navigate("forgot");
    props.setVisible(false);
  };

  const sendMail = async () => {
    props.navigation.navigate("forgot");
    props.setVisible(false);
    setLoading(true);
    let params = "email=" + emailReset;
    setSending(true);
    try {
      const { status, response } = await userServices.forgotPassword({ emailReset });
      switch (status) {
        case 200: {
          if (response.code === 201) {
            Toast.show(response.error, {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
            setModalVisible(false);
            props.navigation.navigate("forgot");
          } else {
            setModalVisible(false);
            Toast.show(response.error, {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          }
          setSending(false);
          break;
        }
        default: {
          setSending(false);
          setLoading(false);
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          break;
        }
      }
    } catch (error) {
      setLoading(false);
      setSending(false);
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

  return (
    <View style={styles.modalContent}>
      <View style={{ height: 40 }}>
        <Text style={{}}>
          Coloque su email y le enviaremos instrucciones para resetear su
          contraseña.
        </Text>
      </View>
      <Loader message="Enviando código" />
      <View style={{ height: 60 }}>
        <TextInput
          style={[styles.inputStyleModal]}
          underlineColorAndroid="transparent"
          placeholder="Coloque su email"
          maxLength={50}
          keyboardType="email-address"
          returnKeyLabel={"next"}
          onChangeText={(emailReset) => setEmailReset(emailReset)}
        />
      </View>
      <View style={styles.buttonsSpaceResetPassword}>
        <RenderButton
          text={"Enviar"}
          onPress={/*sendMail*/ sendMailTest}
          sending={sending}
        />
        <RenderButton
          text={"Cancelar"}
          onPress={() => props.setVisible(false)}
          sending={sending}
        />
      </View>
    </View>
  );
}

export default function LoginScreen(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    setLoading(true);
    console.log(user);
    console.log(password);
    try {
      const { status, response } = await userServices.login({user, password});
      console.log(response.status);
      console.log(response);
      if (status === 200) {
        if (response.error) {
          setLoading(false);
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
          setLoading(false);
          await AsyncStorage.setItem("token", response.token);
          console.log(response);

          Toast.show("Bienvenido Sr(a).  " + response.user.name, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          props.navigation.navigate("App");
        }
      } else {
        setLoading(false);
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

  const _onPressFogetPassword = () => setModalVisible(!modalVisible);

  const onLoginTest = async () => {
    const token = "123";
    AsyncStorage.setItem("token", token);
    props.navigation.navigate("home");
  };

  const setVisible = (visible) => {
    setModalVisible(visible);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "20%",
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
          height: "20%",
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
          height: "20%",
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

        <TouchableOpacity onPress={_onPressFogetPassword}>
          <Text style={styles.forgotPasswordText}>Olvide mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerSection}>
        <Text style={{ color: "#40434E" }}>¿No tienes cuenta?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => props.navigation.navigate("signin")}
        >
          <Text style={styles.textButton}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
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
      <Loader loading={loading} />
      <Modal isVisible={modalVisible}>
        {
          <RenderModalContent
            setVisible={setVisible}
            navigation={props.navigation}
          />
        }
      </Modal>
    </View>
  );
}

LoginScreen.navigationOptions = ({ navigation }) => ({
  title: "Iniciar Sesion",
  headerStyle: {
    backgroundColor: colors.tabIconSelected,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});

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
    height: "20%",
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
