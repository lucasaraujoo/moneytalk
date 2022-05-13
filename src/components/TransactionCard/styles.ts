import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';

interface TransactionProps{
    type: 'up' | 'down';
}

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape };
    border-radius: 5px;
    margin-top: 16px;
    padding: 17px 24px;
`;

const TextCard = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const Title = styled(TextCard)`
    
`;

export const Amount = styled(TextCard)<TransactionProps>`
    margin-top: 2px;
    font-size: ${RFValue(20)}px;
    line-height: ${RFValue(22)}px;
    color: ${({theme, type}) =>  type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const CategoryName = styled(TextCard)`
    margin-left: 17px;
`;

export const Date = styled(TextCard)``;

