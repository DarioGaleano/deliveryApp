import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { filterNumber } from '../helpers';
import { colors } from '../constants';

export default function Select({
	containerStyles,
	data = [],
	onBlur,
	selectorValue,
	onChangeSelector,
	inputValue,
	onChangeInput,
	labelExtractor,
	inputPlaceHolder,
	maxLength = 10,
}) {
	return (
		<View
			style={[
				{
					flexDirection: 'row',
					marginBottom: 5,
					marginTop: 5,
					paddingLeft: 10,
					width: '100%',
					height: 40,
					borderColor: '#a4a4a4',
					borderWidth: 1,
					borderRadius: 5,
					marginTop: 5,
					...containerStyles,
				},
			]}
		>
			<ModalSelector
				style={[styles.selectCode]}
				data={data}
				supportedOrientations={['portrait']}
				accessible={true}
				scrollViewAccessibilityLabel={'Scrollable options'}
				cancelButtonAccessibilityLabel={'Cancel Button'}
				onChange={onChangeSelector}
				keyExtractor={({ index }) => index}
				labelExtractor={labelExtractor}
			>
				<View style={{ width: '100%', flexDirection: 'row' }}>
					<TextInput
						style={{ width: '50%' }}
						editable={false}
						value={selectorValue}
						placeholder={selectorValue}
						placeholderTextColor={'#000'}
					/>
					<View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
						<Ionicons name={'ios-arrow-down'} size={20} color={colors.tintColor} />
					</View>
				</View>
			</ModalSelector>

			<TextInput
				style={[styles.inputPhone]}
				placeholder={inputPlaceHolder}
				placeholderTextColor={'black'}
				keyboardType={'phone-pad'}
				maxLength={maxLength}
				value={inputValue}
				onChangeText={onChangeInput}
				onBlur={onBlur}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	selectCode: {
		width: '30%',
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
		borderRightWidth: 1,
		borderColor: '#a4a4a4',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
	},
	inputPhone: {
		paddingLeft: 10,
		width: '70%',
		borderLeftWidth: 0,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
});
