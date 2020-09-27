import React,{useState, useEffect, useReducer} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TextInput,AsyncStorage } from 'react-native';
import { Search, Product, Loader } from '../components'
import { data } from '../constants'
import Toast from "react-native-root-toast";
import { Badge } from 'react-native-elements';
import { productServices } from '../services'

let index=0;
const categorys=[
  { name:"Enlatados", key:index++, active:false },
  { name:"Licores", key:index++, active:false},
  { name:"Granos", key:index++, active:false},
  { name:"Refrescos", key:index++, active:false}

]

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
  const [backgroundBadge, setBackgroundBagde]=useState('green')
  const [active, setActive]=useState('')
  const getProducts= async (page) => {
    console.log("PAGE",page)
    try {
      setLoading(true)
      const { status, response } = await productServices.getProducts({page});
      setLoading(false)
      console.log("AQUI",response.docs)
      if (status === 200) {
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
        setLoading(false)
        Toast.show(response.error, {      
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

    try {
      const { status, response } = await productServices.findProducts({ page, textInput }) 

      if (status === 200) {
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
      <View style={{height:100, width:'100%', paddingVertical:15, alignItems:'center'}}>
        <FlatList
            data={ categorys}
            horizontal={true}
            contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
            renderItem={ (item) => 
              <Badge 
                value={item.item.name}
                active={active}
                index={item.item.key}
                status="error"
                badgeStyle={{width:100, height:50, marginHorizontal:10, backgroundColor:active===item.item.key? 'red':'green'}}
                onPress={()=> setActive(item.item.key) }
              />
            }
            keyExtractor={item=> item.key}
          />
      </View>
        <FlatList
          data={ products[0]!=={}? products : null }
          horizontal={false}
          contentContainerStyle={{justifyContent:'center', alignItems:'center', paddingTop:5}}
          renderItem={ (item) => 
            <Product 
              name={item.item.name} 
              price={item.item.price}
              image={item.item.image}
              id={item.item._id}
              cart={false}
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
    marginTop:30,
    flexDirection: 'column',
  },
  search:{
    justifyContent: 'center',
    alignItems:'center',
    height: 40,
    
    
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