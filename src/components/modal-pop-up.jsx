import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../constants';

export default function ModalPopUp({ email, setEmail, setVisible, isVisible, sending, onSubmit }) {
	return (
		<Modal isVisible={isVisible}>
			<View style={styles.modalContent}>
				<View style={{ height: 40 }}>
					<Text style={{}}>Coloque su email y le enviaremos instrucciones para resetear su contraseña.</Text>
				</View>
				<View style={{ height: 60 }}>
					<TextInput
						style={[styles.inputStyleModal]}
						value={email}
						underlineColorAndroid='transparent'
						placeholder='Coloque su email'
						maxLength={50}
						keyboardType='email-address'
						returnKeyLabel={'next'}
						onChangeText={(emailReset) => setEmail(emailReset)}
						onBlur={() => {
							setEmail(email.trim());
						}}
					/>
				</View>
				<View style={styles.buttonsSpaceResetPassword}>
					<TouchableOpacity disabled={sending} style={[styles.resetBtn]} onPress={onSubmit}>
						<Text style={styles.loginBtnText}>Enviar</Text>
					</TouchableOpacity>
					<TouchableOpacity disabled={sending} style={[styles.resetBtn]} onPress={() => setVisible(false)}>
						<Text style={styles.loginBtnText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContent: {
		backgroundColor: 'white',
		padding: 10,
		justifyContent: 'space-between',
		borderRadius: 5,
	},
	inputStyleModal: {
		padding: 5,
		backgroundColor: 'white',
		borderRadius: 5,
		borderColor: '#a4a4a4',
		borderWidth: 1,
		color: '#a4a4a4',
		height: 45,
		width: '100' + '%',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 5,
	},
	buttonsSpaceResetPassword: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100' + '%',
		height: 60,
	},
	resetBtn: {
		backgroundColor: colors.tabIconSelected,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: '40' + '%',
		height: 45,
	},
	loginBtnText: {
		color: 'white',
		fontWeight: 'bold',
	},
	buttonsSpaceResetPassword: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100' + '%',
		height: 60,
	},
});

/*
    <RenderModal
        setVisible={setVisible}
        navigation={navigation}
        styles={styles}
    />
*/
