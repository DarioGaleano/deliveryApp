import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loader, ModalPopUp, Title } from '../../components';
import { colors } from '../../constants';
import { userServices } from '../../services';
import { AuthContext } from '../../context';
import { onBlurEmail, FormValidator, notifyMessage } from '../../helpers';

const validator = new FormValidator([
	{
		field: 'email',
		method: 'isEmpty',
		validWhen: false,
		message: 'Ingrese email',
	},
	{
		field: 'email',
		method: 'isEmail',
		validWhen: true,
		message: 'Email invalido',
	},
	{
		field: 'password',
		method: 'isEmpty',
		validWhen: false,
		message: 'Ingrese contraseña',
	},
]);

export default function LoginScreen({ route, navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const { signIn } = React.useContext(AuthContext);

	const [errorEmail, setErrorEmail] = useState('');
	const [errorPassword, setErrorPassword] = useState('');

	const validate = () => {
		const validation = validator.validate({
			email,
			password,
		});

		setErrorEmail(validation.email.message);
		setErrorPassword(validation.password.message);
		if (validation.isValid) return true;
		return false;
	};

	const loginPressed = async () => {
		if (!validate()) return false;

		try {
			setLoading(true);
			const { status, response } = await userServices.login({ user: email.toLowerCase(), password });
			setLoading(false);

			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error);
					return;
				} else {
					notifyMessage(`Bienvenido Sr(a). ${response.user.name}`);
					signIn({ token: response.token, user: response.user });
				}
			} else {
				notifyMessage(response.error);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	const setVisible = (visible) => {
		setModalVisible(visible);
	};

	const onForgotPassword = async () => {
		setModalVisible(false);
		try {
			setLoading(true);
			const { status, response } = await userServices.forgotPassword({ email });
			setLoading(false);

			if (status === 200) {
				notifyMessage(response.message);
				navigation.navigate('forgot');
			} else if (status === 400) {
				if (response.error) {
					notifyMessage(response.error);
				}
			}
		} catch (error) {
			setLoading(false);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<KeyboardAvoidingView>
					<Title />

					<View
						style={{
							width: '100%',
							height: 110,
							alignItems: 'center',
							justifyContent: 'space-around',
						}}
					>
						<TextInput
							style={[styles.input, { borderColor: '#a4a4a4', borderWidth: 1, borderRadius: 5 }]}
							value={email}
							onBlur={() => setErrorEmail(onBlurEmail(email))}
							onChangeText={(text) => setEmail(text.trim())}
							placeholder={'Correo electronico'}
							placeholderTextColor='#a4a4a4'
						/>
						{errorEmail === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '100%', paddingLeft: 10 }}>{errorEmail}</Text>}
						<View style={styles.viewPasswordInput}>
							<TextInput
								style={[styles.input, { width: '80%' }]}
								onBlur={() => setErrorPassword(password !== '' ? '' : 'Ingrese contraseña')}
								onChangeText={(text) => setPassword(text)}
								placeholder={'Contraseña'}
								placeholderTextColor='#a4a4a4'
								secureTextEntry={!showPassword}
							/>
							<TouchableOpacity style={styles.button} onPress={() => setShowPassword(!showPassword)}>
								<View style={styles.icon}>
									<Ionicons name={showPassword ? 'ios-eye-off' : 'ios-eye'} size={20} color='black' />
								</View>
							</TouchableOpacity>
						</View>
						{errorPassword === '' ? null : (
							<Text style={{ fontSize: 12, color: 'tomato', width: '100%', paddingLeft: 10 }}>{errorPassword}</Text>
						)}
					</View>

					<View
						style={{
							width: '100%',
							height: 100,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TouchableOpacity style={styles.loginButton} onPress={loginPressed /*onLoginTest*/}>
							<Text style={styles.textButton}>INICIAR SESIÓN</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.forgotPasswordText}>Olvide mi contraseña</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.registerSection}>
						<Text style={{ color: '#40434E' }}>¿No tienes cuenta?</Text>
						<TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('signup')}>
							<Text style={styles.textButton}>REGISTRARSE</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
			<Loader loading={loading} />
			<ModalPopUp isVisible={modalVisible} setVisible={setVisible} onSubmit={onForgotPassword} email={email} setEmail={setEmail} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: Platform.OS === 'android' ? 25 : 0,
		paddingHorizontal: 25,
	},
	logo: {
		width: 100,
		height: 100,
	},
	loginButton: {
		width: '70%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.tintColor,
		borderRadius: 10,
		marginBottom: 5,
	},
	registerButton: {
		width: '50%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.tintColor,
		borderRadius: 10,
		marginTop: 5,
	},
	input: {
		paddingLeft: 10,
		width: '100%',
		height: 40,
	},
	forgotPasswordText: {
		color: colors.tabIconSelected,
		textDecorationLine: 'underline',
	},
	textButton: {
		fontWeight: 'bold',
		color: 'white',
	},
	conditionsText: {
		color: colors.tabIconSelected,
		textDecorationLine: 'underline',
	},
	registerSection: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: '100%',
	},
	viewPasswordInput: {
		width: '100%',
		flexDirection: 'row',
		borderColor: '#a4a4a4',
		borderWidth: 1,
		borderRadius: 5,
	},

	button: {
		width: '20%',
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
	},
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
	loginBtnText: {
		color: 'white',
		fontWeight: 'bold',
	},
	resetBtn: {
		backgroundColor: colors.tabIconSelected,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: '40' + '%',
		height: 45,
	},
});
