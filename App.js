import 'react-native-gesture-handler';
import React, { useEffect, useReducer } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackScreen, ShoppingCartStackScreen, ProfileStackScreen } from './src/navigation';
import { colors } from './src/constants';
import { LoginScreen, SingUpScreen, SplashScreen, ForgotPasswordScreen } from './src/screens';
import { AuthContext, BadgeContext } from './src/context';
import IconBadge from 'react-native-icon-badge';

function App() {
	const Tab = createBottomTabNavigator();
	const AuthStack = createStackNavigator();

	const [state, dispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						user: action.user,
						isLoading: false,
					};
				case 'LOGIN':
					return {
						...prevState,
						user: action.user,
					};
				case 'LOGOUT':
					return {
						...prevState,
						user: null,
					};
			}
		},
		{
			user: null,
			isLoading: true,
		}
	);

	const [stateBadge, badgeDispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'INCREMENT': {
					return {
						...prevState,
						number: prevState.number + action.number,
					};
				}
				case 'DECREMENT': {
					return {
						...prevState,
						number: prevState.number - action.number,
					};
				}
				case 'REMOVEALL': {
					return {
						...prevState,
						number: 0,
					};
				}
				case 'SETSHOPINGCART': {
					return {
						...prevState,
						number: action.number,
					};
				}
			}
		},
		{
			number: 0,
		}
	);

	useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const restoreUser = async () => {
			try {
				let user = JSON.parse(await AsyncStorage.getItem('user'));
				dispatch({ type: 'RESTORE_TOKEN', user });
			} catch (e) {
				// console.log(e);
			}
		};
		restoreUser();
	}, []);

	const authContext = {
		authState: state,
		signIn: async ({ token, user }) => {
			try {
				user.token = token;
				await AsyncStorage.setItem('user', JSON.stringify(user));
			} catch (e) {
				// console.log(e);
			}
			dispatch({ type: 'LOGIN', user });
		},
		signOut: async () => {
			await AsyncStorage.removeItem('user');
			badgeDispatch({ type: 'REMOVEALL' });
			dispatch({ type: 'LOGOUT' });
		},
	};

	const badgeContext = {
		Increment: async ({ number }) => {
			badgeDispatch({ type: 'INCREMENT', number: number });
		},
		Decrement: async ({ number }) => {
			badgeDispatch({ type: 'DECREMENT', number: number });
		},
		RemoveAll: async () => {
			badgeDispatch({ type: 'REMOVEALL' });
		},
		SetQuantity: async ({ quantity }) => {
			badgeDispatch({ type: 'SETSHOPINGCART', number: quantity });
		},
	};

	const options = {
		headerStyle: {
			backgroundColor: colors.tabIconSelected,
		},
		headerTintColor: '#fff',
		headerTitleAlign: 'center',
		headerTitleStyle: { fontWeight: 'bold' },
	};

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{state.isLoading ? (
					<SplashScreen />
				) : state.user === null ? (
					<AuthStack.Navigator>
						<AuthStack.Screen options={{ ...options, headerTitle: 'Iniciar Sesion' }} name='login' component={LoginScreen} />
						<AuthStack.Screen options={{ ...options, headerTitle: 'Registrar usuario' }} name='signup' component={SingUpScreen} />
						<AuthStack.Screen
							options={{ ...options, headerTitle: 'Restaurar contraseña' }}
							name='forgot'
							component={ForgotPasswordScreen}
						/>
					</AuthStack.Navigator>
				) : (
					<BadgeContext.Provider value={badgeContext}>
						<Tab.Navigator
							screenOptions={({ route }) => ({
								tabBarIcon: ({ color, size }) => {
									let iconName;
									if (route.name === 'Inicio') {
										iconName = 'ios-home';
									} else if (route.name === 'Carrito de compras') {
										iconName = 'ios-cart';
										return (
											<View style={{ width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
												<IconBadge
													MainElement={<Ionicons name={iconName} size={30} color={color} style={{ zIndex: 1 }} />}
													BadgeElement={<Text style={{ color: '#FFFFFF', fontSize: 8 }}>{stateBadge.number}</Text>}
													IconBadgeStyle={{
														width: 20,
														height: 20,
														left: 15,
														marginTop: -5,
														marginLeft: 2,
														zIndex: 0,
														borderRadius: 10,
														backgroundColor: 'tomato',
													}}
													Hidden={stateBadge.number === 0}
												/>
											</View>
										);
									} else if (route.name === 'Perfil') {
										iconName = 'ios-person';
									}

									return <Ionicons name={iconName} size={size} color={color} />;
								},
							})}
							tabBarOptions={{
								activeTintColor: colors.tabIconSelected,
								inactiveTintColor: 'rgba(38, 52, 118, 0.3)',
								labelStyle: {
									marginBottom: 5,
									marginTop: 0,
								},
								style: {
									height: 60,
								},
							}}
						>
							<Tab.Screen name='Inicio' component={HomeStackScreen} />
							<Tab.Screen name='Carrito de compras' component={ShoppingCartStackScreen} />
							<Tab.Screen name='Perfil' component={ProfileStackScreen} />
						</Tab.Navigator>
					</BadgeContext.Provider>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

export default App;
