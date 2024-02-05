'use strict';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { ButtonBottom, Loader, Select } from '../components';
import { userServices } from '../services';
import { filterNumber, onBlurEmail, FormValidator, notifyMessage } from '../helpers';
import { AuthContext } from '../context';
import { country_codes, doc_type } from '../constants';

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
]);

export default function UpdateProfile({ navigation }) {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [document, setDocument] = useState('');
	const [docType, setDocType] = useState('V');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneCode, setPhoneCode] = useState('+58');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);

	const { authState, signIn } = useContext(AuthContext);

	const [errorName, setErrorName] = useState('');
	const [errorLastName, setErrorLastName] = useState('');
	const [errorUserName, setErrorUserName] = useState('');
	const [errorEmail, setErrorEmail] = useState('');
	const [errorDocument, setErrorDocument] = useState('');
	const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
	const [errorAddress, setErrorAddress] = useState('');

	useEffect(() => {
		async function init() {
			setLoading(true);
			const { user } = authState;
			setName(user.name);
			setLastName(user.lastName);
			setUserName(user.userName);
			setAddress(user.address);
			setEmail(user.email);
			setDocument(user.document);
			const foundedCode = country_codes.find((code) => `${user.phoneNumber}`.startsWith(code.value));
			if (foundedCode) {
				setPhoneCode(foundedCode.value);
				setPhoneNumber(`${user.phoneNumber}`.substring(foundedCode.value.length, user.phoneNumber.length));
			}
			const foundedDoc = doc_type.find((type) => `${user.document}`.startsWith(type.value));
			if (foundedDoc) {
				setDocType(foundedDoc.value);
				setDocument(`${user.document}`.substring(foundedDoc.value.length, user.document.length));
			}
			setLoading(false);
		}
		init();
	}, []);

	const validate = () => {
		const validation = validator.validate({
			name,
			lastName,
			userName,
			email,
			document,
			phoneNumber,
			address,
		});
		setErrorName(validation.name.message);
		setErrorLastName(validation.lastName.message);
		setErrorUserName(validation.userName.message);
		setErrorEmail(validation.email.message);
		setErrorDocument(validation.document.message);
		setErrorPhoneNumber(validation.phoneNumber.message);
		setErrorAddress(validation.address.message);

		if (validation.isValid) return true;

		return false;
	};

	const update = async () => {
		if (!validate()) return;

		try {
			setLoading(true);
			const { status, response } = await userServices.updateUser({
				email,
				userName,
				name,
				lastName,
				document: `${docType}${document}`,
				address,
				phoneNumber: `${phoneCode}${phoneNumber}`,
				token: authState.user.token,
			});
			setLoading(false);
			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error);
				} else {
					signIn({
						token: authState.user.token,
						user: {
							...authState.user,
							email,
							userName,
							name,
							lastName,
							document: `${docType}${document}`,
							address,
							phoneNumber: `${phoneCode}${phoneNumber}`,
						},
					});
					notifyMessage('Datos de usuario actualizados');
					navigation.goBack();
				}
			} else {
				notifyMessage(response.error);
			}
		} catch (e) {
			setLoading(false);
			console.log(e);
		}
	};

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%', flex: 1, paddingTop: 50 }}>
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
				onChangeText={(text) => setUserName(text)}
				value={userName}
				placeholder={'Nombre de usuario'}
				placeholderTextColor='#a4a4a4'
			/>
			{errorUserName === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorUserName}</Text>}
			<TextInput
				style={styles.input}
				onBlur={() => setErrorName(name !== '' ? '' : 'Ingrese nombre')}
				value={name}
				onChangeText={(text) => setName(text)}
				placeholder={'Nombre'}
				placeholderTextColor='#a4a4a4'
			/>
			{errorName === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorName}</Text>}
			<TextInput
				style={styles.input}
				onBlur={() => setErrorLastName(lastName !== '' ? '' : 'Ingrese apellido')}
				onChangeText={(text) => setLastName(text)}
				value={lastName}
				placeholder={'Apellido'}
				placeholderTextColor='#a4a4a4'
			/>
			{errorLastName === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorLastName}</Text>}
			<Select
				data={doc_type}
				selectorValue={docType}
				inputValue={document}
				onChangeSelector={(text) => setDocType(text.value)}
				onChangeInput={(text) => setDocument(filterNumber(text))}
				onBlur={() => setErrorDocument(document !== '' ? '' : 'Ingrese numero de telefono')}
				labelExtractor={({ name }) => `${name}`}
				inputPlaceHolder={'Telefono'}
				containerStyles={{ width: '80%' }}
			/>
			{errorDocument === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorDocument}</Text>}
			<Select
				data={country_codes}
				selectorValue={phoneCode}
				inputValue={phoneNumber}
				onChangeSelector={(text) => setPhoneCode(text.value)}
				onChangeInput={(text) => setPhoneNumber(filterNumber(text))}
				onBlur={() => setErrorPhoneNumber(phoneNumber !== '' ? '' : 'Ingrese numero de telefono')}
				labelExtractor={({ name, value }) => `${value} ${name}`}
				inputPlaceHolder={'Telefono'}
				containerStyles={{ width: '80%' }}
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
				onBlur={() => setErrorAddress(address !== '' ? '' : 'Ingrese dirección')}
				onChangeText={(text) => setAddress(text)}
				value={address}
				multiline
				numberOfLines={5}
				placeholder={'Direccion'}
				placeholderTextColor='#a4a4a4'
			/>
			{errorAddress === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorAddress}</Text>}

			<View style={{ width: '100%', paddingTop: 20 }}>
				<ButtonBottom
					text={'Finalizar'}
					style={{ width: '80%', height: 40, justifyContent: 'center', alignitems: 'center' }}
					onPress={update}
				/>
			</View>
			<Loader loading={loading} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: 'center',
	},
	sendButton: {
		width: 250,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'tomato',
		borderRadius: 10,
	},
	input: {
		paddingLeft: 10,
		width: '80%',
		height: 40,
		borderColor: '#a4a4a4',
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
	},
	textButton: {
		fontWeight: 'bold',
		color: '#FFF',
	},
});
