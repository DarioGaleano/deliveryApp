import { createAppContainer, createDrawerNavigator, DrawerItems, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Tab  from './MainTabNavigator';
import React from 'react';
import {View} from 'react-native'
import {Platform, AsyncStorage} from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen'
import SignInScreen from '../screens/auth/SignInScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
      </View>
    );
  }
}

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LoginStack = createStackNavigator(
  {
    login: LoginScreen,
    forgot: ForgotPasswordScreen,
    signin: SignInScreen
  },
  config
);

LoginStack.navigationOptions = {
};

LoginStack.path = ' ';


/*
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
);
*/

export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: Tab,
  Auth: LoginStack,
},
{
  initialRouteName:'AuthLoading',  
}

));