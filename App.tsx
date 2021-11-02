
 import 'react-native-gesture-handler';
 import React from 'react';
 import { registerRootComponent } from 'expo';
 import { Colors } from 'react-native/Libraries/NewAppScreen';
 import { RootSiblingParent } from 'react-native-root-siblings';

 import {
   View,
   StatusBar,
   useColorScheme,
 } from 'react-native';

import Router from './src/router';
import { LogBox } from 'react-native';

import Amplify from 'aws-amplify';
// @ts-ignore
import { withAuthenticator  } from 'aws-amplify-react-native';

import config from './src/aws-exports';
Amplify.configure(config)



 const App = () => {
   console.disableYellowBox = true
   // all these errors are bugs that are currently unfixible but do not interfere with apps performance 23.10
    LogBox.ignoreLogs(['Setting a timer']);
    // react-native android known issue
    LogBox.ignoreLogs(["No credentials, applicationId or region"]);
    // aws amplify known issue
    LogBox.ignoreLogs(["Insequre number generator"]);
    // android dev known issue
    LogBox.ignoreLogs(["Cannot read properties of undefined"]);
    LogBox.ignoreLogs(["Unable to symbolicate"]);
    // android again
    LogBox.ignoreLogs(["each child of element"]);
   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    
   };
   registerRootComponent(App)
   return (
     <RootSiblingParent>
     <View style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <Router />
     </View>
     </RootSiblingParent>
   );
 };


 export default withAuthenticator(App);
