import React, { useState, useEffect, useReducer, useContext, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Search, Product, Loader } from '../components';
import { Badge } from 'react-native-elements';
import { productServices, userServices } from '../services';
import { shoppingCartServices } from '../services';
import { AuthContext, BadgeContext } from '../context';
import { colors } from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import { notifyMessage } from '../helpers';

// const printFormatted = (object) => console.log(JSON.stringify(object, null, 2));

export default function HomeScreen({}) {
	const [products, dispatch] = useReducer((myArray, { type, value }) => {
		switch (type) {
			case 'add':
				return [...myArray, value];
			case 'remove':
				return myArray.filter((_, index) => index !== value);
			case 'removeAll':
				return [];
			default:
				return myArray;
		}
	}, []);

	const [page, setPage] = useState(1);
	const [pageProductsFounds, setPageProductsFounds] = useState(1);
	const [pageProductsPerCategory, setPageProductsPerCategory] = useState(1);
	const [textInput, setTextInput] = useState('');
	const [startSearch, setStartSearch] = useState(false);
	const [searchPerCategory, setSearchPerCategory] = useState(false);
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [active, setActive] = useState(0);
	const [categorys, setCategorys] = useState([]);

	const { SetQuantity, Increment } = useContext(BadgeContext);
	const { authState, signIn } = useContext(AuthContext);

	const getProducts = async ({ page }) => {
		try {
			setLoading(true);
			const { status, response } = await productServices.getProducts({ page: page });
			setLoading(false);
			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error);
					return;
				} else {
					setPage(page + 1);
					response.docs.forEach((element) => {
						dispatch({ type: 'add', value: element });
					});
				}
			} else {
				setLoading(false);
				notifyMessage(response.error);
			}
		} catch (error) {
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	const findProducts = async ({ page }) => {
		setLoading(true);
		try {
			const { status, response } = await productServices.findProducts({ page: page, textInput });
			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error.message);
					return;
				} else {
					setLoading(false);
					setPageProductsFounds(pageProductsFounds + 1);

					response.docs.forEach((element) => {
						dispatch({ type: 'add', value: element });
					});
				}
			} else {
				setLoading(false);
				notifyMessage(response.error);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	useFocusEffect(
		useCallback(() => {
			let isActive = true;
			dispatch({ type: 'removeAll' });
			if (isActive) {
				getProducts({ page: 1 });
			}

			return () => {
				isActive = false;
			};
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			const init = async () => {
				try {
					setLoading(true);
					const { status, response } = await userServices.getTokensBalance({ token: authState.user?.token });
					setLoading(false);
					if (status === 200) {
						if (response.error) {
							// console.log(JSON.stringify({ ...response }, null, 2));
							notifyMessage(response.error);
						} else {
							// printFormatted(response);
							signIn({ token: authState.user?.token, user: { ...authState.user, balance: response.balance } });
						}
					} else {
						// printFormatted({ status, response });
					}
				} catch (e) {
					console.log({ e });
					setLoading(false);
				}
			};
			let isActive = true;
			if (isActive) {
				init();
			}
			return () => {
				isActive = false;
			};
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			let isActive = true;
			async function init() {
				//getCategories
				try {
					const { status, response } = await productServices.getCategorys();
					if (status === 200) {
						if (response.error) {
							console.log('error1', response.error);
							return;
						} else {
							let i = 0;
							let array = [];
							array.push({ name: 'Todos', index: 0 });
							response.forEach((item, index) => array.push({ ...item, index: index + 1 }));
							setCategorys(array);
						}
					} else {
						console.log('error2', response.error);
					}
				} catch (error) {
					console.log('errorCatch', error);
				}
			}

			if (isActive) {
				init();
			}

			return () => {
				isActive = false;
			};
		}, [])
	);

	useEffect(() => {
		async function init() {
			//setQuantity in badge
			try {
				const { status, response } = await shoppingCartServices.getProductShoppingCart({ token: authState.user.token });
				if (status === 200) {
					if (response.error) {
						console.log('error', response.error);
						return;
					} else {
						let quantity = 0;
						response.items.forEach((item) => (quantity = quantity + item.quantity));
						SetQuantity({ quantity });
					}
				} else {
					console.log('error', response);
				}
			} catch (e) {
				// GetQuantity failed
				console.log({ e });
			}
		}
		init();
	}, []);

	const getFindData = async (start) => {
		if (start === true) {
			setStartSearch(start);
			setPage(1);
			setPageProductsFounds(1);
			dispatch({ type: 'removeAll', value: {} });
			findProducts({ page: 1 });
		}
	};

	const backToDash = async () => {
		setPageProductsFounds(1);
		setStartSearch(false);
		setTextInput('');
		dispatch({ type: 'removeAll', value: {} });
		setActive(0);
		setPage(1);
		getProducts({ page: 1 });
	};

	const productsPerCategory = async ({ category, page, onEndReached }) => {
		if (onEndReached) {
			setPageProductsPerCategory(pageProductsPerCategory + 1);
		}
		//console.log('pageProducts', page)
		try {
			setLoading(true);
			const { status, response } = await productServices.productsPerCategory({ page: page, category: category });
			setLoading(false);
			//console.log(`pageProductsPerCategory ${page}`,response.docs)
			if (status === 200) {
				if (response.error) {
					notifyMessage(response.error);
					return;
				} else {
					response.docs.forEach((element) => {
						dispatch({ type: 'add', value: element });
					});
				}
			} else {
				setLoading(false);
				notifyMessage(response.error);
			}
		} catch (error) {
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	const addToShoppingCart = async ({ count, id }) => {
		try {
			setLoading(true);
			const { status, response } = await shoppingCartServices.addProductShoppingCart({ id, count, token: authState.user.token });
			setLoading(false);
			if (status === 200) {
				if (response.error) {
					console.log('error1', response);
					notifyMessage(response.error.message);
					return;
				} else {
					Increment({ number: count });
					notifyMessage('Añadido a tu carrito con exito');
				}
			} else {
				console.log('error2', response);
				notifyMessage(response.message);
			}
		} catch (error) {
			console.log('errorCatch', error);
			notifyMessage('Problemas al enviar o recibir los datos');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.search}>
				<Search
					startSearch={(start) => {
						getFindData(start);
						setSearchPerCategory(false);
					}}
					goBack={() => backToDash()}
					arrowBack={startSearch ? true : false}
					onChangeText={(text) => setTextInput(text)}
					setText={textInput}
				/>
			</View>
			{startSearch ? null : (
				<View style={{ height: 100, width: '100%', paddingVertical: 15, alignItems: 'center' }}>
					<FlatList
						data={categorys}
						horizontal={true}
						contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
						renderItem={({ item }) => (
							<Badge
								key={item._id}
								value={item.name}
								// textStyle={{ fontWeight: 'bold', height: 200, color: '#FFF' }}
								badgeStyle={{
									paddingHorizontal: 10,
									height: 50,
									marginHorizontal: 10,
									backgroundColor: active === item.index ? colors.tabIconSelected : 'rgba(38, 52, 118, 0.3)',
								}}
								onPress={() => {
									setActive(item.index);
									dispatch({ type: 'removeAll' });
									if (item.index === 0) {
										setSearchPerCategory(false);
										getProducts({ page: 1 });
										return;
									}
									setCategory(item._id);
									setSearchPerCategory(true);
									setPageProductsPerCategory(1);
									productsPerCategory({ category: item._id, page: 1, onEndReached: false });
								}}
							/>
						)}
					/>
				</View>
			)}
			<FlatList
				data={products.length ? products : null}
				horizontal={false}
				contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}
				renderItem={({ item }) => (
					<Product
						name={item.name}
						price={item.price}
						image={item.image}
						id={item._id}
						cart={false}
						setToastMessage={(message) => notifyMessage(message)}
						addToShoppingCart={addToShoppingCart}
					/>
				)}
				keyExtractor={(item) => item._id}
				onEndReached={() =>
					startSearch
						? () => {
								dispatch({ type: 'removeAll' });
								findProducts({ page: pageProductsFounds });
						  }
						: searchPerCategory
						? productsPerCategory({ category: category, page: pageProductsPerCategory + 1, onEndReached: true })
						: getProducts({ page: page })
				}
				onEndReachedThreshold={0.1}
			/>
			<Loader loading={loading} />
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 25,
		marginTop: 30,
		flexDirection: 'column',
	},
	search: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
	},
	viewText: {
		justifyContent: 'flex-end',
		height: '5%',
		borderBottomWidth: 2,
		borderBottomColor: 'rgb(26, 23, 152)',
		paddingLeft: '8%',
		color: '#40434E',
	},
});
