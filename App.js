import React, { useState, useEffect, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { HomeStackScreen, ShoppingCartStackScreen, ProfileStackScreen } from "./src/navigation";
import { colors } from "./src/constants";
import { LoginScreen, SingInScreen, SplashScreen } from "./src/screens";
import { AuthContext } from "./src/context";

function App() {
  const Tab = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
            name: action.name
          };
        case "LOGIN":
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            name: action.name
          };
        case "LOGOUT":
          return {
            ...prevState,
            isSignout: true,
            token: null,
            name: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
      name:null
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      console.log('effect', userToken)
      dispatch({ type: "RESTORE_TOKEN", token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ token, name }) => {
        try {
          await AsyncStorage.setItem("token", JSON.stringify(token));
        } catch (e) {
          console.log(e);
        }
        try {
          await AsyncStorage.setItem("username", JSON.stringify(name));
        } catch (e) {
          console.log(e);
        }
        console.log('here')

        console.log('user token: ', token);
        
        dispatch({ type: "LOGIN", token: token, name: name });
      },
      signOut: async() => {
        await AsyncStorage.removeItem('token');  
        dispatch({ type: "LOGOUT" })
      },
      /*signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },*/
    }),
    []
  );

  /*if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }*/

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.token === null ? (
          <AuthStack.Navigator>
            <AuthStack.Screen
              options={{
                headerStyle: {
                  backgroundColor: colors.tabIconSelected,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerTitleStyle: { fontWeight: "bold" },
                headerTitle:'Iniciar Sesion'
              }}
              name="login"
              component={LoginScreen}
            />
            <AuthStack.Screen
              options={{
                headerStyle: {
                  backgroundColor: colors.tabIconSelected,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerTitleStyle: { fontWeight: "bold" },
                headerTitle:'Registrar usuario'
              }}
              name="signin"
              component={SingInScreen}
            />
          </AuthStack.Navigator>
        ) : (
          <Tab.Navigator screenOptions={({ route })=>({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if(route.name === 'Home'){
                  iconName = focused ? 'ios-home' : 'md-home';
                }
                else if(route.name === 'Cart'){
                  iconName = focused ? 'ios-cart' : 'md-cart';
                }
                else if(route.name === 'Profile'){
                  iconName = focused ?  'ios-person' : 'md-person'
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor:'tomato',
              inactiveTintColor: 'gray'
            }}
            >
            <Tab.Screen  name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Cart" component={ShoppingCartStackScreen}/>
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
