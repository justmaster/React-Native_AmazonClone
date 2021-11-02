import React, {useState} from 'react';
import {Image, View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';
import styles from './styles';
import {DataStore} from 'aws-amplify'

import {CartProduct} from '../../models'
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CartProductItemProps {
  cartItem: CartProduct;
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  const {product, ...cartProduct} = cartItem;


  const updateQuantity = (async (newQuantity: number) => {
    const original = await DataStore.query(CartProduct, cartProduct.id)

      await DataStore.save(
        //@ts-ignore
        CartProduct.copyOf(original, updated => {
          updated.quantity = newQuantity
        })
      )


  })

  return (
 
      <View style={styles.root}>
        <TouchableOpacity>
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: product?.image}} />
          <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={3}>
              {product?.title}
            </Text>

            {/* Ratings */}

            <View style={styles.ratingsContainer}>
              {[0, 0, 0, 0, 0].map((el, i) => (
                <FontAwesome
                  key={`${product?.id}-${i}`}
                  style={styles.star}
                  //@ts-ignore
                  name={i < Math.floor(product?.avgRating) ? 'star' : 'star-o'}
                  size={18}
                  color={'#e47911'}
                />
              ))}
              <Text>{product?.ratings}</Text>
            </View>

            <Text style={styles.price}>
              from $ {product?.price.toFixed(2)}
              {product?.oldPrice && (
                <Text style={styles.oldPrice}> $ {product.oldPrice.toFixed(2) }</Text>
              )}
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <QuantitySelector quantity={cartProduct.quantity} 
          setQuantity={updateQuantity} />
        </View>
        
      </View>

  );
};

export default CartProductItem;