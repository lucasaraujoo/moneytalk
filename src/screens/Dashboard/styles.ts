import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { BorderlessButton} from 'react-native-gesture-handler';

//Props
import {TransactionListProps} from '.';

interface Props{
    topSize: string;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;


export const Header = styled.View<Props>`
    width: 100%;
  

    height: ${({topSize}) => topSize === 'full' ? RFValue(236): RFValue(96)}px;

    background-color: ${({theme}) => theme.colors.primary};

    flex-direction: row;
    justify-content: space-between;
    
    padding: 24px;
`;

//user
export const UserInfo = styled.View`
    flex-direction: row;
    
    align-items: flex-start;
`; 

export const User = styled.View`
    margin-left: 17px;
`; 

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`; 

const UserTexts = styled.Text`
    font-size: ${RFValue(18)}px;
    line-height: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const UserGreeting = styled(UserTexts)`
    font-family: ${({theme}) => theme.fonts.regular};
`; 

export const UserName = styled(UserTexts)`
    font-family: ${({theme}) => theme.fonts.bold};
`; 

//Logout

export const LogoutButton = styled(BorderlessButton)`

`;

export const IconPower = styled(Feather)`
    color: ${({theme}) => theme.colors.secundary};
    font-size: ${RFValue(24)}px;
    
`;



//scroll cards
export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{paddingHorizontal:16}
})`
  
    width: 100%;
    position: absolute;
    margin-top: ${RFValue(48)+48}px;
    
`;

//Transactions
export const Transactions = styled.View<Props>`
    flex: 1;
    padding: 0 24px;
    
    margin-top: ${({topSize}) => topSize === 'full' ? RFValue(72): RFValue(24)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};

`;

export const TransactionList = styled(FlatList as new (props: FlatListProps<TransactionListProps>) => FlatList
    ).attrs({
    showsVerticalScrollIndicator:false,
    contentContainerStyle:{
        paddingBottom: 32
    }
})`

`;


export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

