'use strict';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loader, Select, Title } from '../../components';
import { userServices } from '../../services';
import { filterNumber, onBlurEmail, FormValidator, notifyMessage } from '../../helpers';
import { colors, country_codes, doc_type } from '../../constants';
import Colors from '../../constants/Colors';

export default function SignUpScreen(props) {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [document, setDocument] = useState('');
	const [docType, setDocType] = useState('V');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneCode, setPhoneCode] = useState('+58');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	//Errors
	const [errorName, setErrorName] = useState('');
	const [errorLastName, setErrorLastName] = useState('');
	const [errorUserName, setErrorUserName] = useState('');
	const [errorEmail, setErrorEmail] = useState('');
	const [errorDocument, setErrorDocument] = useState('');
	const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
	const [errorAddress, setErrorAddress] = useState('');
	const [errorPassword, setErrorPassword] = useState('');
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

	const validator = new FormValidator([
		{
			field: 'name',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese nombre',
		},
		{
			field: 'lastName',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese apellido',
		},
		{
			field: 'userName',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese nombre de usuario',
		},

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
			field: 'document',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese numero de documento',
		},
		{
			field: 'phoneNumber',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese numero de telefono',
		},
		{
			field: 'address',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese dirección',
		},
		{
			field: 'password',
			method: 'isEmpty',
			validWhen: false,
			message: 'Ingrese contraseña',
		},
		{
			field: 'passwordConfirm',
			method: 'isEmpty',
			validWhen: false,
			message: 'Confirme su contraseña',
		},
		{
			field: 'passwordConfirm',
			method: (passwordConfirm) => (passwordConfirm === password ? true : false),
			validWhen: true,
			message: 'Las contraseñas no coinciden.',
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
			passwordConfirm,
		});
		setErrorName(validation.name.message);
		setErrorLastName(validation.lastName.message);
		setErrorUserName(validation.userName.message);
		setErrorEmail(validation.email.message);
		setErrorDocument(validation.document.message);
		setErrorPhoneNumber(validation.phoneNumber.message);
		setErrorAddress(validation.address.message);
		setErrorPassword(validation.password.message);
		setErrorPasswordConfirm(validation.passwordConfirm.message);

		if (validation.isValid) return true;

		return false;
	};

	const register = async () => {
		if (!validate()) return false;

		try {
			setLoading(true);
			const { status, response } = await userServices.register({
				name,
				lastName,
				email: email.toLowerCase(),
				userName,
				phoneNumber: `${phoneCode}${phoneNumber}`,
				document,
				address,
				password,
			});
			setLoading(false);

			if (status === 200) {
				if (response.error) {
					console.log(response.error);
					notifyMessage(response.error);
					return;
				} else {
					notifyMessage(`Bienvenido Sr(a) ${name}`);
					props.navigation.navigate('login');
				}
			} else {
				notifyMessage(response.error);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Title />
			<View style={{ alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
				<TextInput
					style={styles.input}
					textContentType={'emailAddress'}
					onBlur={() => setErrorEmail(onBlurEmail(email))}
					value={email}
					onChangeText={(text) => setEmail(text.trim())}
					placeholder={'Correo electronico'}
					placeholderTextColor='#a4a4a4'
				/>
				{errorEmail === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorEmail}</Text>}
				<TextInput
					style={styles.input}
					onBlur={() => setErrorUserName(userName !== '' ? '' : 'Ingrese nombre de usuario')}
					value={userName}
					onChangeText={(text) => setUserName(text.trim())}
					placeholder={'Nombre de usuario'}
					placeholderTextColor='#a4a4a4'
				/>
				{errorUserName === '' ? null : (
					<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorUserName}</Text>
				)}
				<TextInput
					style={styles.input}
					onBlur={() => setErrorName(name !== '' ? '' : 'Ingrese nombre')}
					onChangeText={(text) => setName(text)}
					placeholder={'Nombre'}
					placeholderTextColor='#a4a4a4'
				/>
				{errorName === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorName}</Text>}
				<TextInput
					style={styles.input}
					onBlur={() => setErrorLastName(lastName !== '' ? '' : 'Ingrese apellido')}
					onChangeText={(text) => setLastName(text)}
					placeholder={'Apellido'}
					placeholderTextColor='#a4a4a4'
				/>
				{errorLastName === '' ? null : (
					<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorLastName}</Text>
				)}

				<Select
					data={doc_type}
					selectorValue={docType}
					inputValue={document}
					onChangeSelector={(text) => setDocType(text.value)}
					onChangeInput={(text) => setDocument(filterNumber(text))}
					onBlur={() => setErrorDocument(document !== '' ? '' : 'Ingrese numero de documento')}
					labelExtractor={({ name }) => `${name}`}
					inputPlaceHolder={'Documento'}
				/>
				{errorDocument === '' ? null : (
					<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorDocument}</Text>
				)}

				<Select
					data={country_codes}
					selectorValue={phoneCode}
					inputValue={phoneNumber}
					onChangeSelector={(text) => setPhoneCode(text.value)}
					onChangeInput={(text) => setPhoneNumber(filterNumber(text))}
					onBlur={() => setErrorPhoneNumber(phoneNumber !== '' ? '' : 'Ingrese numero de telefono')}
					labelExtractor={({ name, value }) => `${value} ${name}`}
					inputPlaceHolder={'Telefono'}
				/>
				{errorPhoneNumber === '' ? null : (
					<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorPhoneNumber}</Text>
				)}
				<TextInput
					style={[
						styles.input,
						{
							maxHeight: 80,
							lineHeight: 20,
							height: 'auto',
							textAlign: 'left',
							verticalAlign: 'top',
							paddingTop: 10,
							paddingRight: 10,
						},
					]}
					multiline
					numberOfLines={5}
					onBlur={() => setErrorAddress(address !== '' ? '' : 'Ingrese dirección')}
					onChangeText={(text) => setAddress(text)}
					placeholder={'Direccion'}
					placeholderTextColor='#a4a4a4'
				/>
				{errorAddress === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorAddress}</Text>}
				<View style={styles.viewPasswordInput}>
					<TextInput
						style={styles.inputPassword}
						onBlur={() => setErrorPassword(password !== '' ? '' : 'Ingrese contraseña')}
						placeholderTextColor='#a4a4a4'
						onChangeText={(text) => setPassword(text)}
						placeholder={'Contraseña'}
						secureTextEntry={!passwordVisible}
					/>
					<TouchableOpacity style={styles.button} onPress={() => setPasswordVisible(!passwordVisible)}>
						<View style={styles.icon}>
							<Ionicons name={passwordVisible ? 'ios-eye-off' : 'ios-eye'} size={20} color='black' />
						</View>
					</TouchableOpacity>
				</View>
				{errorPassword === '' ? null : (
					<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorPassword}</Text>
				)}
				<View style={styles.viewPasswordInput}>
					<TextInput
						style={styles.inputPassword}
						placeholderTextColor='#a4a4a4'
						onBlur={() =>
							setErrorPasswordConfirm(
								passwordConfirm === '' ? 'Valide su contraseña' : password !== passwordConfirm ? 'Las contraseñas deben coincidir' : ''
							)
						}
						onChangeText={(text) => setPasswordConfirm(text)}
						placeholder={'Confirmar contraseña'}
						secureTextEntry={!passwordVisible}
					/>
					<TouchableOpacity style={styles.button} onPress={() => setPasswordVisible(!passwordVisible)}>
						<View style={styles.icon}>
							<Ionicons name={passwordVisible ? 'ios-eye-off' : 'ios-eye'} size={20} color='black' />
						</View>
					</TouchableOpacity>
				</View>
				{errorPasswordConfirm === '' ? null : (
					<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorPasswordConfirm}</Text>
				)}
				<View style={{ width: '100%', alignItems: 'center', paddingTop: 20 }}>
					<TouchableOpacity style={styles.sendButton} onPress={register}>
						<Text style={styles.textButton}>REGISTRARSE</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Loader loading={loading} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 25,
	},
	logo: {
		width: 100,
		height: 100,
		marginTop: 30,
		marginBottom: 30,
	},
	sendButton: {
		width: 250,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.tintColor,
		borderRadius: 10,
	},
	input: {
		paddingLeft: 10,
		width: '100%',
		height: 40,
		borderColor: '#a4a4a4',
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
	},
	inputPassword: {
		paddingLeft: 10,
		width: '80%',
		height: 40,
	},
	textButton: {
		fontWeight: 'bold',
		color: '#FFF',
	},
	pickers: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	pickerView: {
		borderWidth: 1,
		borderColor: '#a4a4a4',
		borderRadius: 5,
		width: 140,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pickerStyle: {
		width: '100%',
		color: '#344953',
	},
	datePicker: {
		width: 140,
		height: 40,
		borderColor: '#a4a4a4',
		borderRadius: 5,
	},
	phoneView: {
		height: 40,
		alignItems: 'center',
		width: '100%',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	inputPhone: {
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: '#a4a4a4',
		width: '80%',
		height: 40,
		borderLeftWidth: 0,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	selectCode: {
		width: '20%',
		height: 40,
		borderWidth: 1,
		borderColor: '#a4a4a4',
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectGender: {
		width: '100%',
		height: 40,
		borderColor: '#a4a4a4',
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewPasswordInput: {
		width: '100%',
		flexDirection: 'row',
		borderColor: '#a4a4a4',
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
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
	conditionsText: {
		color: colors.tabIconSelected,
		textDecorationLine: 'underline',
	},
});
