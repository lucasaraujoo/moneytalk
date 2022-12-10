import React, {useEffect, useState} from "react";
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native';

import * as Yup from 'yup';
import { yupResolver} from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { useAuth } from "../../hooks/auth";
import { AppRoutesParamList } from "../../routes/app.routes";
import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Select } from "../../components/Form/Select";

import {CategorySelect} from '../CategorySelect';
 
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from "./styles";



interface FormData{
    name: string;
    amount: string;
}



const schema = Yup.object().shape(
    {
        name: Yup.string()
            .required('Nome é obrigatório'),
        amount : Yup.number()
            .typeError('Informe um valor numerico')
            .positive('O valor não pode ser negativo')
            .required('Valor é obrigatório')
            
    }
);

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Cadastrar"
>;

export function Register(){
    
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {user} = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
        
    });

    const navigation = useNavigation<RegisterNavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({resolver : yupResolver(schema)});

    function handleTransactionTypeSelect(type : 'up' | 'down'){
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    async function handleRegister(form : Partial<FormData>){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da Transação!');

        if(category.key === 'category')
            return Alert.alert('Selecione uma categoria!');


        const newTransaction = {
            id: String(uuid.v4()),
            title: form.name,
            amount : form.amount, 
            category: category.key,
            type : transactionType,
            date : new Date()
        }

        try {
            const dataKey = `@moneytalk:transactions_user:${user.id}`;
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [ newTransaction, ...currentData];
            
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); //usar mergeItem? 

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
                
            });

            navigation.navigate("Listagem");

            
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar!');
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>

            </Header>
            
            <Form>
                <Fields>
                    <InputForm 
                        inputType='text'
                        name='name' 
                        control={control} 
                        placeholder="Descrição" 
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message }
                    />
                    <InputForm 
                        inputType='currency'
                        name='amount' 
                        control={control} 
                        placeholder="Preço" 
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message }
                    />
                    <TransactionTypes>
                        <TransactionTypeButton 
                            active={transactionType}
                            type="up"
                            onPress={() => handleTransactionTypeSelect('up')}
                        />
                        <TransactionTypeButton 
                            type="down"
                            onPress={() => handleTransactionTypeSelect('down')}
                            active={transactionType}
                        />
                    </TransactionTypes>

                    <Select title={category.name} onPress={handleOpenSelectCategoryModal} />
                </Fields>
                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory = {setCategory}
                    closeSelectCategoryModal = {handleCloseSelectCategoryModal}
                
                />
            </Modal>
        </Container>
        </TouchableWithoutFeedback>
    )

}