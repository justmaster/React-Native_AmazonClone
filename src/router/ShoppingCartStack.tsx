import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddressScreen from '../screens/AddressScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';

const Stack = createNativeStackNavigator();
const ShoppingCartStack = () => {
    return (
            <Stack.Navigator>

                <Stack.Screen 
                    component={ShoppingCartScreen} 
                    name="HomeScreen" 
                    options={{title: "ShoppingCart"}}
                />
                <Stack.Screen component={AddressScreen} 
                    name="AddressScreen"
                />

            </Stack.Navigator>
    )
}

export default ShoppingCartStack

