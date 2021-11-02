import React, {useState, useEffect} from 'react'

import {  View, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import ProductItem from '../../components/ProductItem'
import { DataStore } from '@aws-amplify/datastore'
import { Product } from '../../models'




const HomeScreen = ({searchValue}: {searchValue: string}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false)


    const LoadProducts = async () => {
        DataStore.query(Product).then(setProducts);

    }


    useEffect(() => {
        setLoading(true)
        LoadProducts()
        setLoading(false)
    }, [])


    useEffect(() => {
        setLoading(true);
        if (!!searchValue) {
            DataStore.query(Product, p =>
                p.title('contains', searchValue.toLowerCase()),
            ).then(setProducts);
            setLoading(false)
        } else if (searchValue === "") { 
            DataStore.query(Product).then(setProducts);
            setLoading(false)
        }else {
            DataStore.query(Product).then(setProducts);
            setLoading(false)
        }
    }, [searchValue]) 

    if (loading === true) {
        return <ActivityIndicator style={styles.activityIndicator}/>
    }

    if (products.filter(cp => !cp.title).length !== 0) {
        return <ActivityIndicator  style={styles.activityIndicator}/>
    }

    if (!products) {
        return <ActivityIndicator style={styles.activityIndicator} />
    }

    
    return (
        
        <View style={styles.page}>
            <FlatList
                data={products}
                //@ts-ignore
                renderItem={({item}) => <ProductItem item={item} />}
                key={Product.name}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 0,
    },
    activityIndicator: {
        marginTop: 300
    }
});

export default HomeScreen;
