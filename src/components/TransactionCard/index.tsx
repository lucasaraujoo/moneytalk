import React from "react";
import { categories } from "../../utils/categories";

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date

} from "./styles";

const formatCurrency = require("react-native-format-currency");


export interface TransactionCardProps{
    type: 'up' | 'down',
    title: string;
    amount: number;
    category: string; //key
    date: string;
}

interface Props {
    data: TransactionCardProps;
}


export function TransactionCard({ data } : Props){
    // const [valueFormattedWithSymbol] = formatCurrency.formatCurrency({ amount: data.amount, code: "BRL" })
    // let valueFormated = valueFormattedWithSymbol;
    
    // if (!valueFormattedWithSymbol.includes(',')) valueFormated += ',00' ;

    const valueFormated = data.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
    const [category] = categories.filter(
        item => item.key === data.category
    );

    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                { data.type === 'down' && '- ' }
                {valueFormated}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category ? category.icon : 'hash'}></Icon>
                    <CategoryName>{category ? category.name: 'sem categoria'}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}