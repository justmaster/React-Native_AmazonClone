import React, {useState} from 'react'
import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './styles'
import countryList from 'country-list'
import { DataStore, Auth} from 'aws-amplify'
import {CartProduct} from '../../models'
import { OrderProduct } from '../../models'
import { Order } from '../../models'
import { useNavigation } from '@react-navigation/native'
import { object } from 'prop-types'
import Button from '../../components/Button'
import { StackActions } from '@react-navigation/native';






const countries = countryList.getData();


const AdressScreen = () => {
    const [country, setCountry] = useState(countries[0].code);
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [addressError, setAddressError] = useState("")

    const navigation = useNavigation();


    const saveOrder = async () =>{
        // get user details
        const userData = await Auth.currentAuthenticatedUser();
        //create a new order
        const newOrder = await DataStore.save(
            new Order({
            userSub: userData.attributes.sub ,
            fullName: fullname,
            phoneNumber: phone,
            country,
            city,
            address,
            })
        )

        //fetch all cart items

        const cartItems = await DataStore.query(CartProduct, cp => 
            cp.userSub('eq', userData.attributes.sub))

        //attach all cart items to the order

        await Promise.all(
            cartItems.map(cartItem => 
                DataStore.save(
                    new OrderProduct ({
                        quantity: cartItem.quantity,
                        option: cartItem.option,
                        productID: cartItem.productID,
                        orderID: newOrder.id
                    })
                ),  
            ),
        );
        //delete all cart items

        await Promise.all(
            cartItems.map(cartItem => 
                DataStore.delete(cartItem)))

        //redirect home
        navigation.dispatch(StackActions.popToTop());
        //@ts-ignore
        navigation.navigate('home')
        navigation.dispatch(StackActions.popToTop());
        createAlert(
            'Thank You For Shopping With Us Your Order Is Placed And  We Will Contact You Soon')
    };


    const createAlert = (alerttext: string) => 
    Alert.alert(
      alerttext,
      "",
      [
        {
          text: "Got It",
          onPress: () => console.log("Ok Pressed"),
          style: "cancel"
        }
      ]);



    const onCheckout = () => {
        try{ 
        if (!!addressError) {
            createAlert("Address Error")
            return;
        }

        if (!fullname) {
            createAlert('Please fill in the fullname field');
            return;
        }

        if(!phone) {
            createAlert('Please fill in the phone number field')
            return;
        }

        if(!city) {
            createAlert('Please fill in the city  field')
            return;
        } else {
            saveOrder();
        }
    } catch (error) {
        console.log(error)
    }

}

    const validateAddress = () => {
        if (address.length < 3) {
            setAddressError('Address is too short')
        }
        if (address.length > 20) {
            setAddressError('Address too Long')
        }
    }

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <ScrollView style={styles.root}>

                <View style={styles.row}>
                    <Picker
                        selectedValue={country}
                        onValueChange={setCountry}
                        >
                        {countries.map(country => 
                        <Picker.Item value={country.code} label={country.name} />
                            )}
                    </Picker>
                </View>

                {/* Full Name */}
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name (First and Last Name)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Full Name"
                        value={fullname}
                        onChangeText={setFullname}
                    />
                </View>

                {/* PhoneNumber */}
                <View style={styles.row}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="Phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType={'phone-pad'}
                    />
                </View>

                {/* Address */}
                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="Address"
                        value={address}
                        onEndEditing={validateAddress}
                        onChangeText={text => {
                            setAddress(text);
                            setAddressError('')
                        }}

                    />
                    {!!addressError && (
                    <Text style={styles.errorLabel}>{addressError}</Text>
                    )}
                </View>

                {/* City */}
                <View style={styles.row}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>

                <Button text='Checkout' onPress={onCheckout} />

        </ScrollView>
    </KeyboardAvoidingView>
    )
}

export default AdressScreen
