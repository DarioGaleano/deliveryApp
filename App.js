import React, { useMemo, useEffect, useReducer } from "react";
import {  View,  Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { HomeStackScreen, ShoppingCartStackScreen, ProfileStackScreen } from "./src/navigation";
import { colors } from "./src/constants";
import { LoginScreen, SingInScreen, SplashScreen, ForgotPasswordScreen } from "./src/screens";
import { AuthContext, BadgeContext } from "./src/context";
import IconBadge from 'react-native-icon-badge';
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

  const [stateBadge, badgeDispatch]=useReducer(
    (prevState, action) => {
      switch(action.type){
        case "INCREMENT":{
          return {
            ...prevState,
            number:prevState.number+action.number,
          }
        };
        case "DECREMENT":{
          return {
            ...prevState,
            number:prevState.number-action.number,
          }
        };
        case "REMOVEALL":{
          return {
            ...prevState,
            number:0,
          }
        };
        case "SETSHOPINGCART":{
          return {
            ...prevState,
            number:action.number
          }
        }
      }
    },
    {
      number:0
    }
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try{
        let userToken = await AsyncStorage.getItem("token");
        dispatch({ type: "RESTORE_TOKEN", token: userToken});
      }catch(e){
        console.log(e)
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo( () => ({
    signIn: async ({ token, user }) => {
      try {
        await AsyncStorage.setItem("token", JSON.stringify(token));
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log(e);
      }
      //console.log('user token: ', token);
      dispatch({ type: "LOGIN", token: token, name: user.name });
    },
    signOut: async() => {
      await AsyncStorage.removeItem('token');  
      dispatch({ type: "LOGOUT" })
    },
  }),[]);

  const badgeContext = useMemo( () => ({
    Increment: async({number}) =>{
      badgeDispatch({type: "INCREMENT", number: number})
    },
    Decrement: async({number}) => {
      badgeDispatch({type: "DECREMENT", number: number})
    },
    SetQuantity: async({quantity}) => {
      badgeDispatch({type:"SETSHOPINGCART", number:quantity})
    }
  }))

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          state.isLoading? <SplashScreen /> : state.token === null ? (
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
             <AuthStack.Screen
              options={{
                headerStyle: {
                  backgroundColor: colors.tabIconSelected,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerTitleStyle: { fontWeight: "bold" },
                headerTitle:'Restaurar contraseña'
              }}
              name="forgot"
              component={ForgotPasswordScreen}
            />
          </AuthStack.Navigator>
        ) : (
          <BadgeContext.Provider value={badgeContext}>
            <Tab.Navigator screenOptions={({ route })=>({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if(route.name === 'Home'){
                  iconName = 'ios-home';
                }
                else if(route.name === 'Cart'){
                  iconName = 'ios-cart';
                  return <View style={{width:30,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                            <IconBadge
                              MainElement={
                                <Ionicons name={iconName} size={30} color={color} style={{zIndex:1}}/>
                              }
                              BadgeElement={
                                <Text style={{color:'#FFFFFF', fontSize:8, }}>{stateBadge.number}</Text>
                              }
                              IconBadgeStyle={
                                {
                                  width:20,
                                  height:20,
                                  left:15,
                                  marginTop:-5,
                                  marginLeft:2,
                                  zIndex:0,
                                  borderRadius:10,
                                  backgroundColor: 'red'
                                }
                              }
                              Hidden={stateBadge.number===0}
                              />
                          </View> 
                }
                else if(route.name === 'Profile'){
                  iconName = 'ios-person';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor:'tomato',
              inactiveTintColor: 'gray',
              labelStyle:{
                marginBottom:5,
                marginTop:0
              },
              style:{
                height:60
              }
            }}
            >
            <Tab.Screen  name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Cart" component={ShoppingCartStackScreen}/>
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
          </BadgeContext.Provider>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
