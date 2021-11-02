import {StyleSheet, Dimensions,} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    
    root:{
        flex: 1,
    },
    username: {
        fontSize: RFValue(45, 736),
        flex: 1,
        alignSelf: 'center'
    },
    profileimage:{
        alignSelf: 'center',
        margin: RFValue(13, 736),
        height: RFValue(200, 736),
        width: RFValue(200, 736),
        borderRadius: 100,
        borderColor: '#e47911',
        borderWidth: RFValue(3, 736),
    },
    choosephoto:{
        flex: 1,
        alignSelf: 'center',
        margin: 0,
        padding: 0,
    },
    rowcontainer: {
        flex : 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: windowWidth,
        marginTop: RFValue(20, 736),
        marginLeft: RFValue(15, 736),
        

    },
    line: {
        marginTop: "3%",
        marginLeft: 0.12 * windowWidth,
        width: windowWidth,
        backgroundColor: '#e47911', 
        height: 1,
    },
    number: {
        marginLeft: RFValue(11, 736),
        fontSize: RFValue(25, 736),
        color: 'black'
    },
    numberless: {
        marginLeft: RFValue(11, 736),
        fontSize: RFValue(21, 736),
        color: 'black'
    },
    copycontainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    copy: {
        marginRight: 0.05 * windowWidth,
        alignSelf: 'flex-end',
    },
    copymail: {
        marginRight: 0.05 * windowWidth,
        alignSelf: 'flex-end'
    },
    numbertext: {
        position: 'absolute',
        marginTop: RFValue(25, 736),
        marginLeft: RFValue(50, 736),
        fontSize: RFValue(15, 736),
        color: 'gray'
    },
    blurred:{
        height: RFValue(350, 736),
        borderColor: '#e47911',
        borderWidth: 0.5,
    },
    activityIndicator: {
        marginTop: RFValue(300, 736)
    },

})
export default styles;