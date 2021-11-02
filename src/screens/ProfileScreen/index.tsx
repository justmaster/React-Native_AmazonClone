import React from 'react'
    import { Platform, 
            Image, 
            StyleSheet, 
            Pressable, 
            Text, 
            ScrollView, 
            View, 
            Alert, 
            Dimensions,
            ImageBackground,
            Clipboard,
            ActivityIndicator,
            
        } from 'react-native'

import {Auth, Storage} from 'aws-amplify'
import Button from '../../components/Button'
import { useEffect } from 'react'
import { useState } from 'react'
import Amplify from '@aws-amplify/core';
import awsconfig from '../../aws-exports'
import * as ImagePicker from 'expo-image-picker';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-root-toast';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styles from './styles'
import defaultprofile from '../../media/defaultprofile.jpg'



const profilebackjpg =  require('../../media/defaultprofile.jpg')
Amplify.configure(awsconfig);

        
// if (!product || !userData) {
//     return;
// }



const ProfileScreen = () => {
    const [loading, SetLoading] = useState(false)
    const [image, setImage] = useState(defaultprofile);
    const [percentage, setPercentage] = useState(0);
    const [username, setUserName] = useState('Default');
    const [usermobile, setUserMobile] = useState("");
    const [usermail, setUserMail] = useState("defaultmail@gmail.com");
    const [copytoast, setCopyToast] = useState(false)
    const [phototoast, setPhotoToast] = useState(false)
    const [donetoast, setDoneToast] = useState(false)
    const [fontsize, setFontSize] = useState(false)

    const fontMeasure = async() => {
        if (await usermobile.length > 17) {
            setFontSize(true)
        } else {
            setFontSize(false)
        }
    }

    const fontMeasureMail = async() => {
        if (await usermail.length > 20) {
            setFontSize(true)
        } else {
            setFontSize(false)
        }
    }
    const createAlert = () => 
    Alert.alert(
      "Cancelled Upload",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
            text: "Try Again",
            onPress: () => {handleChoosePhoto},
            style: "cancel"
        },
      ]);
    

    //handling image picking with library
    const handleChoosePhoto = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        }) 

        if (await result.cancelled === true) {
            createAlert()
        } else {
        const source = await result
        //@ts-ignore
        const sourceUri = await source.uri
        // console.log(sourceUri)
        handleImagePicked(sourceUri) 

        }

    }

    //handling pciked image
    // @ts-ignore
    const handleImagePicked = async (pickerResult) => {
        const userData = await Auth.currentAuthenticatedUser();
            try {
                if (pickerResult.cancelled) {
                    return (createAlert)
                } else if (pickerResult === undefined) {
                    return;
                } else {
                    setPercentage(0);
                    const img = await fetchImageFromUri(pickerResult);
                    // console.log(img)
                    //@ts-ignore
                    const uploadUrl = await uploadImage(userData.attributes.sub, img);
                    downloadImage(uploadUrl);
                }
            } catch (e) {
            console.log(e);
            Alert.alert('Upload failed at Handling');
            }
        };

    // @ts-ignore
    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        //@ts-ignore
        return blob;
        };

    // @ts-ignore
    const uploadImage = (filename, img) => {
        Auth.currentCredentials();
        return Storage.put(filename, img, {
            level: 'private',
            contentType: 'image/jpeg',
            progressCallback(progress) {
            setLoading(progress);
            setPhotoToast(true)
            },
        })
            .then((response) => {
            // setPhotoToast(false)
            return response.key;
            
                        
            })
            .catch((error) => {
            console.log(error);
            return error.response;
            });
        };

    //Calculating Progress of Upload
    // @ts-ignore
    const setLoading = (progress) => {
        // @ts-ignore
        const calculated = parseInt((progress.loaded / progress.total) * 100);
        updatePercentage(calculated); // due to s3 put function scoped
        };
    
        const updatePercentage = (number: number) => {
        setPercentage(number);
        };
    //Dowmload of image

    const downloadImage = async (uri: string) => {
        
        await Storage.get(uri, {
            level: 'private',
        })
        //@ts-ignore
            .then((result) => setImage(result))
            .catch((err) => console.log(err));
        };

    
    const uploadProfile = async() => {
        const userData = await Auth.currentAuthenticatedUser();
        //@ts-ignore
        const userDataSub = userData.attributes.sub
        const userDataUserName = userData.username
        const userDataMobile = userData.attributes.phone_number.toString()
        const userDataMail = userData.attributes.email

        downloadImage(userDataSub)
        setUserName(userDataUserName)
        setUserMobile(userDataMobile)
        setUserMail(userDataMail)
    };
    useEffect(() => {
        fontMeasure();
        fontMeasureMail();
        uploadProfile();
        const windowWidth = Dimensions.get('window').width
        console.log(windowWidth)
        }, []);

    useEffect(() => {
        uploadProfile();
        }, [downloadImage]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            }
        })();
        }, []);

    useEffect(()=> {
        if (percentage === 100) {
            setTimeout(() => setPhotoToast(false), 3000);
        }
    }, [percentage])

    useEffect(()=> {
        if (percentage === 100) {
            setDoneToast(true)
            setTimeout(() => setDoneToast(false), 4000);
        }
    }, [phototoast])
    
    


    const PhoneContainer = (
            <View style={[styles.rowcontainer]}>

                <Feather name="phone" size={RFValue(38, 736)} />
                <Text style={fontsize ? [styles.numberless] : [styles.number]}>{usermobile}</Text>
                    <View style={[styles.copycontainer]}>
                        <TouchableOpacity style={[styles.copy]} onPress={() => copyToClipboard(usermobile)}>
                        <Feather  name="copy" size={RFValue(35, 736)} />
                        </TouchableOpacity>
                    </View>
                <Text style={[styles.numbertext]}>mobile</Text> 
                <View style={[styles.line]} />

            </View>
    )

    const MailContainer = (
        <View style={[styles.rowcontainer]}>
            <Feather name="mail" size={RFValue(38, 736)} />
            <Text style={fontsize ? [styles.numberless] : [styles.number]}>{usermail}</Text>
            <View style={[styles.copycontainer]}>
                <TouchableOpacity style={[styles.copymail]} onPress={() => copyToClipboard(usermail)}>
                <Feather  name="copy" size={RFValue(35, 736)} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.numbertext]}>email</Text>
            <View style={[styles.line]} />
        </View>
    )
    const PhotoButton = (
        <AntDesign
            name="picture"
            size={RFValue(33, 736)}
            style={[styles.choosephoto]}
            onPress={handleChoosePhoto}

        />
    )

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text)
        setCopyToast(true)
        setTimeout(() => setCopyToast(true), 1000); // show toast after 2s
        setTimeout(() => setCopyToast(false), 4000); // remove toast after 5s
    }

    
    if (loading === true) {
        return <ActivityIndicator style={styles.activityIndicator}/>
    }
    
    return (

    <ScrollView style={[styles.root]}>
        <View>
            <ImageBackground style={[styles.blurred]} source={{uri: 'https://www.webfx.com/blog/wp-content/uploads/2015/01/DI_blurred_backgrounds-001-1.jpg'}} resizeMode= 'cover'>
                    <Image
                        style={[styles.profileimage]} 
                        // @ts-ignore
                        source={{uri: image}}
                    ></Image>
                    
                    <Text style={[styles.username]}>{PhotoButton} {username}</Text>
            </ImageBackground>
        </View>

        



            {/* Phone  */}
                {PhoneContainer}


            {/* Mail  */}
                {MailContainer}


            
            
        {/* Toasts  */}
        <Toast
            visible={copytoast}
            position={-70}
            shadow={false}
            animation={true}
            hideOnPress={true}
            duration={2000}
        >
            Copied!
        </Toast>

        <Toast
            visible={phototoast}
            position={-70}
            shadow={false}
            animation={true}
            hideOnPress={true}
            duration={10000}

        >
            Uploading Please Wait {percentage} %
        </Toast>

        <Toast
            visible={donetoast}
            position={-70}
            shadow={false}
            animation={true}
            hideOnPress={true}
            duration={10000}

        >
            Image Uploaded!
        </Toast>
    </ScrollView>
    )
} 

export default ProfileScreen


