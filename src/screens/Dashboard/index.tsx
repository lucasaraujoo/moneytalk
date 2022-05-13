import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    Container,
    Header,
    UserInfo,
    User,
    Photo,
    UserGreeting,
    UserName,
    IconPower,
    HighLightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
} from "./styles";
import theme from "../../globals/styles/theme";

export interface TransactionListProps extends TransactionCardProps{
    id : string;
}

export interface DashboardProps{
    orientationLandscape : boolean;
}

interface HighlightProps {
    total: number;
    lastTransactionTypeDate: string;
}

interface HighlightDataProps {
    entries: HighlightProps;
    expenses: HighlightProps;
    balance: number;
    lastTransactionDate: string;
}

function getLastTransactionTypeDate(collection : TransactionListProps[] , type?: "up" | "down"){
    //Filtering and get max date by transaction type 
    let collectionFiltered = collection;
    if (type) {
        collectionFiltered = collection.filter((transaction ) => transaction.type === type);
    }
    const lastTransactionTypeDate  = 
    Math.max.apply(Math, collectionFiltered
    .map((transaction ) => new Date(transaction.date).getTime()));
    //Formatting timestamp
    return Intl.DateTimeFormat('pt-BR',{
        day: "2-digit",
        month: "long",
    }).format(new Date(lastTransactionTypeDate));

}

export function Dashboard({orientationLandscape } : DashboardProps){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
    const [hightlightData, setHighlightData ] = useState<HighlightDataProps>({} as HighlightDataProps);

    let entriesTotal:number;
    let expensesTotal:number;

    async function loadtransactions(){
        const dataKey = '@moneytalk:transactions';
        const response = await AsyncStorage.getItem(dataKey);

        const data =  response ? JSON.parse(response) : [];
        entriesTotal = 0;
        expensesTotal = 0;
        //Array mapping
        const transactionsFormatted : TransactionListProps[] = data
        .map((item : TransactionListProps) => {
                if (item.type === 'up'){
                    entriesTotal += Number(item.amount);
                } else {
                    expensesTotal += Number(item.amount);
                }

                const amount = Number(item.amount);
                const date = Intl.DateTimeFormat('pt-BR',{
                    day: '2-digit',
                    month: "2-digit",
                    year: "numeric"
                }).format(new Date(item.date));

                return{
                    id: item.id,
                    title: item.title,
                    amount,
                    type: item.type,
                    category: item.category,
                    date

                }
        });
        //Set Transactions array to useState
        setTransactions(transactionsFormatted);

        //Refresh data of HighLightCards
        setHighlightData({
            entries: {
                total: entriesTotal,
                lastTransactionTypeDate: "Última entrada dia " + getLastTransactionTypeDate(data, "up")
            },
            expenses:{
                total: expensesTotal,
                lastTransactionTypeDate: "Última saída dia " + getLastTransactionTypeDate(data, "down")
            },
            balance : (entriesTotal - expensesTotal),
            lastTransactionDate : "1 a "+getLastTransactionTypeDate(data)
        });
        
        setIsLoading(false);
    }

    // useEffect(() => {
    //     loadtransactions();  
    // }, []);

    useFocusEffect(useCallback(()=>{
        
        loadtransactions();  
    }, []));


    return(
        <Container>
            {
            isLoading ? 
            <LoadContainer>
                <ActivityIndicator color={theme.colors.primary} size="large" />
            </LoadContainer> :
            <>
                <Header topSize={orientationLandscape ? 'short' : 'full'}>
                    <UserInfo>
                        <Photo 
                            source={{uri: 'https://avatars.githubusercontent.com/u/22358123?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Lucas</UserName>
                        </User>
                    </UserInfo>
                    <GestureHandlerRootView>
                        <LogoutButton onPress={() => {console.log('Logout')}} >
                            <IconPower name="power" />
                        </LogoutButton>
                    </GestureHandlerRootView>
                </Header>
                {!orientationLandscape &&
                <HighLightCards>
                    <HighLightCard 
                        type="up" 
                        amount={hightlightData.entries.total} 
                        title="Entrada" 
                        lastTransaction={hightlightData.entries.lastTransactionTypeDate}
                    />
                    <HighLightCard 
                        type="down" 
                        amount={hightlightData.expenses.total} 
                        title="Saída" 
                        lastTransaction={hightlightData.expenses.lastTransactionTypeDate}
                    />
                    <HighLightCard 
                        type="total" 
                        amount={hightlightData.balance} 
                        title="Total" 
                        lastTransaction={hightlightData.lastTransactionDate}
                    />
                </HighLightCards> 
                }

                <Transactions topSize={orientationLandscape ? 'short' : 'full'} >
                
                    <Title>Movimentações</Title>
                    <TransactionList  
                        data={transactions}
                        keyExtractor = {item => item.id}
                        renderItem={({item}) => <TransactionCard data={item} />}
                    />
                </Transactions>
            </>
            }
        </Container>
    )
}

