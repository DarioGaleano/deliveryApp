import React,{useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList} from 'react-native'
import Colors from '../constants/Colors'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import ButtonBottom from '../components/ButtonBottom'
import { withTheme } from 'react-native-elements';



function Tip(props){
    let symbol=props.amount!=='Otro'? '$':'';

    return(
        <TouchableOpacity style={{  backgroundColor: props.active===props.index?'red':'white', width:60, height:40, borderWidth:1, borderColor:'gray', borderRadius:5, justifyContent:'center', alignItems:'center'}}
            onPress={()=>props.changeTip(props.amount, props.index)}
        >
            <Text style={styles.text}>{symbol}{props.amount}</Text>
        </TouchableOpacity>
    )
}


let index=0;
const tips=[
    { amount:'0', key:index++, active:false },
    { amount:'100', key:index++, active:false },
    { amount:'250', key:index++, active:false },
    { amount:'Otro', key:index++, active:false },
]
export default function PaymentScreen(props){
    const [paymentType, setPaymentType]=useState('paypal')
    const [tip, setTip]=useState('0.00')
    const [active, setActive]=useState('')
    const setNewTip= async(amount, index)=>{
        await setActive(index)
        await setTip(amount)
    }
    return (    
        <View style={styles.container}>
            <View style={[styles.boxShadow,{ height: 150,}]}>
                <View style={{height:'20%', justifyContent:'center'}}>
                    <Text style={styles.textTitle}>
                        Direccion    
                    </Text>
                </View>
                <View style={{height:'20%', justifyContent:'center'}}>
                    <Text style={styles.textTitle}>
                    Anzoategui, Venezuela    
                    </Text>
                </View>
                <View style={{height:'40%', justifyContent:'center', flexDirection:'row', backgroundColor:'#e6e7e8', justifyContent:'center', borderRadius:10}}>
                    <TextInput
                        style={{ height:'90%', width:'90%', paddingLeft:10, }}
                        placeholder={'Ingrese su direccion'}
                    />
                    <View style={{ height:'100%', width:'10%', justifyContent:'center'}}>
                        <SimpleLineIcons
                            name={'pencil'}
                            size={20}
                            color={'black'}
                        />
                    </View>
                </View>
            </View>
            
            <View style={[styles.boxShadow, { height: 70, justifyContent:'center'}]}>
                <View style={{width:'100%', height:'40%', flexDirection:'row'}}>
                    <View style={{ width:'10%'}}>
                        <SimpleLineIcons
                            name={'paypal'}
                            color={Colors.tabIconSelected}
                            size={20}
                        />
                    </View>
                    <View style={{ width:'30%' }}>
                        <Text style={styles.textTitle}>Paypal</Text>
                    </View>
                    <TouchableOpacity style={{width:'60%', alignItems:'flex-end'}}>
                        <Text style={[styles.textTitle, {color:Colors.tabIconSelected}]}>Cambiar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.boxShadow, { height: 100,}]}>
                <View style={{height:'20%', justifyContent:'center'}}>
                    <Text style={styles.textTitle}>Propina</Text>
                </View>
                <View style={{height:'80%' ,flexDirection:'row'}}>
                <FlatList
                    data={ tips}
                    horizontal={true}
                    contentContainerStyle={{flexGrow:1,justifyContent:'space-between', alignItems:'center', alignContent:'space-between'}}
                    renderItem={ (item) => 
                    <Tip 
                        active={active}
                        amount={item.item.amount}
                        index={item.item.key}
                        changeTip={setNewTip}
                    />
                    }
                    keyExtractor={item=> item.key}
                />
                </View>
            </View>

            <View style={[styles.boxShadow, { height: 150,}]}>
                <View style={{height:'20%', justifyContent:'center'}}>
                    <Text style={styles.textTitle}>Resumen</Text>
                </View>
                <View style={{height:'20%', justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={styles.text}>Costo de productos</Text>
                <Text style={styles.text}>${props.navigation.getParam('totalAmount')}</Text>
                </View>
                <View style={{height:'20%', justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={styles.text}>Costo de envio</Text>
                    <Text style={styles.text}>$0.00</Text>
                </View>
                <View style={{height:'20%', justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={styles.text}>Propina</Text>
                    <Text style={styles.text}>${tip}</Text>
                </View>
            </View>
           
            <ButtonBottom
                text={'Continuar'}
            />
            
        </View>
    )
}
PaymentScreen.navigationOptions = {
  title: 'Tu pedido',
  headerStyle: {
    backgroundColor: Colors.tabIconSelected,
  },
  headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign:"center", 
          flex:1 
        },
  headerRight: (
    <View>
    </View>
  ),
  headerLeft: (
    <TouchableOpacity onPress>
        <Ionicons
            name={'ios-arrow-round-back'}
            color={'black'}
        />
    </TouchableOpacity>
  ),
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10,
        marginVertical:30,
        justifyContent:'space-between',
        flexDirection:'column',
        alignItems:'center'
    },
    boxShadow:{
        padding:10,
        flexDirection:'column',
        width:'90%',
        borderRadius:10,
        backgroundColor:'white',
        zIndex:1,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width:2 },
        shadowOpacity: 2, 
        elevation: 2,
    },
    textTitle:{
        fontSize:15,
    },
    text:{
        fontSize:10,
    }


})