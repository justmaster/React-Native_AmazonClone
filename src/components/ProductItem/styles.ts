import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '100%',
        margin: 5,

    },
    image: {
        flex: 2,
        height: RFValue(150, 736),
        resizeMode: 'contain', 
    },
    rightContainer: {
        padding: 10,
        flex: 3,
    },
    title: {
        fontSize: RFValue(18,736),

    },
    price: {
        fontSize: RFValue(18,736),
        fontWeight: 'bold',
    },
    oldPrice:{
        fontSize: RFValue(12, 736),
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5,
    },
    star: {
        margin: 2,
    },
});

export default styles