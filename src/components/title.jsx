import React from 'react';
import { View, Text } from 'react-native';

export default function Title(props) {
	return (
		<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
			<View
				style={{
					width: '90%',
					borderColor: '#39396A',
					borderWidth: 2,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 1,
					borderRadius: 50,
					shadowColor: '#39396A',
					shadowOffset: { height: 5, width: 0 },
					elevation: 5,
				}}
			>
				<Text style={{ fontSize: 24, fontFamily: 'serif', fontWeight: 'bold', color: '#39396A', padding: 10 }}>DELIVERY APP</Text>
			</View>
		</View>
	);
}
