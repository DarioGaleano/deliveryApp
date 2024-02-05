import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants';
import formatAmount from '../helpers/formatAmount';

export default function Product({
	id,
	cart,
	quantity,
	name,
	image,
	price,
	addToShoppingCart,
	incrementProduct,
	decrementProduct,
	removeProduct,
}) {
	const [count, setCount] = useState(1);

	useEffect(() => {
		cart ? setCount(quantity) : setCount(count);
	}, []);

	return (
		<>
			<TouchableOpacity style={styles.container} activeOpacity={0.9}>
				<View
					style={{
						width: '40%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						style={{ width: '90%', height: '90%' }}
						source={{ uri: `https://drive.google.com/thumbnail?id=${image}` }}
						resizeMode={'contain'}
					/>
				</View>
				<View
					style={{
						width: '60%',
						paddingTop: 10,
						height: '100%',
						alignItems: 'flex-start',
					}}
				>
					<View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, paddingTop: 10 }}>
						<Text style={{ verticalAlign: 'middle' }}>{name}</Text>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
						<Text style={{ fontSize: 13 }}>{`Precio: $ ${formatAmount(price)}`}</Text>
					</View>
					<View
						style={{
							width: '100%',
							justifyContent: 'center',
							marginBottom: 15,
							paddingHorizontal: 30,
						}}
					>
						<View style={{ width: '100%', flexDirection: 'row' }}>
							<View
								style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}
								onPress={() => {
									addToShoppingCart({ id, count });
									setCount(1);
								}}
							>
								{count === 1 ? null : (
									<TouchableOpacity
										onPress={
											!cart
												? () => setCount(count - 1)
												: () => {
														decrementProduct();
														setCount(count - 1);
												  }
										}
									>
										<Ionicons name={'ios-remove'} size={30} color={'tomato'} />
									</TouchableOpacity>
								)}
							</View>
							<View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
								<Text style={{ fontSize: 20 }}>{count}</Text>
							</View>
							<TouchableOpacity
								style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}
								onPress={
									!cart
										? () => setCount(count + 1)
										: () => {
												incrementProduct();
												setCount(count + 1);
										  }
								}
							>
								<Ionicons name={'ios-add'} size={30} color={colors.tabIconSelected} />
							</TouchableOpacity>
						</View>
					</View>
					{!cart ? (
						<View style={{ width: '100%', paddingHorizontal: '5%' }}>
							<TouchableOpacity
								style={styles.buttom}
								onPress={() => {
									addToShoppingCart({ id, count });
									setCount(1);
								}}
							>
								<Text style={{ color: 'white', fontWeight: 'bold' }}>Añadir</Text>
							</TouchableOpacity>
						</View>
					) : null}

					{!cart ? null : (
						<View
							style={{
								width: '100%',
								justifyContent: 'flex-start',
								alignItems: 'flex-end',
								position: 'absolute',
								paddingRight: 10,
								paddingTop: 10,
							}}
						>
							<TouchableOpacity
								style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}
								onPress={() => removeProduct(count)}
							>
								<Ionicons name={'ios-trash'} size={30} color={colors.tabIconSelected} />
							</TouchableOpacity>
						</View>
					)}
				</View>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderColor: 'gray',
		marginBottom: 5,
		backgroundColor: 'white',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
		zIndex: 1,
		shadowColor: 'rgba(0,0,0, .4)',
		shadowOffset: { height: 2, width: 2 },
		shadowOpacity: 2,
		elevation: 2,
	},
	Image: {
		width: '100%',
		height: '50%',
	},
	text: {},
	buttom: {
		backgroundColor: colors.tabIconSelected,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		paddingVertical: 10,
	},
});
