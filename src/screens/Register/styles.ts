import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
  
    height: ${RFValue(68)}px;

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    line-height: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
`; 

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 24px;
    

`;

export const Fields = styled.ScrollView`
`;

export const TransactionTypes = styled.View`
    margin: 0 -4px;
    flex-direction: row;
    width: 100%;
    
`;