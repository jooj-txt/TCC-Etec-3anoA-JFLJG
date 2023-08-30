import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {Inicio,PessoaFisicaCadastro,Login} from './Telas/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="Inicio"
          options={{ headerShown:false }}
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

       
 
       
    </Stack.Navigator>
    </NavigationContainer>
  
  );
}
