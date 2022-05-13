import styled, {css} from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface Props{
    type: 'up' | 'down';
    active: string;
}



export const Container = styled.TouchableOpacity<Props>`
    flex: 1;
    flex-direction: row;
    
    align-items: center;
    justify-content: center;
    
    ${({active}) => active === ''  && css`
        border: 1.5px solid ${({theme}) => theme.colors.text};
    `};

    ${({active, type}) => active === type  && css<Props>`
        background-color: ${({type, theme}) => type === 'up' ? theme.colors.success_light : theme.colors.attention_light};
    `};

    border-radius: 5px;

    margin: 8px 4px;
    padding: 16px;
`;

export const Icon = styled(Feather)<Props>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    /*cor baseada no tipo : red down | green up */
    color: ${({theme, type, active}) => type === 'up' ? 
                /*cor forte para o ativo ou para todos, quando nenhum está ativo*/
                (active === type || active === '' ? theme.colors.success : theme.colors.success_light ) : 
                (active === type || active === '' ? theme.colors.attention : theme.colors.attention_light)
            };
`;

export const Title = styled.Text<Props>`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    /*cor forte para o ativo ou para todos, quando nenhum está ativo*/
    color:${({theme, active, type}) => 
        active === type || active === '' ? theme.colors.title : theme.colors.text};

`;