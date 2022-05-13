import { ColorValue } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import CurrencyInput from 'react-native-currency-input';


export const Container = styled.View`
    width: 100%;
`;

export const Error = styled.Text`
    color: ${({theme}) => theme.colors.attention};
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 8px;
`;

export const InputCurrency = styled(CurrencyInput).attrs(
    (props) => ({placeholderTextColor : props.theme.colors.text as ColorValue })
)`
    width: 100%;
    padding: 17px 16px;
    margin-bottom: 8px;
    
    font-size: ${RFValue(14)}px;
    
    font-family:  ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.title};
    

    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    
`;