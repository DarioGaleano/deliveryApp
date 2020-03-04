import React,{useState, useEffect, useReducer} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TextInput,AsyncStorage } from 'react-native';
import Search from '../components/Search'
import Product from '../components/Product';
import data from '../screens/data.json'
import Toast from "react-native-root-toast";
import config from '../config/'
import Loader from '../components/Loader'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HomeScreen(props) { 
  
  
  const [products, dispatch] = useReducer((myArray, { type, value }) => {
    switch (type) {
      case "add":
        return [...myArray, value];
      case "remove":
        return myArray.filter((_, index) => index !== value);
      case "removeAll":
        return [];
      default:
        return myArray;
    }
  }, []);    

  const [page, setPage]=useState(1);
  const [pageProductsFounds, setPageProductsFounds]=useState(1);
  const [textInput, setTextInput]= useState('')
  const [startSearch, setStartSearch]=useState(false);
  const [isFetching, setIsFetching]=useState(false)
  const [loading, setLoading]=useState(false)

  const getProducts= async (page) => {
    setLoading(true)
    setIsFetching(true)
    console.log("PAGE",page)
    try {
      let request = await fetch(config.endpoint + "/getproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          page:page,
          //limit: items per page
	        limit:1
        })
      });
      setLoading(false )
      setIsFetching(false)
      const response = await request.json();
      console.log("AQUI",response.docs)
      if (request.status === 200) {
        if (response.error) {
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
          await setPage(page+1)
          response.docs.forEach(element => {
            dispatch({type:"add", value:element})
          });
          
          console.log("PRODUCTOS",products)
        }
      } else {
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
      Toast.show("Problemas al enviar o recibir los datos", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  };

  const findProducts=async (page)=>{
    setLoading(true)
    setIsFetching(true)
    console.log("BUSCANDOOOOOOOOOO")

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
            dispatch({type:"add", value:element})
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

  console.log("setStartSearch",startSearch)
  
  const getFindData=async(start)=>{
    console.log("Buscar:",start)
    console.log(await AsyncStorage.getItem('token'));
    if(start===true){
      await setStartSearch(start)
      await setPage(1)
      await dispatch({type:"removeAll", value:{}})
      findProducts(pageProductsFounds)
    }
  }

  const backToDash=async ()=>{
    await setPageProductsFounds(1)
    await setStartSearch(false);
    await setTextInput('');
    await dispatch({type:"removeAll", value:{}})
    getProducts(page)
  }
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Search
          startSearch={(start)=> getFindData(start)}
          goBack={()=> backToDash()}
          arrowBack={startSearch? true:false}
          onChangeText={(text) => setTextInput(text)}
          setText={textInput}
        />
      </View>
        <FlatList
          data={ products[0]!=={}? products : null }
          horizontal={false}
          renderItem={ (item) => 
            <Product 
              name={item.item.name} 
              price={item.item.price}
              image={item.item.image}
              id={item.item._id}
              addMore={false}
            />
          }
          keyExtractor={item=> item._id}
          onEndReached={()=> 
            !startSearch===true? 
              getProducts(page)
                : findProducts(pageProductsFounds) 
          }
          onEndReachedThreshold={0}
        />
      <Loader
        loading={loading}
      />
    </View>
    )
}

HomeScreen.navigationOptions = {
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