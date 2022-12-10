import React, {  useEffect, useRef, useState} from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SigInTitle,
    Footer,
    FooterWrapper
} from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';
import theme from '../../globals/styles/theme';

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const {signInWithGoogle, signInWithApple} = useAuth();
    // const [isMounted, setIsMounted] = useState(true);
    const isMounted = useRef(true);
    async function handleSignInWithGoogle(){
        try {
            setIsLoading(true);
            await signInWithGoogle().then(() => {
                 isMounted.current && setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar à conta Google!');
            setIsLoading(false);
        } 
        
    }
    async function handleSignInWithApple(){
        try {
            setIsLoading(true);
            
            await signInWithApple().then(() => {
                isMounted.current && setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar à conta Apple!');
            setIsLoading(false);
        } 
        
    }

    
    useEffect(()=>{
        
        return () => { isMounted.current = false };
    }, []);
   
    
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(158)}
                        height={RFValue(75)}
                        
                    />
                    <Title>
                        Controle suas{'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SigInTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </SigInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title='Entrar com Google' svg={GoogleSvg} onPress={handleSignInWithGoogle}/>
                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButton title='Entrar com Apple' svg={AppleSvg} onPress={handleSignInWithApple}/>
                    }
                </FooterWrapper>

                {isLoading && <ActivityIndicator color={theme.colors.shape}  />}
            </Footer>
        </Container>
    );
}