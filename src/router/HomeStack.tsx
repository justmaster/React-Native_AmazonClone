import React, { useState, useEffect} from 'react'
import {Text, StyleSheet, TextInput, View, StatusBar, Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather'
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const Stack = createNativeStackNavigator();

interface HeaderComponentProps{
    searchValue: string;
    setSearchValue: () => void;
}

const HeaderComponent = ({searchValue, setSearchValue} : HeaderComponentProps) => {
    useEffect(() => {
        //@ts-ignore
        setSearchValue("cool")
        //@ts-ignore
        setTimeout(() => setSearchValue(" "), 2000);
    }, [])



    const windowWidth = Dimensions.get('window').width - 50
    return (
        <SafeAreaView  style={{
            backgroundColor: '#22e3dd',
            }}>
            <View style={{
                backgroundColor: 'white',
                height: RFValue(50, 736), 
                margin: 10, 
                padding: RFValue(5, 736),
                flexDirection:'row',
                alignItems: 'center',
                }}>

                <Feather name="search" size={20} /> 
            <TouchableOpacity>
                <TextInput style={{
                    height: RFValue(40, 736), 
                    width: RFValue(windowWidth, 736) ,
                    padding: RFValue(12, 736),
                    backgroundColor: 'white'
                    }} 
                    placeholder="Search..."
                    value={searchValue}
                    onChangeText={setSearchValue}
                    
                />
            </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    )
}
const HomeStack = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
        <SafeAreaView style={styles.mainStack}>
            <Stack.Navigator
                screenOptions={{
                    header: () => 
                        <HeaderComponent 
                            searchValue={searchValue}
                            // @ts-ignore
                            setSearchValue={setSearchValue}
                        />
                }}>
                    <Stack.Screen name="HomeScreen"  options={{title: "Home"}}>
                        {() => <HomeScreen searchValue={searchValue}/>}
                    </Stack.Screen>
                    <Stack.Screen component={ProductScreen} 
                        name="ProductDetails"
                    />
            </Stack.Navigator>
        </SafeAreaView>
    )
}



export default HomeStack

const styles = StyleSheet.create({
    root:{
        // padding: 10,
        backgroundColor: 'white',
    },

    mainStack:{
        flex: 1,
        paddingTop: -1000,
    }
})