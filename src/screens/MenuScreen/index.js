import React from 'react'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import {Auth} from 'aws-amplify'
import Button from '../../components/Button'
import Toast from 'react-native-root-toast';

const MenuScreen = () => {
    const [currency, setCurrency] = useState(true)
    const [toast, setToast] = useState(false)

    const onLogout = () => {
        Auth.signOut();
    };

    const onChangeCurrency = () => {
        setCurrency(!currency)
        setToast(false)
        setToast(true)
        setTimeout(() => setToast(false), 3000); // remove toast after 3s
    }


    return (

        <SafeAreaView>
                <Button  containerStyles={styles.button} text="See Payments"  onPress={() => {console.warn('See Payments Screen')}} />
                <Button text="Change Currency"  onPress={onChangeCurrency} />
                <Button text="Orders"  />
                <Button text="Deals"  />
                <Button text="Notifications"  />
                <Button text="Country and language"  />
                <Button text="Sign Out"  onPress={onLogout} />

                <Toast
                    visible={toast}
                    position={-70}
                    shadow={false}
                    animation={true}
                    hideOnPress={true}
                    duration={2000}
                >
                    Current Currency: {currency ? "USD" : "EUR"}
                </Toast>
        </SafeAreaView>
    )
} 

export default MenuScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        marginTop: "50%",
        marginVertical: 5,
    },

})
