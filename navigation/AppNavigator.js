import { createAppContainer, createDrawerNavigator, DrawerItems, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Tab  from './MainTabNavigator';
import React from 'react';
import {Platform, AsyncStorage} from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen'
import SignInScreen from '../screens/auth/SignInScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

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
  Main: Tab,
  Login: LoginStack,
},
{
  initialRouteName:  AsyncStorage.getItem('token')? 'Main': 'Login',  
}

));