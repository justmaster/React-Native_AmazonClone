import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from 'react-native-vector-icons/Entypo'
import HomeStack from './HomeStack'
import ShoppingCartStack from './ShoppingCartStack'
import MenuScreen from '../screens/MenuScreen'
import ProfileStack from './ProfileStack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator();


const BottomTabNav = () => {
    return (
            <Tab.Navigator screenOptions={{headerShown: false, tabBarInactiveTintColor: '#ffbd7d', tabBarActiveTintColor: "#e47911"}}>
                <Tab.Screen 
                    component={HomeStack} 
                    name="home" 
                    options={{
                        tabBarIcon: ({color}) => (
                            <TouchableOpacity>
                                <Entypo name="home" color={color} size={RFValue(25, 736)} />
                            </TouchableOpacity>
                            ),
                    }}
                    />
                <Tab.Screen 
                component={ProfileStack} 
                name="Profile"
                options={{
                    tabBarIcon: ({color}) => (
                        <TouchableOpacity>
                        <Entypo name="user" color={color} size={RFValue(25, 736)} />
                        </TouchableOpacity>
                        )
                }}
                    />
                <Tab.Screen 
                component={ShoppingCartStack} 
                name="shoppingCart" 
                options={{
                    tabBarIcon: ({color}) => (
                        <TouchableOpacity>
                        <Entypo name="shopping-cart" color={color} size={RFValue(25, 736)} />
                        </TouchableOpacity>
                        )
                }}
                    />
                <Tab.Screen 
                component={MenuScreen} 
                name="more" 
                options={{
                    tabBarIcon: ({color}) => (
                        <TouchableOpacity>
                        <Entypo name="menu" color={color} size={RFValue(25, 736)} />
                        </TouchableOpacity>
                        )
                }}
                    />
            </Tab.Navigator>
    )
}

export default BottomTabNav

