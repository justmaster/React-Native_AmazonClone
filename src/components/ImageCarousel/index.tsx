import React, {useState, useCallback} from 'react'
import { View, Image, FlatList, StyleSheet, useWindowDimensions, } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const ImageCarousel = ({ images } : {images: string[]}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const windowWidth = useWindowDimensions().width;

    const onFlatlistUpdate =  useCallback(({viewableItems}) => {
            if (viewableItems.length > 0) {
                setActiveIndex(viewableItems[0].index || 0)
            }
            console.log(viewableItems)
        }, []);
    return (
        <View style={styles.root}>
            <FlatList 
                data={images}
                renderItem={({item, index}) => (
                    <Image 
                        style={[styles.image, { width: windowWidth - 40 } ]}
                        key={index * 100} 
                        source={{ uri:item }} 
                        />
                )}
                //@ts-ignore
                // key={Math.random() * 100 + activeIndex}
                keyExtractor={(images, index) => index.toPrecision()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={windowWidth - 20}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50,
                }}
                onViewableItemsChanged={onFlatlistUpdate}
            />
            <View style={styles.dots}>
                {images.map((image, index) => (
                    <View 
                        style=
                            {[ 
                                styles.dot, 
                                { 
                                    backgroundColor: 
                                        index === activeIndex ? '#c9c9c9' : '#ededed'
                                }  
                            ]} />
                ))}      
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    root:{
        
    },
    image:{
        margin: 10,
        height: RFValue(250, 736),
        resizeMode: 'contain',
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    dot: {
        width: RFValue(10, 736),
        height: RFValue(10, 736),
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#ededed',
        borderColor: '#c9c9c9',
        margin: 5,
    }
})

export default ImageCarousel;

