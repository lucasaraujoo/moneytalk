import React, { createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';


import { Name } from '../screens/CategorySelect/styles';

interface AuthProviderProps{
    children : ReactNode;
}

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{
    user: User;
    signInWithGoogle() : Promise<void>;
    signInWithApple() : Promise<void>;
    signOut() : Promise<void>;
    userStorageLoading : boolean;
}

interface AuthorizationResponse{
    params : {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children} : AuthProviderProps){
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const [user, setUser] =  useState<User>({} as User);
    const userStoragekey = "@moneytalk:user"
    
    async function signInWithGoogle(){
        try {
            
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=select_account`;

            const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
            
            if (type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                
                const userLogged = {
                    id: String(userInfo.id),
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture
                }
                setUser(userLogged);

                await AsyncStorage.setItem(userStoragekey, JSON.stringify(userLogged));

            }

        } catch(error){
            throw new Error(String(error)); 
        }
    }

    
    async function signInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (credential){
                const name = credential.fullName!.givenName!;
                const userLogged = {
                    id: String(credential.user),
                    name: Name,
                    email: credential.email!,
                    photo: `https://ui-avatars.com/api/?name=${name}+`
                };

                setUser(userLogged);

                await AsyncStorage.setItem(userStoragekey, JSON.stringify(userLogged));
            }

            
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStoragekey);
    }

    useEffect(() =>{
        async function loadUserStorageData(){
            console.log('userStorageloading')
            const userStoraged = await AsyncStorage.getItem(userStoragekey);
            
            if (userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, []);

    

    return (
        <AuthContext.Provider 
            value={{user, signInWithGoogle, signInWithApple, signOut, userStorageLoading}}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export {AuthProvider, useAuth}


