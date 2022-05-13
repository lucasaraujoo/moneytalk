import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

import { Input } from "../Input";

import { Container, Error, InputCurrency } from './styles';

interface Props extends TextInputProps{
    control: Control;
    name: string;
    error: string;
    inputType : 'text' | 'currency';
}

export function InputForm({
    control,
    name,
    error,
    inputType,
    ...rest
}: Props){
    return(
        <Container>
            <Controller
                control={control}
                render={({field: { onChange, value}}) => (
                    inputType === 'text' ?
                    <Input 
                        onChangeText={onChange}
                        value={value}
                        {...rest} 
                    /> : 
                    <InputCurrency 
                        onChangeValue={onChange}
                        value={value}
                        prefix="R$ "
                        
                        {...rest} 
                    />
                )} 
                name={name}
            />
            {error && <Error>{ error }</Error>}
        </Container>
    )
}