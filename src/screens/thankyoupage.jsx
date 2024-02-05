import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Loader, ButtonBottom } from '../components';
import { formatAmount, getPaymentType, getStatus, notifyMessage } from '../helpers';
import { AuthContext } from '../context';
import { orderServices } from '../services';

export default function ThankyouPage({ route, navigation }) {
	const [name, setName] = useState('');
	const [address, setAdress] = useState('');
	const [ref, setRef] = useState('');
	const [products, setProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const { authState } = useContext(AuthContext);
	const [status, setStatus] = useState(null);

	const [order, setOrder] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { status, response } = await orderServices.getOrder({ id: route.params.orderId });
				setLoading(false);
				if (status === 200) {
					if (response.error) {
						notifyMessage(response.error);
						return;
					} else {
						setOrder(response);
					}
				}
			} catch (e) {
				// Handle error
			}
		};
		fetchData();
		return () => {
			isActive = false;
		};
	}, []);

	return (
		<View style={{ flex: 1, display: 'flex', alignItems: 'center', paddingHorizontal: 20 }}>
			<Loader loading={loading} />
			{loading ? null : (
				<>
					<View style={{ height: 60, justifyContent: 'center' }}>
						<Text style={{ fontSize: 24 }}>Gracias por su compra</Text>
					</View>
					<View style={styles.boxShadow}>
						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								DIRECCIÓN: <Text style={{ fontWeight: '400' }}>{order?.shipping.address.toUpperCase()}</Text>
							</Text>
						</View>
						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								TIPO DE PAGO: <Text style={{ fontWeight: '400' }}>{getPaymentType(order?.payment.type).text}</Text>
							</Text>
						</View>
						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								REFERENCIA: <Text style={{ fontWeight: '400' }}>{order?.payment.ref}</Text>
							</Text>
						</View>

						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								ESTATUS: <Text style={{ color: status?.color, fontWeight: '500' }}>{status?.text}</Text>
							</Text>
						</View>
					</View>
					<ScrollView>
						<View style={[styles.boxShadow, { minHeight: 200, paddingBottom: 20 }]}>
							<View
								style={{
									width: '100%',
									height: 30,
									flexDirection: 'row',
									borderBottomColor: '#CCCCCC',
									borderBottomWidth: 1,
									alignItems: 'flex-end',
								}}
							>
								<View style={{ width: '20%' }}>
									<Text>Cant</Text>
								</View>
								<View style={{ width: '50%' }}>
									<Text>Producto</Text>
								</View>
								<View style={{ width: '30%' }}>
									<Text style={{ textAlign: 'right' }}>Monto</Text>
								</View>
							</View>
							{products.map((product, index) => (
								<View
									key={index}
									style={{
										width: '100%',
										height: 40,
										flexDirection: 'row',
										borderBottomColor: '#CCCCCC',
										borderBottomWidth: 1,
										alignItems: 'flex-end',
									}}
								>
									<View style={{ width: '20%' }}>
										<Text>{product.quantity}</Text>
									</View>
									<View style={{ width: '50%' }}>
										<Text>{product.product.name}</Text>
									</View>
									<View style={{ width: '30%' }}>
										<Text style={{ textAlign: 'right' }}>{`${formatAmount(
											product.product.price * product.quantity * route.params.dolarPrice
										)}`}</Text>
									</View>
								</View>
							))}
							<View style={{ width: '100%', flexDirection: 'row', height: 30, alignItems: 'flex-end' }}>
								<View style={{ width: '20%' }}></View>
								<View style={{ width: '50%' }}>
									<Text style={{ fontWeight: 'bold' }}>Total Bs:</Text>
								</View>
								<View style={{ width: '30%' }}>
									<Text style={{ textAlign: 'right' }}>{`${formatAmount(totalAmount)}`}</Text>
								</View>
							</View>
						</View>
					</ScrollView>
					<View style={{ height: 50, width: '100%', justifyContent: 'center' }}>
						<ButtonBottom
							text={'Finalizar'}
							style={{ width: '80%', height: 40, justifyContent: 'center', alignitems: 'center' }}
							onPress={() => navigation.popToTop()}
						/>
					</View>
				</>
			)}
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
});
