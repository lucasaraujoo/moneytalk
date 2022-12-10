import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import {addMonths, subMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";


import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { LoadContainer } from "../Dashboard/styles";

import { useAuth } from "../../hooks/auth";

import {
    Container, 
    Header, 
    Title, 
    Content, 
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month
} 
from './styles';

import theme from "../../globals/styles/theme";

interface TransactionData{

    type: 'up' | 'down',
    title: string;
    amount: number;
    category: string; //key
    date: string;
}

interface CategorySum{
    key: string,
    name: string,
    total: number,
    color: string,
    percent: string
}

export function Resume(){
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories , setTotalByCategories] = useState<CategorySum[]>([]);

    const {user} = useAuth();

    function handleDateChange(action: 'next' | 'prev'){
        if (action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1));
        }else{
            setSelectedDate(subMonths(selectedDate, 1));
        }
        
    }
    
    async function loadData(){
        setIsLoading(true);
        const dataKey = `@moneytalk:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expenses = responseFormatted
        .filter((expense : TransactionData) => 
        expense.type === 'down' && 
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear() 
        );

        const expensesTotal = expenses.reduce((acumullator: number, expense : TransactionData) => {
            return acumullator + expense.amount;
        }, 0);

        const categoriesFiltered : CategorySum[] = [];

        categories.forEach(category => {
            let categorySum  = 0;

            expenses.forEach((expense : TransactionData) => {
                if (expense.category === category.key){
                    categorySum += expense.amount;    
                }
            });
            if (categorySum > 0) {
                const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`;
                categoriesFiltered.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    percent
                });
            }

        });
        setTotalByCategories(categoriesFiltered);
        setIsLoading(false);
    }

    // useEffect(() => {
    //     loadData();
    // },[selectedDate]);

    useFocusEffect(useCallback(()=>{
        
        loadData();
    }, [selectedDate]));

    return(
        <Container >
            <Header>
                <Title>Resumo de gastos por categoria</Title>
            </Header>
            {
                isLoading ? 
                    <LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large" />
                    </LoadContainer>
                :
                    <Content >
                        
                        <MonthSelect>
                            <GestureHandlerRootView>
                                <MonthSelectButton onPress={()=>handleDateChange('prev')}>
                                    <MonthSelectIcon name="chevron-left" />
                                </MonthSelectButton>
                            </GestureHandlerRootView>
                            <Month>{format(selectedDate, 'MMMM, yyyy', {locale:ptBR})}</Month>
                            <GestureHandlerRootView>    
                                <MonthSelectButton onPress={()=>handleDateChange('next')}> 
                                    <MonthSelectIcon name="chevron-right" />
                                </MonthSelectButton>
                            </GestureHandlerRootView>
                        </MonthSelect>
                            
                        
                        <ChartContainer>
                            <VictoryPie 
                                
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape
                                    }
                                }}
                                labelRadius={75}
                                x="percent"
                                y="total"
                            />
                        </ChartContainer>
                        {
                        totalByCategories.map(item => (
                            <HistoryCard 
                                color={item.color} 
                                title={item.name} 
                                amount={item.total} 
                                key={item.key}
                            />
                        ))
                        }
                    </Content>
             
            }
        </Container>
    )
}