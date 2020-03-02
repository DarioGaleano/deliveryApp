import React,{useState, useEffect, useReducer} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import Search from '../components/Search'
import Product from '../components/Product';
import data from '../screens/data.json'
import Toast from "react-native-root-toast";
import config from '../config/'
import Loader from '../components/Loader'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function SearchScreen(props) { 
    
  const [products, dispatch] = useReducer((myArray, { type, value }) => {
    switch (type) {
      case "add":
        return [...myArray, value];
      case "remove":
        return myArray.filter((_, index) => index !== value);
      case "remove":
        return [];
      default:
        return myArray;
    }
  }, []);    

  const [page, setPage]=useState(1);
  const [textInput, setTextInput]= useState('')
  const [startSearch, setStartSearch]=useState(false);
  const [isFetching, setIsFetching]=useState(false)
  const [loading, setLoading]=useState(false)

  const getProducts=async (page)=>{
    setLoading(true)
    setIsFetching(true)
    console.log("BUSCANDOOOOOOOOOO")
    console.log(productsFounds)

    try {
      let request = await fetch(config.endpoint + "/findproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          page:page,
          //limit: items per page
          limit:1,
          query: textInput
        })
      });

      const response = await request.json();
      if (request.status === 200) {
        if (response.error) {
          setLoading(false )
          Toast.show(response.error.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          });
          return;
        } else {
          setLoading(false)
          await setPageProductsFounds(page+1)
          console.log(response)
          response.docs.forEach(element => {
            dispatchProductsFounds({type:"add", value:element})
          });          
        }
      } else {
        setLoading(false)
        Toast.show(response.error.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      Toast.show("Problemas al enviar o recibir los datos", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
    setIsFetching(false)
  }

  useEffect(()=>{getProducts(page)},[])

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Search
          startSearch={(start)=> {
            console.log("Buscar:",start)
            setStartSearch(start)
          }}
          goBack={()=>setStartSearch(false)}
          arrowBack={startSearch? true:false}
          onChangeText={(text) => setTextInput(text)}
        />
      </View>
        <FlatList
          data={products[0]!=={}? products: null}
          horizontal={false}
          renderItem={ (item) => 
            <Product 
              name={item.item.name} 
              price={item.item.price}
              image={item.item.image}
            />
          }
          keyExtractor={item=> item._id}
          onEndReached={()=> getProducts(page)}
          onEndReachedThreshold={0}
        />
      <Loader
        loading={loading}
      />
    </View>
    )
}

SearchScreen.navigationOptions = {
  header: null,
};
const styles= StyleSheet.create({
  container:{
    flex:1,
    marginHorizontal:10,
    flexDirection: 'column',
  },
  search:{
    justifyContent: 'center',
    alignItems:'center',
    height: '15%',
    
  },
  viewText:{
    justifyContent: 'flex-end',
    height: '5%',
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(26, 23, 152)',
    paddingLeft: '8%',
    color: "#40434E", 
  },
 
})