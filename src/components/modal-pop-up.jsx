import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import Loader from "./loader";
import { colors } from "../constants";

export default function ModalPopUp(props) {
  const [loading, setLoading] = useState(false);
  const [emailReset, setEmailReset] = useState("");

  const sendMailTest = async () => {
    props.navigation.navigate("forgot");
    props.setVisible(false);
  };

  const sendMail = async () => {
    props.navigation.navigate("forgot");
    props.setVisible(false);
    try {
      setLoading(true);
      const { status, response } = await userServices.forgotPassword({
        emailReset,
      });
      setLoading(false);

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
          break;
        }
        default: {
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
    <Modal isVisible={props.isVisible}>
      <Loader message="Enviando código" loading={loading} />
      <View style={styles.modalContent}>
        <View style={{ height: 40 }}>
          <Text style={{}}>
            Coloque su email y le enviaremos instrucciones para resetear su
            contraseña.
          </Text>
        </View>
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
          <TouchableOpacity
            disabled={props.sending}
            style={[styles.resetBtn]}
            onPress={sendMailTest}
          >
            <Text style={styles.loginBtnText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={props.sending}
            style={[styles.resetBtn]}
            onPress={() => props.setVisible(false)}
          >
            <Text style={styles.loginBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  resetBtn: {
    backgroundColor: colors.tabIconSelected,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "40" + "%",
    height: 45,
  },
  loginBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonsSpaceResetPassword: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100" + "%",
    height: 60,
  },
});

/*
    <RenderModal
        setVisible={setVisible}
        navigation={props.navigation}
        styles={styles}
    />
*/
