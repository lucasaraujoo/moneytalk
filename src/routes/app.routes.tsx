import React from "react";
import { Platform } from "react-native";

import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { Dashboard, DashboardProps } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from "../screens/Resume";
import theme from "../globals/styles/theme";


interface Props extends DashboardProps{
    
}

export type AppRoutesParamList = {
    Listagem: undefined;
    Cadastrar: undefined;
    Resumo: undefined;
};


const { Navigator , Screen} = createBottomTabNavigator<AppRoutesParamList>();

export function AppRoutes({...rest} : Props){

    return(
        <Navigator
            screenOptions={
                {
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.text,
                    tabBarLabelPosition: "beside-icon",
                    tabBarStyle:{
                        height: Platform.OS === 'ios' ? RFValue(72) : RFValue(56),
                        paddingBottom: Platform.OS === 'ios' ? 20 : 8,
                    },
                    tabBarLabelStyle:{
                        fontSize: RFValue(14),
                        fontFamily: theme.fonts.medium,
                    },
                    tabBarHideOnKeyboard: true
                }
            }
        >
            <Screen 
                name="Listagem" 
                options={{
                    tabBarIcon: (({color}) => 
                        <Feather name="list" size={RFValue(24)} color={color} />
                    ),
                    
                }}
            >
                {props => <Dashboard {...props} {...rest}  />}
            </Screen>
            <Screen 
                name='Cadastrar' 
                component={Register}
                options={{
                    tabBarIcon: (({color}) => 
                        <Feather name="dollar-sign" size={RFValue(24)} color={color} />
                    )
                }}
            />
            <Screen 
                name='Resumo' 
                component={Resume}
                options={{
                    tabBarIcon: (({color}) => 
                        <Feather name="pie-chart" size={RFValue(24)} color={color} />
                    )
                }}
            />
        </Navigator>
    )
}