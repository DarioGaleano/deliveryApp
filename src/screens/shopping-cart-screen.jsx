import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Product, Loader, ButtonBottom } from '../components';
import { colors } from '../constants';
import { shoppingCartServices, orderServices } from '../services';
import formatAmount from '../helpers/formatAmount';
import { AuthContext, BadgeContext } from '../context';
import { notifyMessage } from '../helpers';

export default function ShoppinCartScreen({ navigation }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState('');
	const [dolarPrice, setDolarPrice] = useState('');
	const { authState } = useContext(AuthContext);
	const { Increment, Decrement } = useContext(BadgeContext);

	useEffect(() => {
		async function init() {
			try {
				setLoading(true);
				const { status, response } = await orderServices.getDolarPrice();
				setLoading(false);

				if (status === 200) {
					if (response.error) {
						notifyMessage(response.error);
						return;
					} else {
						setDolarPrice(response.price);
					}
				} else {
					notifyMessage(response.error);
				}
			} catch (e) {
				console.log({ e });
				// Handle error
			}
		}
		init();
	}, []);

	useFocusEffect(
		useCallback(() => {
			let isActive = true;
			const fetchData = async () => {
				try {
					if (isActive) {
						setLoading(true);
						const { status, response } = await shoppingCartServices.getProductShoppingCart({ token: authState.user.token });
						setLoading(false);
						if (status === 200) {
							if (response.error) {
								notifyMessage(response.error);
								return;
							} else {
								let productsAux = [];
								setTotal(response.totalAmount);
								response.items.forEach((element) => {
									productsAux.push(element);
								});
								setProducts(productsAux);
							}
						} else {
							notifyMessage(response.error);
						}
					}
				} catch (e) {
					console.log({ e });
					// Handle error
				}
			};
			fetchData();
			return () => {
				isActive = false;
			};
		}, [])
	);

	const onSubmit = () => {
		if (products.length === 0) {
			notifyMessage('Debes agregar al menos un producto a tu carrito');
			return;
		}
		navigation.navigate('payment', { totalAmount: total, dolarPrice });
	};

	const incrementProduct = async ({ id }) => {
		try {
			const { status, response } = await shoppingCartServices.incrementProductShoppingCart({ id, token: authState.user.token });
			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error.message);
					return;
				} else {
					Increment({ number: 1 });
					setTotal(response.cart.totalAmount);
				}
			} else {
				notifyMessage(response.error);
			}
		} catch (error) {
			console.log(error);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	const decrementProduct = async ({ id }) => {
		try {
			const { status, response } = await shoppingCartServices.decrementProductShoppingCart({ id, token: authState.user.token });

			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error.message);
					return;
				} else {
					Decrement({ number: 1 });
					setTotal(response.cart.totalAmount);
				}
			} else {
				notifyMessage(response.error);
			}
		} catch (error) {
			console.log(error);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	const removeProduct = ({ id, name, count }) => {
		Alert.alert(
			'Eliminar producto',
			`Esta seguro de eliminar ${name} (${count}) de su carrito de compras?`,
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: async () => {
						try {
							const { status, response } = await shoppingCartServices.removeProductShoppingCart({ id, token: authState.user.token });
							if (status === 200) {
								if (response.error) {
									notifyMessage(response.error);
									return;
								} else {
									Decrement({ number: count });
									setTotal(response.cart.totalAmount);
									setProducts(response.cart.items);
								}
							} else {
								notifyMessage(response.error);
							}
						} catch (error) {
							console.log(error);
							notifyMessage('Problemas al enviar o recibir los datos');
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={styles.container}>
			<View style={{ width: '100%', height: '80%' }}>
				{products.length ? (
					<FlatList
						data={products.length ? products : null}
						horizontal={false}
						contentContainerStyle={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingTop: 5,
						}}
						renderItem={(item) => (
							<Product
								name={item.item.product.name}
								price={item.item.product.price}
								priceBss={item.item.product.priceBss}
								image={item.item.product.image}
								id={item.item._id}
								cart={true}
								quantity={item.item.quantity}
								incrementProduct={() => incrementProduct({ id: item.item._id })}
								decrementProduct={() => decrementProduct({ id: item.item._id })}
								removeProduct={(count) => removeProduct({ name: item.item.product.name, id: item.item._id, count })}
							/>
						)}
						keyExtractor={(item) => item._id}
					/>
				) : (
					<Text style={{ textAlign: 'center', verticalAlign: 'middle', height: '100%' }}>Tu carrito se encuentra vacio :(</Text>
				)}
			</View>
			<View
				style={{
					justifyContent: 'space-around',
					alignItems: 'center',
					width: '100%',
					height: '10%',
					flexDirection: 'row',
				}}
			>
				<View style={{ width: '30%', height: '70%' }}>
					{
						<Image
							style={{
								width: '100%',
								height: '100%',
								transform: [{ rotateY: '180deg' }],
							}}
							resizeMode={'contain'}
							source={
								products.length === 0
									? require('../../assets/images/shopping-cart.png')
									: require('../../assets/images/shopping-cart-2.png')
							}
						/>
					}
				</View>
				<View style={{ width: '70%', padding: 10, flexDirection: 'row' }}>
					<Text style={{ textAlign: 'left', width: '40%', fontWeight: 'bold', fontSize: 15 }}>Total a pagar:</Text>
					<View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<Text style={{ textAlign: 'right', width: '30%' }}>{`$\nBss`}</Text>
						<Text style={{ textAlign: 'right', width: '70%' }}>{`${formatAmount(total)}\n${formatAmount(total * dolarPrice)}`}</Text>
					</View>
				</View>
			</View>
			<ButtonBottom
				onPress={onSubmit}
				style={{ width: '80%', height: 40, justifyContent: 'center', alignitems: 'center' }}
				text={'Realizar Compra'}
			/>
			<Loader loading={loading} />
		</View>
	);
}

// ShoppinCartScreen.navigationOptions = {
// 	title: 'Carrito de Compras',
// 	headerStyle: {
// 		backgroundColor: colors.tabIconSelected,
// 	},
// 	headerTintColor: '#fff',
// 	headerTitleStyle: {
// 		fontWeight: 'bold',
// 		textAlign: 'center',
// 		flex: 1,
// 	},
// 	headerRight: <View></View>,
// 	headerLeft: <View></View>,
// };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: '8%',
		marginHorizontal: 25,
	},
});
