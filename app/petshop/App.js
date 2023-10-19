import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import {Inicio,PessoaFisicaCadastro,Login,HomeScreen,PessoaJuridicaCadastro,Config} from './Telas/rotas';

const Stack = createStackNavigator();

export default function App() {

   return (
    <NavigationContainer>
      <Stack.Navigator useLegacyImplementation>
     
      <Stack.Screen
          name="Inicio"
          options={{ headerShown:false  }}
          component={HomeScreen}
        />

        <Stack.Screen
          name="Home"
          options={{  headerShown:false  }}
          component={Inicio}
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
          name="Config"
          options={{ headerShown:true }}
          
          component={Config}
        />

       
 
       
    </Stack.Navigator>
    </NavigationContainer>
  
  );
}
