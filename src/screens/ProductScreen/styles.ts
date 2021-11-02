import {StyleSheet} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    root:{
        padding: 10,
        backgroundColor: 'white',

    },

    price: {
        fontSize: RFValue(18, 736),
        fontWeight: 'bold',
    },
    oldPrice:{
        fontSize: RFValue(12, 736),
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    title: {
        color: 'black',
        fontSize: RFValue(18, 736),
    },
    description: {
        marginVertical: 10,
        lineHeight: 20,

    }
})

export default styles;