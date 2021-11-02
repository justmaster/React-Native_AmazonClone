import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();



const ProfileStack = () => {
    return (
        <SafeAreaView style={styles.mainStack}>
            <Stack.Navigator>
            <Stack.Screen 
                    component={ProfileScreen} 
                    name="ProfileScreen" 
                    options={{title: "ProfileScreen"}}
                />

            <Stack.Screen 
                    component={ProfileScreen} 
                    name="PaymentScreen" 
                    options={{title: "PaymentScreen"}}
                />
            </Stack.Navigator>
        </SafeAreaView>
    )
}



export default ProfileStack

const styles = StyleSheet.create({
    root:{
        padding: 10,
        backgroundColor: 'white',
    },

    mainStack:{
        flex: 1,
        paddingTop: -1000,
    }
})