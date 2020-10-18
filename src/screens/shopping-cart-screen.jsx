import React, {
  Component,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Product, Loader, ButtonBottom } from "../components";
import { colors } from "../constants";
import { shoppingCartServices } from "../services";
import formatAmount from '../helpers/formatAmount'
export default function ShoppinCartScreen({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState("");

  const showToastMessage = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
  }

  const setProduct = async (data, newTotal) => {
    setTotal(newTotal);
    setProducts(data);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        try {
          if (isActive) {
            setLoading(true);
            const {
              status,
              response,
            } = await shoppingCartServices.getProductShoppingCart();
            setLoading(false);
            if (status === 200) {
              if (response.error) {
                showToastMessage(response.error.message);
                return;
              } else {
                let productsAux = [];
                setTotal(response.totalAmount);
                response.items.forEach((element) => {
                  productsAux.push(element);
                });
                setProducts(productsAux);
              }
            } else {
              showToastMessage(response.error.message);
            }
          }
        } catch (e) {
          // Handle error
        }
      };
      fetchData();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const onSubmit = () => {
    if(products.length===0)
    {
      showToastMessage('Debes agregar al menos un producto a tu carrito')
      return;
    }
    navigation.navigate("payment", { totalAmount: total })
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "20%",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "30%", height: "70%" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode={"contain"}
            source={require("../../assets/images/shopping-cart.png")}
          />
        </View>
        <View style={{ width: "70%", height: "70%", padding: 10 }}>
          <View>
            <Text>Total a pagar: {formatAmount(total)}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "100%", height: "70%" }}>
        <FlatList
          data={products[0] !== {} ? products : null}
          horizontal={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
          }}
          renderItem={(item) => (
            <Product
              name={item.item.product.name}
              price={item.item.product.price}
              image={item.item.product.image}
              id={item.item._id}
              cart={true}
              quantity={item.item.quantity}
              setProduct={setProduct}
              newTotal={(newTotal) => setTotal(newTotal)}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>

      <ButtonBottom
        onPress={onSubmit}
        style={{width:"80%", height:40, justifyContent:"center", alignitems:"center", }}
        text={"Realizar Compra"}
      />
      <Loader loading={loading} />
    </View>
  );
}

ShoppinCartScreen.navigationOptions = {
  title: "Carrito de Compras",
  headerStyle: {
    backgroundColor: colors.tabIconSelected,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  headerRight: <View></View>,
  headerLeft: <View></View>,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "8%",
    marginHorizontal: 10,
  },
});
