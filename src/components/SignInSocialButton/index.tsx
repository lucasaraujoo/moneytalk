import React from "react";

import { GestureHandlerRootView, RectButtonProps} from 'react-native-gesture-handler';
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps{
    title: string;
    svg: React.FC<SvgProps>
}

import {
    Button,
    ImageContainer,
    Text
} from './styles';

export function SignInSocialButton({title, svg: Svg, ...rest}: Props){
    return(
        <GestureHandlerRootView>
            <Button {...rest}>
                <ImageContainer>
                    <Svg/>
                </ImageContainer>
                <Text>
                    {title}
                </Text>
            </Button>
        </GestureHandlerRootView>
    );
}