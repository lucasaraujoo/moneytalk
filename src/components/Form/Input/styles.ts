import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { ColorValue } from "react-native";

export const Container = styled.TextInput.attrs(
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