import React, { SetStateAction } from 'react'
import { View, Text, Pressable, StyleSheet, PointPropType} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';



// @ts-ignore
const QuantitySelector = ({ quantity, setQuantity }) => {
    const onMinus = () => {
        setQuantity(Math.max(0, quantity - 1))
    };

    const onPlus = () => {
        setQuantity(quantity + 1)
    };

    interface quantity{
        quantity: string;
        setQuantity: string;
    }

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onMinus} >
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </Pressable>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity onPress={onPlus}>
                <Pressable  style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        width: 100,
    },
    button: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1'

    },
    buttonText: {
        fontSize: 18,
    },
    quantity: {
        color: "#007eb9"
    }
})

export default QuantitySelector
