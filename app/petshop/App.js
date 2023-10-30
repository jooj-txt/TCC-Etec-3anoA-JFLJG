import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';


import {Inicio,PessoaFisicaCadastro,Login,HomeScreen,PessoaJuridicaCadastro,Add, ConfigPerfil, HomeScreenJur} from './Telas/rotas';
import AdicionarAnimal from './Telas/AdicionarAnimal';

const Stack = createStackNavigator();

export default function App() {

   return (
    <NavigationContainer>
      <Stack.Navigator useLegacyImplementation>
      <Stack.Screen
          name="Login"
          options={{ headerShown:false }}
          component={AdicionarAnimal}
        />
      <Stack.Screen
          name="PessoaJuridicaCadastro"
          options={{ headerShown:false }}
          component={PessoaJuridicaCadastro}
        /> 
  
      <Stack.Screen
          name="Home"
          options={{ headerShown:false  }}
          component={HomeScreen}
        />
      <Stack.Screen
          name="PessoaFisicaCadastro"
          options={{ headerShown:false }}
          component={PessoaFisicaCadastro}
        />    
      <Stack.Screen
          name="HomeJur"
          options={{ headerShown:false  }}
          component={HomeScreenJur}
        />
      <Stack.Screen
          name="Inicio"
          options={{  headerShown:false  }}
          component={Inicio}
        />
         <Stack.Screen
          name="AdicionarAnimal"
          options={{  headerShown:false  }}
          component={AdicionarAnimal}
        />
        
    </Stack.Navigator>
    </NavigationContainer>

  
  );
}
