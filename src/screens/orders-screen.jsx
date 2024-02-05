'use strict';
import React, { useEffect, useState, useReducer, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Loader } from '../components';
import { orderServices } from '../services';
import formatAmount from '../helpers/formatAmount';
import { AuthContext } from '../context';

export default function OrderScreen({ route, navigation }) {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const { authState } = useContext(AuthContext);

	const [orders, dispatch] = useReducer((myArray, { type, value }) => {
		switch (type) {
			case 'add':
				return [value, ...myArray];
			case 'remove':
				return myArray.filter((_, index) => index !== value);
			case 'removeAll':
				return [];
			default:
				return myArray;
		}
	}, []);

	useEffect(() => {
		async function init() {
			try {
				setLoading(true);
				const { status, response } = await orderServices.getOrders({ page, token: authState.user.token });
				setLoading(false);
				if (status === 200) {
					if (response.error) {
						console.log('error 1', response);
					} else {
						response.docs.forEach((element) => {
							dispatch({ type: 'add', value: element });
						});
						setPage(page + 1);
					}
				} else {
					console.log('error 2', response);
				}
			} catch (e) {
				setLoading(false);
				console.log('error catch', e);
			}
		}
		init();
	}, []);

	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1, paddingTop: 30, paddingHorizontal: 25 }}>
			<Loader loading={loading} />
			<View style={{ width: '100%' }}>
				<Text>Selecciona una orden para ver la información detallada.</Text>
			</View>
			<View
				style={{
					width: '100%',
					height: 60,
					justifyContent: 'flex-start',
					alignItems: 'center',
					flexDirection: 'row',
					borderBottomWidth: 1,
				}}
			>
				<View style={{ width: '70%' }}>
					<Text>Fecha</Text>
				</View>
				<View style={{ width: '30%', alignItems: 'flex-end' }}>
					<Text>Monto total</Text>
				</View>
			</View>
			<FlatList
				data={orders}
				horizontal={false}
				contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() => navigation.navigate('orderdetails', { order: item })}
						style={{
							width: '100%',
							height: 60,
							justifyContent: 'flex-start',
							alignItems: 'center',
							flexDirection: 'row',
							borderBottomWidth: 1,
						}}
					>
						<View style={{ width: '70%' }}>
							<Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
						</View>
						<View style={{ width: '30%', alignItems: 'flex-end' }}>
							<Text>{`$${formatAmount(item.totalAmountUSD)}`}</Text>
						</View>
					</TouchableOpacity>
				)}
				// onEndReached={() => getOrders()}
				onEndReachedThreshold={0.1}
				keyExtractor={(item) => item._id}
			/>
		</View>
	);
}
