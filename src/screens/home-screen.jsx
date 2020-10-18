import React,{useState, useEffect, useReducer, useContext} from 'react';
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import { Search, Product, Loader } from '../components'
import { Badge } from 'react-native-elements';
import { productServices } from '../services'
import { shoppingCartServices } from '../services'
import { BadgeContext } from '../context'

export default function HomeScreen({ route, navigation }) { 

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
  const [pageProductsPerCategory, setPageProductsPerCategory]=useState(1)
  const [textInput, setTextInput]= useState('')
  const [startSearch, setStartSearch]=useState(false);
  const [searchPerCategory, setSearchPerCategory]=useState(false)
  const [category, setCategory]=useState('')
  const [loading, setLoading]=useState(false)
  const [active, setActive]=useState(0)
  const [categorys, setCategorys]=useState([])

  const { SetQuantity } = useContext(BadgeContext)
  const showToastMessage = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
  }

  const getProducts= async ({page}) => {
    try {
      setLoading(true)
      const { status, response } = await productServices.getProducts({page:page});
      setLoading(false)
      //console.log(`page ${page}`,response.docs.length)
      if (status === 200) {
        if (response.error) {
          showToastMessage(response.error.message)
          return;
        } else {
          setPage(page+1)
          response.docs.forEach(element => {
            dispatch({type:"add", value:element})
          });
        }
      } else {
        setLoading(false)
        showToastMessage(response.error)
      }
    } catch (error) {
      showToastMessage("Problemas al enviar o recibir los datos")
    }
  };

  const findProducts=async ({page})=>{
    setLoading(true)
    try {
      const { status, response } = await productServices.findProducts({ page:page, textInput }) 
      if (status === 200) {
        if (response.error) {
          showToastMessage(response.error.message)
          return;
        } else {
          setLoading(false)
          setPageProductsFounds(pageProductsFounds+1)
         // console.log(response)
          response.docs.forEach(element => {
            dispatch({type:"add", value:element})
          });          
        }
      } else {
          setLoading(false)
          showToastMessage(response.error.message)
      }
    } catch (error) {
        console.log(error)
        setLoading(false)
        showToastMessage("Problemas al enviar o recibir los datos");
    }
  }

  useEffect(()=>{
    async function init(){
      getProducts({page:1})
     
      //getCategories
      try{
        const { status, response } = await productServices.getCategorys();
        if (status === 200) {
          if (response.error) {
            console.log('error1', response.error.message);
            return;
          } else {
            console.log('categorys', response)
            let i=0;
            let array=[]
            array.push({
              name:"Todos",
              index:i++
            })
            response.forEach(item => array.push({
              name:item.name,
              index:i++
            }))
            setCategorys(array)
          }
        } else {
          console.log('error2', response.error.message);
        }
      }catch(error){
        console.log('errorCatch', error);
      }

      //setQuantity in badge
      try{
        const { status, response } = await shoppingCartServices.getProductShoppingCart()
        if (status === 200) {
          if (response.error) {
            console.log(response.error.message);
            return;
          } else {
            let quantity=0;
            response.items.forEach(item => quantity=quantity+item.quantity)
            SetQuantity({ quantity })
          }
        } else {
          console.log('error', response);
        }
      }catch(e){
        // GetQuantity failed
        console.log(e)
      }

    }
    init()
  },[])
  
  const getFindData=async(start)=>{
    //console.log("Buscar:",start)
    //console.log(await AsyncStorage.getItem('token'));
    if(start===true){
      setStartSearch(start)
      setPage(1)
      setPageProductsFounds(1)
      dispatch({type:"removeAll", value:{}})
      findProducts({page:1})
    }
  }

  const backToDash=async ()=>{
    setPageProductsFounds(1)
    setStartSearch(false);
    setTextInput('');
    dispatch({type:"removeAll", value:{}})
    setActive(0)
    setPage(1)
    getProducts({page:1})
  }
  
  const productsPerCategory = async({ category, page, onEndReached }) => {
    if(onEndReached){
      setPageProductsPerCategory(pageProductsPerCategory+1);
    }
    //console.log('pageProducts', page)
    try {
      setLoading(true)
      const { status, response } = await productServices.productsPerCategory({page:page, category:category});
      setLoading(false)
      //console.log(`pageProductsPerCategory ${page}`,response.docs)
      if (status === 200) {
        if (response.error) {
          showToastMessage(response.error.message)
          return;
        } else {
          response.docs.forEach(element => {
            dispatch({type:"add", value:element})
          });
        }
      } else {
        setLoading(false)
        showToastMessage(response.error)
      }
    } catch (error) {
      showToastMessage("Problemas al enviar o recibir los datos")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Search
          startSearch={(start) => {getFindData(start); setSearchPerCategory(false)}}
          goBack={()=> backToDash()}
          arrowBack={startSearch? true:false}
          onChangeText={(text) => setTextInput(text)}
          setText={textInput}
        />
      </View>
      {
        startSearch? null:
      <View style={{height:100, width:'100%', paddingVertical:15, alignItems:'center'}}>
        <FlatList
          data={ categorys }
          horizontal={true}
          contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
          renderItem={ ({ item }) => 
            <Badge 
              value={item.name}
              textStyle={{fontWeight:"bold"}}
              badgeStyle={{ paddingHorizontal:10, height:50, marginHorizontal:10, backgroundColor:active===item.index? 'red':'green',}}
              onPress={() => { 
                setActive(item.index); 
                dispatch({type:"removeAll"})
                if(item.index===0) {
                  setSearchPerCategory(false)
                  getProducts({page:1}); 
                  return;
                }
                setCategory(item.name)
                setSearchPerCategory(true)
                setPageProductsPerCategory(1)
                productsPerCategory({category:item.name, page:1, onEndReached:false})
                
              }}
            />
          }
          keyExtractor={item=> item.index.toString()}
        />
      </View>
      }
      <FlatList
        data={ products[0]!=={}? products : null }
        horizontal={false}
        contentContainerStyle={{justifyContent:'center', alignItems:'center', paddingTop:5,}}
        renderItem={ ({ item }) => 
          <Product 
            name={item.name} 
            price={item.price}
            image={item.image}
            id={item._id}
            cart={false}
            setToastMessage={(message) => showToastMessage(message)}
          />
        }
        keyExtractor={item=> item._id}
        onEndReached={()=> 
          startSearch? 
            findProducts({page:pageProductsFounds})
            : searchPerCategory? productsPerCategory({category:category, page:pageProductsPerCategory+1, onEndReached:true}) 
              : getProducts({page:page})
        }
        onEndReachedThreshold={0.1}
      />
      <Loader loading={loading} />
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