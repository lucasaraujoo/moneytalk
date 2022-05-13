import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps{
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(68)}px;
    background-color: ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    line-height: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    flex-direction: row;
    
    align-items: center;
    padding: ${RFValue(15)}px;

    background-color: ${({isActive, theme}) => isActive ? theme.colors.secundary_light : theme.colors.background };
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
    color: ${({theme}) => theme.colors.title};
`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.title};
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
    padding: 24px;
`;