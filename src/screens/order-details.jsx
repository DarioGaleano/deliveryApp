import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { formatAmount, getStatus, getPaymentType, notifyMessage } from '../helpers';
import { AuthContext } from '../context';
import { ButtonBottom, Loader } from '../components';
import { orderServices } from '../services';
import { Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function OrderDetails({ route, navigation }) {
	const [paymentStatus, setPaymentStatus] = useState(null);
	const [deliveryStatus, setDeliveryStatus] = useState(null);
	const [openScanner, setOpenScanner] = useState(false);
	const [loading, setLoading] = useState(false);
	const cameraRef = useRef(null);
	const { authState } = useContext(AuthContext);
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [requestCameraPermission, setRequestCameraPermission] = useState(false);
	const [order, setOrder] = useState(null);
	const [reload, setReload] = useState(false);

	useFocusEffect(
		useCallback(() => {
			let isActive = true;
			setReload(false);
			if (isActive) {
				async function init() {
					try {
						setLoading(true);
						const { status, response } = await orderServices.getOrder({ id: route.params.order._id, token: authState.user.token });
						setLoading(false);
						if (status === 200) {
							if (response.error) notifyMessage(response.error);
							else {
								setOrder(response);
								setPaymentStatus(getStatus(response.status));
								if (response.deliveryStatus) {
									setDeliveryStatus(getStatus(response.deliveryStatus));
								}
							}
						}
					} catch (e) {
						setLoading(false);
						console.log({ e });
					}
				}
				init();
			}

			return () => {
				isActive = false;
			};
		}, [reload])
	);

	useEffect(() => {
		const getCameraPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		if (requestCameraPermission) {
			getCameraPermissions();
		}
	}, [requestCameraPermission]);

	const handleScanQr = async ({ data }) => {
		setScanned(true);
		setOpenScanner(false);

		try {
			setLoading(true);
			const { status, response } = await orderServices.finishedOrder({ orderId: data, token: authState.user.token });
			setLoading(false);
			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error);
				} else {
					setReload(true);
					notifyMessage('Orden actualizada con exito');
				}
			}
		} catch (e) {
			setLoading(false);
			console.log({ e });
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Loader loading={loading} />
			{!openScanner ? (
				<>
					<View style={styles.boxShadow}>
						<TouchableOpacity
							onPress={() => setReload(true)}
							style={{
								position: 'absolute',
								alignSelf: 'flex-end',
								width: 30,
								height: 30,
								borderWidth: 1,
								borderColor: '#000',
								right: 10,
								top: 10,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: Colors.tintColor,
								borderTopLeftRadius: 50,
								borderTopRightRadius: 50,
								borderBottomLeftRadius: 50,
								borderBottomRightRadius: 50,
							}}
						>
							<EvilIcons name='refresh' size={24} color='white' />
						</TouchableOpacity>
						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								DIRECCIÓN: <Text style={{ fontWeight: '400' }}>{order?.shipping?.address?.toUpperCase()}</Text>
							</Text>
						</View>
						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								TIPO DE PAGO: <Text style={{ fontWeight: '400' }}>{getPaymentType(order?.payment.type)?.text}</Text>
							</Text>
						</View>
						{order?.payment.type === 'bss' && (
							<View style={{ flexDirection: 'row', height: 20 }}>
								<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
									REFERENCIA: <Text style={{ fontWeight: '400' }}>{order?.payment.ref}</Text>
								</Text>
							</View>
						)}
						<View style={{ flexDirection: 'row', height: 20 }}>
							<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
								ESTADO DEL PAGO: <Text style={{ color: paymentStatus?.color, fontWeight: '400' }}>{paymentStatus?.text}</Text>
							</Text>
						</View>
						{order?.deliveryStatus && (
							<View style={{ flexDirection: 'row', height: 20 }}>
								<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
									ESTADO DEL ENVIO: <Text style={{ color: deliveryStatus?.color, fontWeight: '400' }}>{deliveryStatus?.text}</Text>
								</Text>
							</View>
						)}
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
								<View style={{ width: '30%', alignItems: 'flex-end' }}>
									<Text>Monto</Text>
								</View>
							</View>
							{order?.products.map((product, index) => (
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
									<View style={{ width: '30%', alignItems: 'flex-end' }}>
										<Text>{`$${formatAmount(product.product.price * product.quantity)}`}</Text>
									</View>
								</View>
							))}
							{(order?.payment.type === 'bss' || order?.payment.type === 'mixed') && (
								<>
									<View
										style={{
											width: '100%',
											flexDirection: 'row',
											marginTop: 10,
										}}
									>
										<Text style={{ textAlign: 'left', width: '40%', fontWeight: 'bold', fontSize: 15 }}>Total pagado:</Text>
										<View style={{ width: '60%', alignItems: 'center', justifyContent: 'space-between' }}>
											<Text style={{ textAlign: 'right', width: '100%' }}>{`$     ${formatAmount(order?.totalAmountUSD)}`}</Text>
											<Text style={{ textAlign: 'right', width: '100%' }}>{`Bss   ${formatAmount(order?.totalAmount)}`}</Text>
										</View>
									</View>
								</>
							)}
						</View>
						{order?.deliveryStatus === 'delivery_on_the_way' && (
							<View>
								<ButtonBottom
									onPress={() => {
										setRequestCameraPermission(true);
										setOpenScanner(true);
									}}
									text='Escanear codigo QR'
								/>
							</View>
						)}
					</ScrollView>
				</>
			) : hasPermission === null ? (
				<View>
					<Text>{'Requesting for camera permission'}</Text>
				</View>
			) : !hasPermission ? (
				<View>
					<Text>{'No access to camera'}</Text>
				</View>
			) : (
				<View style={styles.containerScanner}>
					<Camera
						ref={cameraRef}
						onBarCodeScanned={scanned ? undefined : handleScanQr}
						type={CameraType.back}
						ratio='16:9'
						barcodeScannerSettings={{
							barCodeTypes: ['qr'],
						}}
						style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
					/>
				</View>
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
	containerScanner: {
		// flex: 1,
		// height: '100%',
		// borderWidth: 2,
		height: '100%',
		backgroundColor: '#000',
		padding: 0,
	},
	cameraContainer: {
		height: '50%',
		top: '25%',
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
