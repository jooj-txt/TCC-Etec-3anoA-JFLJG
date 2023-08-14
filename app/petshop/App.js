import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Inicio from './Telas/Inicio';



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
       
    </Stack.Navigator>
    </NavigationContainer>
  
  );
}
