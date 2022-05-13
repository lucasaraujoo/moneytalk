import React from "react";

import {
    Container,
    Title,
    Amount,
    AmountSymbol
} from './styles';

interface Props{
    title : string;
    amount : number;
    color: string
}

export function HistoryCard({title, amount, color} : Props){
    return(
        <Container color={color}>
            <Title>{title}</Title>
            <AmountSymbol>R$ <Amount>{amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Amount></AmountSymbol>
        </Container>
    );
}