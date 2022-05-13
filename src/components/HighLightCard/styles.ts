import styled, {css} from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface CardProps {
    type: 'up' | 'down' | 'total';
    amount?: Number;
}

export const Container = styled.View<CardProps>`
    background-color: ${({theme}) => theme.colors.shape};
    ${({amount, type}) => (amount && amount >= 0 && type === 'total') && css`
        background-color: ${({theme}) => theme.colors.success};
    `};
    ${({amount, type}) => (amount && amount < 0 && type === 'total') && css`
        background-color: ${({theme}) => theme.colors.attention};
    `};

    width: ${RFValue(292)}px;
    margin: 8px;
    border-radius: 5px;

    padding: 19px 23px ${RFValue(42)}px;

`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    
`;

export const Icon = styled(Feather)<CardProps>`
    font-size: ${RFValue(40)}px;
    color: ${({theme}) => theme.colors.shape};
    ${({type}) => type === 'up' && css`
        color: ${({theme}) => theme.colors.success};
    `};
    ${({type}) => type === 'down' && css`
        color: ${({theme}) => theme.colors.attention};
    `};

`;

const TextCard = styled.Text<CardProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme, type}) => type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Title = styled(TextCard)`
    font-size: ${RFValue(14)}px;
`;


export const Amount = styled(TextCard)`
    font-size: ${RFValue(32)}px;
    margin-top:  35px;
    line-height: ${RFValue(38)}px;

`;

export const AmountValue = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium}; 
`;

export const LastTransaction = styled(TextCard)`
    font-size: ${RFValue(12)}px;
    line-height: ${RFValue(14)}px;
    color: ${({theme, type}) => type === 'total' ? theme.colors.shape : theme.colors.text};
`;

export const Footer = styled.View``;

