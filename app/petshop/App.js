import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import {Inicio,PessoaFisicaCadastro,Login,HomeScreen,PessoaJuridicaCadastro} from './Telas/index';

const Stack = createStackNavigator();

export default function App() {

   return (
    <NavigationContainer>
      <Stack.Navigator>
     
      <Stack.Screen
          name="Inicio"
          options={{ headerShown:false }}
          component={PessoaJuridicaCadastro}
        />

        <Stack.Screen
          name="Login"
          options={{ headerShown:false }}
          component={Login}
        />

        <Stack.Screen
          name="PessoaFisicaCadastro"
          options={{ headerShown:false }}
          component={PessoaFisicaCadastro}
        />

        <Stack.Screen
          name="Home"
          options={{ headerShown:false }}
          component={HomeScreen}
        />

       
 
       
    </Stack.Navigator>
    </NavigationContainer>
  
  );
}
