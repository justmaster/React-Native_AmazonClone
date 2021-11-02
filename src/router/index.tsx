import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNav from './bottomTabNav';



const Root = createNativeStackNavigator();
const Router = () => {
    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{headerShown: false}}>
                <Root.Screen component={BottomTabNav} name="HomeTabs" />
            </Root.Navigator>
        </NavigationContainer>
    )
}

export default Router

