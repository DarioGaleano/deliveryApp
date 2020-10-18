import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  SearchScreen,
  ShoppinCartScreen,
  PaymentScreen,
  DetailsScreen,
  AccountScreen,
  UpdateProfile,
  TestWebView,
  ThankYouPage
} from "../screens";
import { colors } from '../constants'
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const ShoppingCartStack = createStackNavigator();

function ShoppingCartStackScreen() {
  return (
    <ShoppingCartStack.Navigator>
      <ShoppingCartStack.Screen options={{headerShown:false}} name="cart" component={ShoppinCartScreen} />
      <ShoppingCartStack.Screen 
        options={{
          headerStyle: {
            backgroundColor: colors.tabIconSelected,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitle:'Tu pedido',
          headerTitleStyle: { fontWeight: "bold" },
        }}
        name='payment' component={PaymentScreen} />
      <ShoppingCartStack.Screen 
        options={{
          headerStyle: {
            backgroundColor: colors.tabIconSelected,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitle:'Realiza tu pago',
          headerTitleStyle: { fontWeight: "bold" },
        }}
        name='webview' component={TestWebView} />
      <ShoppingCartStack.Screen 
        options={{
          headerStyle: {
            backgroundColor: colors.tabIconSelected,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitle:'Factura',
          headerLeft:null,
          headerTitleStyle: { fontWeight: "bold" },
        }}
        name='thanks' component={ThankYouPage} />
    </ShoppingCartStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        options={{
          headerStyle: {
            backgroundColor: colors.tabIconSelected,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitle:'Perfil de usuario',
          headerTitleStyle: { fontWeight: "bold" },
        }}
        name="Profile" component={AccountScreen} 
      />
       <ProfileStack.Screen 
        options={{
          headerStyle: {
            backgroundColor: colors.tabIconSelected,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitle:'Editar Usuario',
          headerTitleStyle: { fontWeight: "bold" },
        }}
        name="UpdateProfile" component={UpdateProfile} 
      />
    </ProfileStack.Navigator>
  );
}

export { HomeStackScreen, ShoppingCartStackScreen, ProfileStackScreen };
