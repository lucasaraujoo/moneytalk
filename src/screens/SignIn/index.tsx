import React from 'react';
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




export function SignIn(){
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
                    <SignInSocialButton title='Entrar com Google' svg={GoogleSvg}/>
                    <SignInSocialButton title='Entrar com Apple' svg={AppleSvg}/>
                </FooterWrapper>
            </Footer>
        </Container>
    );
}