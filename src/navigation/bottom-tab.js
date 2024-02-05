import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
	HomeScreen,
	ShoppinCartScreen,
	PaymentScreen,
	AccountScreen,
	UpdateProfile,
	OrderScreen,
	OrderDetails,
	PagoMovilScreen,
} from '../screens';
import { colors } from '../constants';
import { AuthContext } from '../context';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<HomeStack.Screen name='home' component={HomeScreen} />
		</HomeStack.Navigator>
	);
}

const ShoppingCartStack = createStackNavigator();

function ShoppingCartStackScreen() {
	const DataShoppingCartStack = [
		{ key: 1, headerTitle: 'Carrito de compras', name: 'cart', component: ShoppinCartScreen },
		{ key: 2, headerTitle: 'Tu pedido', name: 'payment', component: PaymentScreen },
		{ key: 3, headerTitle: 'Realiza tu pago', name: 'pagomovil', component: PagoMovilScreen },
	];

	return (
		<ShoppingCartStack.Navigator>
			{DataShoppingCartStack.map((item) => (
				<ProfileStack.Screen
					key={item.key}
					options={{
						headerStyle: {
							backgroundColor: colors.tabIconSelected,
						},
						headerTintColor: '#fff',
						headerTitleAlign: 'center',
						headerTitle: item.headerTitle,
						headerTitleStyle: { fontWeight: 'bold' },
					}}
					name={item.name}
					component={item.component}
				/>
			))}
		</ShoppingCartStack.Navigator>
	);
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
	const { authState } = useContext(AuthContext);
	const DataProfileStack = [
		{ key: 1, headerTitle: `${authState.user.name} ${authState.user.lastName}`.toUpperCase(), name: 'profile', component: AccountScreen },
		{ key: 2, headerTitle: 'Editar Usuario', name: 'updateprofile', component: UpdateProfile },
		{ key: 3, headerTitle: 'Mis Ordenes', name: 'orderscreen', component: OrderScreen },
		{ key: 4, headerTitle: 'Detalles de la orden', name: 'orderdetails', component: OrderDetails },
	];

	return (
		<ProfileStack.Navigator>
			{DataProfileStack.map((item) => (
				<ProfileStack.Screen
					key={item.key}
					options={{
						headerStyle: {
							backgroundColor: colors.tabIconSelected,
						},
						headerTintColor: '#fff',
						headerTitleAlign: 'center',
						headerTitle: item.headerTitle,
						headerTitleStyle: { fontWeight: 'bold' },
					}}
					name={item.name}
					component={item.component}
				/>
			))}
		</ProfileStack.Navigator>
	);
}

export { HomeStackScreen, ShoppingCartStackScreen, ProfileStackScreen };
