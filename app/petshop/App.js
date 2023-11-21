import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';


import {Inicio,PessoaFisicaCadastro,Login,HomeScreen,PessoaJuridicaCadastro,Add, ConfigPerfil, HomeScreenJur, PosAdd, Favoritos, AnimalDesc} from './Telas/rotas';

const Stack = createStackNavigator();

export default function App() {

   return (
    <NavigationContainer>
            <Stack.Navigator useLegacyImplementation>
              
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
          name="Login"
          options={{ headerShown:false }}
          component={Login}
        />
            <Stack.Screen
          name="ConfigPerfil"
          options={{ headerShown:false  }}
          component={ConfigPerfil}
        />
            <Stack.Screen
          name="PessoaJuridicaCadastro"
          options={{ headerShown:false }}
          component={PessoaJuridicaCadastro}
        /> 
         
            <Stack.Screen
          name="Inicio"
          options={{  headerShown:false  }}
          component={Inicio}
        />
      <Stack.Screen
          name="PosAdd"
          options={{ headerShown:false }}
          component={PosAdd}
        />
    
   
     
     
      <Stack.Screen
          name="Add"
          options={{ headerShown:false }}
          component={Add}
        />

   
    
      
  
    
        
      <Stack.Screen
          name="HomeJur"
          options={{ headerShown:false  }}
          component={HomeScreenJur}
        />
         

          <Stack.Screen
          name="Favoritos"
          options={{ headerShown:false  }}
          component={Favoritos}
        />

        
          <Stack.Screen
          name="AnimalDesc"
          options={{ headerShown:false  }}
          component={AnimalDesc}
        />
      
      
      
        
    </Stack.Navigator>
    </NavigationContainer>

  
  );
}
