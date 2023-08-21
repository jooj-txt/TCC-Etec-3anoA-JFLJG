import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {Inicio,PessoaFisicaCadastro} from './Telas/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Cad_Fisica"
          options={{ headerShown:false }}
          component={PessoaFisicaCadastro}
        />
       
    </Stack.Navigator>
    </NavigationContainer>
  
  );
}
