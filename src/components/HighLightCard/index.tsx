import React from "react";


import { 
    Container, 
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
    AmountValue
} from "./styles";

interface Props {
    title: string;
    amount: Number;
    lastTransaction: string;
    type: 'up' | 'down' | 'total';
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

const formatCurrency = require("react-native-format-currency");

export function HighLightCard({title, amount=0, lastTransaction='', type} : Props){
    
    const [ ,valueFormattedWithoutSymbol] = formatCurrency.formatCurrency({ amount: amount.toFixed(2), code: "BRL" })
    const valueFormated = valueFormattedWithoutSymbol;
    
    const valueAmount = valueFormated.substring(0, valueFormated.length-3);
    const decimalAmount = valueFormated.slice(-3);
   

    return(
        <Container type={type} amount={amount}>
            <Header >
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}/>
            </Header>
            <Footer>
                <Amount type={type}>R$ <AmountValue>{valueAmount}</AmountValue>{decimalAmount}</Amount>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    )
}