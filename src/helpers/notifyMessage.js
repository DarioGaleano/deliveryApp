import { ToastAndroid, Platform, AlertIOS } from 'react-native';

export default function notifyMessage(msg) {
	if (Platform.OS === 'android') {
		ToastAndroid.show(msg, ToastAndroid.LONG);
	} else {
		AlertIOS.alert(msg);
	}
}
