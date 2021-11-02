import {StyleSheet} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const styles = StyleSheet.create({
    root:{
        padding: 2,
    },
    row:{
        marginVertical: 5,
        marginHorizontal:5,
    },
    label:{
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: 'white',
        padding: 5,
        height: RFValue(40, 736),
        marginVertical: RFValue(5, 736),
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 2,
    },
    errorLabel:{
        color: 'red',
    },

})


export default styles;