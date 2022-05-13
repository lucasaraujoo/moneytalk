
import React, {useState, useEffect} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { ThemeProvider } from 'styled-components';
import {  StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';


import theme from './src/globals/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import { SignIn } from './src/screens/SignIn';


export default function App() {
  const [orientationIsLandscape, setOrientation] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });


  useEffect(()=>{
    // set initial orientation
    ScreenOrientation.getOrientationAsync()
    .then((info) =>{
      setOrientation(info === 3 || info === 4);
    });

    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener((evt)=>{
      setOrientation(evt.orientationInfo.orientation === 3 || evt.orientationInfo.orientation === 4);
    });
    // return a clean up function to unsubscribe from notifications
    return ()=>{
      ScreenOrientation.removeOrientationChangeListener(subscription);
    }
    
  }, []);
  
  if(!fontsLoaded){
    return <AppLoading/>
  }

  
  return (
    <ThemeProvider theme={theme} >
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle={'default'} backgroundColor={theme.colors.primary} />
        <NavigationContainer >
          {/* <AppRoutes orientationLandscape={orientationIsLandscape}/> */}
          <SignIn/>
        </NavigationContainer>
        
      </SafeAreaView>
  
    </ThemeProvider>
  )
}




