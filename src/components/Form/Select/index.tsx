import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { 
    Container,
    Title,
    Icon
} from './styles';


interface Props{
    title: string;
    onPress: () => void;
}

export function Select({title, onPress} : Props){
    return(
        <GestureHandlerRootView>
            <Container onPress={onPress}>
                    <Title>{title}</Title>
                    <Icon name="chevron-down" />
            </Container>
        </GestureHandlerRootView>
    )
}