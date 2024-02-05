import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { colors } from '../constants';
import { AuthContext } from '../context';
import { MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation }) {
	const { authState, signOut } = useContext(AuthContext);

	const gotOut = () => {
		Alert.alert(
			'Cerrar sesion',
			'Esta seguro de cerrar la sesion ahora?',
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{ text: 'OK', onPress: signOut },
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={{ flex: 1, padding: 10 }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomColor: colors.tabIconSelected,
					borderBottomWidth: 3,
					height: '10%',
				}}
			>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>CREDITOS</Text>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{authState.user.balance}</Text>
			</View>
			<TouchableOpacity
				style={{
					width: '100%',
					height: '10%',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomColor: colors.tabIconSelected,
					borderBottomWidth: 3,
					flexDirection: 'row',
				}}
				onPress={() => {
					navigation.navigate('updateprofile');
				}}
			>
				<Text style={{ color: '#000', fontSize: 20 }}>Editar Perfil</Text>
				<MaterialCommunityIcons name='update' color={colors.tabIconSelected} size={24} />
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					width: '100%',
					height: '10%',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
					borderBottomColor: colors.tabIconSelected,
					borderBottomWidth: 3,
				}}
				onPress={() => {
					navigation.navigate('orderscreen');
				}}
			>
				<Text style={{ color: '#000', fontSize: 20 }}>Mis Ordenes</Text>
				<MaterialIcons name='list' color={colors.tabIconSelected} size={24} />
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					height: '10%',
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
					borderBottomWidth: 3,
					borderBottomColor: colors.tabIconSelected,
				}}
				onPress={gotOut}
			>
				<Text style={{ color: '#000', fontSize: 20 }}>Cerrar Sesion</Text>
				<Octicons name='sign-out' color={colors.tabIconSelected} size={24} />
			</TouchableOpacity>
		</View>
	);
}
