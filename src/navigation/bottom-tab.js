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
  OrderScreen,
  OrderDetails,
  WebViewPayPal,
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
    </HomeStack.Navigator>
  );
}

const ShoppingCartStack = createStackNavigator();

function ShoppingCartStackScreen() {

  const DataShoppingCartStack = [
    { key:1, headerTitle:'Tu pedido',       name:'payment', component:PaymentScreen },
    { key:2, headerTitle:'Realiza tu pago', name:'webview', component:WebViewPayPal },
    { key:3, headerTitle:'Factura',         name:'thanks',  component:ThankYouPage },
  ]

  return (
    <ShoppingCartStack.Navigator>
      <ShoppingCartStack.Screen options={{headerShown:false}} name="cart" component={ShoppinCartScreen} />
      {
        DataShoppingCartStack.map((item) => (
          <ProfileStack.Screen key={item.key}
            options={{
              headerStyle: {
                backgroundColor: colors.tabIconSelected,
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitle:item.headerTitle,
              headerTitleStyle: { fontWeight: "bold" },
            }}
            name={item.name} component={item.component} 
          />
        ))
      }
    </ShoppingCartStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {

  const DataProfileStack=[
    { key:1, headerTitle:'Perfil de usuario',    name:'Profile',       component:AccountScreen },
    { key:2, headerTitle:'Editar Usuario',       name:'UpdateProfile', component:UpdateProfile },
    { key:3, headerTitle:'Mis Ordenes',          name:'OrderScreen',   component:OrderScreen },
    { key:4, headerTitle:'Detalles de la orden', name:'OrderDetails',  component:OrderDetails },
  ]
  
  return (
    <ProfileStack.Navigator>
      {
        DataProfileStack.map((item) => (
          <ProfileStack.Screen key={item.key}
            options={{
              headerStyle: {
                backgroundColor: colors.tabIconSelected,
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitle:item.headerTitle,
              headerTitleStyle: { fontWeight: "bold" },
            }}
            name={item.name} component={item.component} 
          />
        ))
      }
    </ProfileStack.Navigator>
  );
}

export { HomeStackScreen, ShoppingCartStackScreen, ProfileStackScreen };
