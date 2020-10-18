import React,{useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView, KeyboardAvoidingView, AsyncStorage} from 'react-native'
import { colors, } from '../constants/'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { ButtonBottom } from '../components/'
import { withTheme } from 'react-native-elements';
import formatAmount from '../helpers/formatAmount'
import RadioGroup from 'react-native-radio-buttons-group';



function Tip(props){

    return(
        <TouchableOpacity style={{ borderColor:props.active===props.index?'red':'gray',backgroundColor: props.active===props.index?'red':'white', width:60, height:40, borderWidth:1, borderRadius:5, justifyContent:'center', alignItems:'center'}}
            onPress={()=>props.changeTip(props.amount, props.index)}
        >
            <Text style={[styles.text, {color:props.active===props.index?'#FFF':'#000'}]}>{`$${props.amount}`}</Text>
        </TouchableOpacity>
    )
}

function filterNumber(value){
    return value.replace(/[^0-9.]/g, "");
}

let index=0;
const tips=[
    { amount:'0,00', key:index++, active:false },
    { amount:'100', key:index++, active:false },
    { amount:'250', key:index++, active:false },
    { amount:'Otro', key:index++, active:false },
]
export default function PaymentScreen({ route, navigation }){
    const { totalAmount } = route.params;
    const [paymentType, setPaymentType]=useState('Paypal')
    const [tip, setTip]=useState('0,00')
    const [active, setActive]=useState('')
    const [customTip, setCustomTip]=useState(false)
    const [changePaymentMethod, setChangePaymentMethod]=useState(false)
    const [name, setName]=useState('')
    const [lastName, setLastName]=useState('')
    const [address, setAddress]=useState('')
    const [token, setToken]=useState('')
    const [radioButtons, setRadioButtons]=useState([
        {
            label: 'Paypal',
            color: colors.tabIconSelected,
            size:15,
            selected:true
        },
        {
            label: 'CreditCard',
            color: colors.tabIconSelected,
            size:15,
            selected:false
        },
    ])
    const setNewTip = (amount, index)=>{
        setActive(index)
        if(amount==='Otro')
        {
            setTip('0,00')
            setCustomTip(true)
        }
        else {
            setTip(amount)
            setCustomTip(false)
        }
    }
    useEffect(()=>{
        async function init(){
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            console.log('user', user)
            setName(user.name)
            setLastName(user.lastName)
            setAddress(user.address)
            const token=JSON.parse(await AsyncStorage.getItem('token'));
            console.log('token', token)
            setToken(token)
        }
        init()
    },[])
    
    return (    
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView >
                    <View style={[styles.boxShadow,{ height: 120, justifyContent:"space-around"}]}>
                        <View style={{height:'20%', justifyContent:'center'}}>
                            <Text style={styles.textTitle}>
                                Dirección    
                            </Text>
                        </View>
                        
                        <View style={{height:'40%', justifyContent:'center', flexDirection:'row', backgroundColor:'#e6e7e8', justifyContent:'center', borderRadius:10}}>
                            <TextInput
                                style={{ height:'90%', width:'90%', paddingLeft:10, }}
                                placeholder={'Ingrese su direccion'}
                                value={address}
                                onChangeText={(text)=> setAddress(text)}
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
            
                    <View style={[styles.boxShadow, { height:!changePaymentMethod? 70:140, justifyContent:'center'}]}>
                        <View style={{width:'100%', height:!changePaymentMethod?'80%':'50%', flexDirection:'row', justifyContent:'center', alignItems:"center",}}>
                            <View style={{ width:'10%'}}>
                            {
                                paymentType==='Paypal'?
                                    <SimpleLineIcons name={'paypal'} color={colors.tabIconSelected} size={20} />
                                    :
                                    <SimpleLineIcons name="credit-card" size={20} color={colors.tabIconSelected} />
                            }
                            </View>
                            <View style={{ width:!changePaymentMethod?'50%':'90%' }}>
                                <Text style={styles.textTitle}>{paymentType}</Text>
                            </View>
                            {
                                changePaymentMethod?null:
                                <TouchableOpacity style={{width:'40%', alignItems:'flex-end', height:'100%', justifyContent:"center"}} onPress={()=>{setChangePaymentMethod(!changePaymentMethod)}}>
                                    <Text style={[styles.textTitle, {color:colors.tabIconSelected}]}>Cambiar</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        {
                                !changePaymentMethod? null:
                                <View style={{width:"100%", alignItems:"flex-start"}}>
                                    <RadioGroup 
                                        radioButtons={radioButtons} 
                                        onPress={(data)=>{
                                            setRadioButtons(data)
                                            setPaymentType(data[0].selected? data[0].value:data[1].value)
                                            setChangePaymentMethod(!changePaymentMethod)
                                        }} 
                                    />
                                </View>
                               
                            }
                    </View>

                    <View style={[styles.boxShadow, { height: customTip?140:100,}]}>
                        <View style={{height:customTip?'10%':"20%", justifyContent:'center'}}>
                            <Text style={styles.textTitle}>Propina</Text>
                        </View>
                        <View style={{height:customTip?'60%':'80%' ,}}>
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
                            keyExtractor={item=> item.key.toString()}
                        />
                        
                        </View>
                        {
                            customTip?
                            <TextInput style={{height:"30%", backgroundColor:'#e6e7e8', borderRadius:5, paddingLeft:10}}
                                placeholder="Ingrese monto"
                                value={tip}
                                onChangeText={(text)=>setTip(filterNumber(text))}
                            />:
                            null
                        }
                    </View>

                    <View style={[styles.boxShadow, { height: 130,}]}>
                        <View style={{height:'20%', justifyContent:'center'}}>
                            <Text style={styles.textTitle}>Resumen</Text>
                        </View>
                        <View style={{height:'20%', justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={styles.text}>Costo de productos</Text>
                        <Text style={styles.text}>{`$${formatAmount(totalAmount)}`}</Text>
                        </View>
                        <View style={{height:'20%', justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={styles.text}>Costo de envio</Text>
                            <Text style={styles.text}>$0.00</Text>
                        </View>
                        <View style={{height:'20%', justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={styles.text}>Propina</Text>
                            <Text style={styles.text}>{`$${formatAmount(tip)}`}</Text>
                        </View>
                    </View>
                    
                    <View style={{width:"100%", marginTop:10, height:60}}>
                        <ButtonBottom
                            text={'Continuar'}
                            onPress={()=> navigation.navigate('webview', {token:token, name:name, lastName:lastName, paymentType:paymentType, address:address} )}
                            style={{width:"90%", height:40, justifyContent:"center", alignitems:"center", }}
                        />
                    </View>
                        
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop: Platform.OS === "android" ? 25 : 0,
        paddingHorizontal:25,
    },
    boxShadow:{
        padding:10,
        flexDirection:'column',
        width:'100%',
        borderRadius:10,
        backgroundColor:'white',
        zIndex:1,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width:2 },
        shadowOpacity: 2, 
        elevation: 2,
        marginBottom:10
    },
    textTitle:{
        fontSize:15,
    },
    text:{
        fontSize:10,
    }


})