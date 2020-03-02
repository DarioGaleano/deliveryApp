import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen'
import TabBarIcon from '../components/TabBarIcon'
import {View} from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    home: HomeScreen,
    details:  DetailsScreen,

  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: ' ',
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-home'} />
  ),
};

HomeStack.path = '';

const CartStack = createStackNavigator(
  {
    home: HomeScreen,
    details:  DetailsScreen,

  },
  config
);

CartStack.navigationOptions = {
  tabBarLabel: ' ',
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-cart'} />
  ),
};

CartStack.path = '';

const AccountStack = createStackNavigator(
  {
    home: HomeScreen,
    details:  DetailsScreen,

  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: ' ',
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-person'} />
  ),
};

AccountStack.path = '';
/*const MenuStack = createStackNavigator(
  {
    menu: MenuScreen,
    claims: ClaimsScreen,
    calendar: CalendarScreen,
    search: SearchScreen,
    home: HomeScreen,
  },
  config
);

MenuStack.navigationOptions = ({navigation}) => ({
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <MenuIcon focused={focused} 
      name={'menu'} 
    />
        
  ),
  tabBarOnPress: () => {navigation.openDrawer()}
});

MenuStack.path = '';
*/
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CartStack,
  AccountStack
  },
  {
    initialRouteName: 'HomeStack',
    
    tabBarOptions: {
      style: {
        backgroundColor: 'rgb(26, 23, 152)',

      },
      showLabel: false,
    },
  }
);
tabNavigator.path = '';


export default tabNavigator;


