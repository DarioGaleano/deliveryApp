import React, { useContext, useState } from 'react';
import { ScrollView, TextInput, StyleSheet, Text } from 'react-native';
import { Loader, ButtonBottom, Select } from '../components';
import { FormValidator, filterNumber, formatAmount, getPaymentType } from '../helpers';
import { AuthContext, BadgeContext } from '../context';
import { orderServices } from '../services';
import { StackActions } from '@react-navigation/native';
import { doc_type, phone_prefix } from '../constants';

const validator = new FormValidator([
	{
		field: 'phone',
		method: 'isEmpty',
		validWhen: false,
		message: 'Ingrese telefono',
	},
	{
		field: 'dni',
		method: 'isEmpty',
		validWhen: false,
		message: 'Ingrese documento',
	},
	{
		field: 'reference',
		method: 'isEmpty',
		validWhen: false,
		message: 'Ingrese referencia',
	},
]);

export default function PagoMovilScreen({ route, navigation }) {
	const [phone, setPhone] = useState('');
	const [phoneCode, setPhoneCode] = useState('0412');
	const [dni, setDni] = useState('');
	const [docType, setDocType] = useState('V');
	const [reference, setReference] = useState('');

	const [errorPhone, setErrorPhone] = useState('');
	const [errorDni, setErrorDni] = useState('');
	const [errorReference, setErrorReference] = useState('');

	const { authState } = useContext(AuthContext);
	const { RemoveAll } = useContext(BadgeContext);

	const [isLoading, setIsLoading] = useState(false);

	const validate = () => {
		const validation = validator.validate({
			phone,
			dni,
			reference,
		});

		setErrorPhone(validation.phone.message);
		setErrorDni(validation.dni.message);
		setErrorReference(validation.reference.message);

		if (validation.isValid) return true;

		return false;
	};

	const onSubmit = async () => {
		if (validate()) {
			try {
				setIsLoading(true);
				const { status, response } = await orderServices.createOrder({
					payment: {
						type: route.params.paymentType,
						ref: reference,
					},
					paymentInfo: {
						phone: `${phoneCode}${phone}`,
						document: `${docType}${dni}`,
					},
					shipping: {
						address: route.params.address,
					},
					token: authState.user.token,
					tokens: route.params.tokens,
				});
				setIsLoading(false);
				if (status === 200) {
					if (response.error) {
						console.log(response.error);
					} else {
						RemoveAll();
						navigation.dispatch(StackActions.popToTop());
						navigation.navigate('Perfil', {
							screen: 'orderdetails',
							initial: false,
							params: { order: { ...response.order } },
						});
					}
				}
				if (status === 400) {
					console.log(response.error);
				}
			} catch (e) {
				setIsLoading(false);
				console.log({ e });
			}
		}
	};

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%', flex: 1, paddingTop: 50 }}>
			<Loader loading={isLoading} />
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>DATOS PARA EL PAGO MOVIL</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				BANCO: <Text style={{ fontWeight: '400' }}>BANESCO</Text>
			</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				TELEFONO: <Text style={{ fontWeight: '400' }}>04125527864</Text>
			</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				DOCUMENTO: <Text style={{ fontWeight: '400' }}>J176547232</Text>
			</Text>

			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				MONTO TOTAL:{' '}
				<Text style={{ fontWeight: '400' }}>
					Bss {formatAmount(route.params.dolarPrice * route.params.totalAmount)} (${formatAmount(route.params.totalAmount)})
				</Text>
			</Text>

			<Text style={{ width: '80%', height: 1, marginVertical: 10, fontWeight: 'bold', borderWidth: 1, borderColor: 'black' }}></Text>
			<Text style={{ width: '80%', height: 20, fontWeight: 'bold' }}>
				NOMBRE:{' '}
				<Text style={{ fontWeight: '400' }}>
					{authState.user.name.toUpperCase()} {authState.user.lastName.toUpperCase()}{' '}
				</Text>
			</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				DIRECCIÓN: <Text style={{ fontWeight: '400' }}>{route.params.address.toUpperCase()}</Text>
			</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				TIPO DE PAGO: <Text style={{ fontWeight: '400' }}>{getPaymentType(route.params.paymentType)?.text.toUpperCase()}</Text>
			</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				CREDITOS: <Text style={{ fontWeight: '400' }}>${route.params.tokens}</Text>
			</Text>
			<Text style={{ width: '80%', height: 20, marginTop: 5, fontWeight: 'bold' }}>
				BCV: <Text style={{ fontWeight: '400' }}>Bss {parseFloat(route.params.dolarPrice)}</Text>
			</Text>
			<Select
				data={phone_prefix}
				selectorValue={phoneCode}
				inputValue={phone}
				onChangeSelector={(text) => setPhoneCode(text.value)}
				onChangeInput={(text) => setPhone(filterNumber(text))}
				onBlur={() => setErrorPhone(phone !== '' ? '' : 'Ingrese numero de telefono')}
				labelExtractor={({ value }) => `${value}`}
				inputPlaceHolder={'Telefono'}
				containerStyles={{ width: '80%' }}
				maxLength={7}
			/>
			{errorPhone === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorPhone}</Text>}
			<Select
				data={doc_type}
				selectorValue={docType}
				inputValue={dni}
				onChangeSelector={(text) => setDocType(text.value)}
				onChangeInput={(text) => setDni(filterNumber(text))}
				onBlur={() => setErrorDni(dni !== '' ? '' : 'Ingrese numero de documento')}
				labelExtractor={({ name }) => `${name}`}
				inputPlaceHolder={'Documento'}
				containerStyles={{ width: '80%' }}
				maxLength={8}
			/>

			{errorDni === '' ? null : <Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorDni}</Text>}
			<TextInput
				style={styles.input}
				onBlur={() => setErrorReference(reference !== '' ? '' : 'Ingrese ultimos 4 digitos de la referencia')}
				value={reference}
				onChangeText={(text) => setReference(filterNumber(text))}
				placeholder={'Ultimos 6 digitos de la referencia'}
				keyboardType={'phone-pad'}
				placeholderTextColor='#a4a4a4'
				maxLength={6}
			/>
			{errorReference === '' ? null : (
				<Text style={{ fontSize: 12, color: 'tomato', width: '80%', paddingLeft: 10 }}>{errorReference}</Text>
			)}
			<ButtonBottom
				onPress={onSubmit}
				style={{ width: '80%', height: 40, justifyContent: 'center', alignitems: 'center' }}
				text={'Continuar'}
			/>
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
		backgroundColor: 'primary',
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
