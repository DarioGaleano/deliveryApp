import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { colors } from '../constants/';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ButtonBottom, Loader } from '../components/';
import { formatAmount } from '../helpers';
import RadioGroup from 'react-native-radio-buttons-group';
import { AuthContext, BadgeContext } from '../context';
import { StackActions } from '@react-navigation/native';
import { orderServices } from '../services';

const printFormatted = (object) => console.log(JSON.stringify(object, null, 2));

export default function PaymentScreen({ route, navigation }) {
	const { totalAmount } = route.params;
	const [paymentType, setPaymentType] = useState('bss');
	const [address, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { authState, signIn } = useContext(AuthContext);
	const { RemoveAll } = useContext(BadgeContext);
	const [radioButtons, setRadioButtons] = useState([
		{
			label: 'Pago Movil',
			color: colors.tabIconSelected,
			size: 15,
			selected: true,
			value: 'bss',
		},
		{
			label: 'Creditos',
			color: colors.tabIconSelected,
			size: 15,
			selected: false,
			disabled: authState.user?.balance < totalAmount || authState.user?.balance < 5 || totalAmount < 5,
			value: 'tokens',
		},
		{
			label: 'Mixto',
			color: colors.tabIconSelected,
			size: 15,
			selected: false,
			disabled: authState.user?.balance < 5 || authState.user?.balance > totalAmount || totalAmount < 5,
			value: 'mixed',
		},
	]);

	useEffect(() => {
		async function init() {
			setAddress(authState.user.address);
		}
		init();
	}, []);

	const onSubmit = async () => {
		if (paymentType === 'bss' || paymentType === 'mixed') {
			navigation.navigate('pagomovil', {
				paymentType,
				address,
				...route.params,
				tokens: paymentType === 'mixed' ? authState.user.balance : 0,
				totalAmount: paymentType === 'mixed' ? totalAmount - authState.user.balance : totalAmount,
			});
		} else {
			try {
				setIsLoading(true);
				const { status, response } = await orderServices.createOrder({
					payment: {
						type: 'tokens',
						ref: 'N/A',
					},
					paymentInfo: {
						phone: '',
						document: '',
					},
					shipping: {
						address,
					},
					tokens: totalAmount,
					token: authState.user.token,
				});
				setIsLoading(false);
				if (status === 200) {
					if (response.error) {
						console.log(response.error);
					} else {
						RemoveAll();
						signIn({ token: authState.user?.token, user: { ...authState.user, balance: authState.user.balance - totalAmount } });
						printFormatted({ status, response });
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
		<View style={styles.container}>
			<Loader loading={isLoading} />
			<ScrollView>
				<KeyboardAvoidingView>
					<View style={[styles.boxShadow, { height: 130, justifyContent: 'space-around' }]}>
						<View style={{ height: '20%', justifyContent: 'center', marginBottom: 10 }}>
							<Text style={styles.textTitle}>Dirección</Text>
						</View>

						<View
							style={{
								height: '80%',
								maxHeight: 80,
								justifyContent: 'center',
								flexDirection: 'row',
								backgroundColor: '#e6e7e8',
								justifyContent: 'center',
								borderRadius: 10,
							}}
						>
							<TextInput
								style={{
									height: '100%',
									width: '90%',
									lineHeight: 20,
									paddingLeft: 10,
									textAlign: 'left',
									paddingRight: 10,
									verticalAlign: 'top',
									paddingTop: 10,
								}}
								placeholder={'Ingrese su direccion'}
								value={address}
								onChangeText={(text) => setAddress(text)}
								multiline
								numberOfLines={5}
							/>

							<View style={{ height: '100%', width: '10%', justifyContent: 'center' }}>
								<SimpleLineIcons name={'pencil'} size={20} color={'black'} />
							</View>
						</View>
					</View>

					<View style={[styles.boxShadow, { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
						<Text style={{ fontWeight: 'bold', fontSize: 20 }}>CREDITOS</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 20 }}>{authState.user?.balance}</Text>
					</View>
					<View style={[styles.boxShadow, { height: 130, justifyContent: 'center' }]}>
						<View style={{ justifyContent: 'center' }}>
							<Text style={styles.textTitle}>Tipo de pago</Text>
						</View>
						<View style={{ width: '100%', alignItems: 'flex-start' }}>
							<RadioGroup
								radioButtons={radioButtons}
								onPress={(data) => {
									setRadioButtons(data);
									setPaymentType(data.find((type) => type.selected).value);
									// setChangePaymentMethod(!changePaymentMethod);
								}}
							/>
						</View>
					</View>

					<View style={[styles.boxShadow, { height: 120 }]}>
						<View style={{ justifyContent: 'center', marginBottom: 10 }}>
							<Text style={styles.textTitle}>Resumen</Text>
						</View>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={styles.text}>Costo de productos</Text>
							{<Text style={styles.text}>{`$${formatAmount(totalAmount)}`}</Text>}
						</View>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={styles.text}>Costo de envio</Text>
							<Text style={styles.text}>$0.00</Text>
						</View>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={styles.text}>Total a pagar</Text>
							{paymentType === 'bss' && <Text style={styles.text}>{`$${formatAmount(totalAmount)}`}</Text>}
							{paymentType === 'tokens' && <Text style={styles.text}>$0</Text>}
							{paymentType === 'mixed' && <Text style={styles.text}>{`$${formatAmount(totalAmount - authState.user.balance)}`}</Text>}
						</View>
					</View>

					<View style={{ width: '100%', marginTop: 10, height: 60 }}>
						<ButtonBottom
							text={'Continuar'}
							onPress={onSubmit}
							style={{ width: '90%', height: 40, justifyContent: 'center', alignitems: 'center' }}
						/>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 25 : 0,
		paddingHorizontal: 25,
	},
	boxShadow: {
		padding: 10,
		flexDirection: 'column',
		width: '100%',
		borderRadius: 10,
		backgroundColor: 'white',
		zIndex: 1,
		shadowColor: 'rgba(0,0,0, .4)',
		shadowOffset: { height: 2, width: 2 },
		shadowOpacity: 2,
		elevation: 2,
		marginBottom: 10,
	},
	textTitle: {
		fontSize: 15,
	},
	text: {
		fontSize: 12,
		marginBottom: 5,
	},
});
