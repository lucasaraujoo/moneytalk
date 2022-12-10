import React from "react";
import {NavigationContainer} from '@react-navigation/native';

import {AuthRoutes } from './auth.routes';
import {AppRoutes } from './app.routes';

import { useAuth } from  "../hooks/auth"

interface Props {
  orientationLandscape: boolean;
}


export function Routes({orientationLandscape} : Props  ){
  const {user} = useAuth();
  console.log(user);
  return(
    <NavigationContainer>
        {user.id ? <AppRoutes orientationLandscape={orientationLandscape}/> : <AuthRoutes/>}
    </NavigationContainer>
  )
}