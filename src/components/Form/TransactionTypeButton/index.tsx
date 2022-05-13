import React from "react";
import { TouchableOpacityProps } from "react-native";
import { 
    Container,
    Icon,
    Title
} from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps{
    type: 'up' | 'down';
    active: string;
}

export function TransactionTypeButton({type, active, ...rest}: Props){
    return(
        <Container {...rest} active={active} type={type} >
            <Icon name={icons[type]} type={type} active={active}/>
            <Title type={type} active={active}>{type === "down" ? "Saída" : "Entrada"}</Title>
        </Container>
    )
}