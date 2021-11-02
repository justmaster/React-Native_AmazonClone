import React from 'react'
import { Image, View, Text, Pressable } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface ProductItemProps{
    item: {
        id: string,
        title: string,
        image: string,
        avgRating: number,
        ratings: number,
        price: number,
        oldPrice?: number
    };
}

const ProductItem = (props: ProductItemProps) => {

    const navigation = useNavigation();
    const {item} = props
    const onPress = () => {
        //@ts-ignore
        navigation.navigate( "ProductDetails", { id: item.id });
    }
    const price = item.price.toFixed(2)
    const oldPrice = item.oldPrice.toFixed(2)
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Pressable  style={styles.root}>

            {/* Image */}

            <Image 
            style={styles.image} 
            source={{uri: item.image}} />

            {/* Text + Rating + Price  */}

            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>

                {/* {rate} */}

                <View style={styles.ratingsContainer}>
                    {[0,0,0,0,0,].map((el, i) =>
                        <FontAwesome 
                        key={`${item.id}-${i}`}
                        style={styles.star} 
                        name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'} 
                        size={RFValue(18,736)}
                        color={"#e47911"} 
                        />)
                    }               
                    <Text>{item.ratings}</Text>
                </View>

                {/* Price  */}

                <Text style={styles.price}>
                    from $ {price}

                {item.oldPrice && (
                    <Text style={styles.oldPrice}>
                        $ {oldPrice}
                    </Text>
                )}
                </Text>

            </View>
        </Pressable>
        </TouchableOpacity>
    )
}


export default ProductItem
