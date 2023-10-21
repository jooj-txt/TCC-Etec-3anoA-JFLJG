import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, StyleSheet, Image } from 'react-native';
import {  Provider , Card, Text, Searchbar } from 'react-native-paper';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem  } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HeartFilled, HomeFilled, SettingFilled} from '@ant-design/icons';
import { AntDesign } from 'react-native-vector-icons';
import {Config, ConfigPerfil, Favoritos} from './rotas';
import logo from '../imgs/logo_Inicio.png';




const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

function Tabs({ navigation }) {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: {
        fontSize: 16, // Tamanho da fonte das guias
        fontWeight: 'bold', // Estilo da fonte das guias
      },
      tabBarActiveTintColor: '#FFAE2E', // Cor do texto da guia ativa
      tabBarInactiveTintColor: '#143D9B', // Cor do texto da guia inativa
      tabBarStyle: {
        backgroundColor: '#2163D3', // Cor de fundo da barra de guias
        borderTopWidth: 2, // Largura da borda superior
        borderColor: 'blue', // Cor da borda superior
      },
    }}>
      <Tab.Screen 
        name='Home' 
        component={Home} 
        options={{ 
          headerShown: false, 
          tabBarLabel: '', 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name='Favoritos' 
        component={Favoritos} 
        options={{ 
          headerShown: false, 
          tabBarLabel: '', 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='heart' color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name='Configurações' 
        component={ConfigPerfil}  
        options={{ 
          headerShown: false, 
          tabBarLabel: '', 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='setting' color={color} size={size} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
}


  function CustomDrawerContent({ navigation, ...props }) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.containerDrawer}>
          <View  style={styles.userArea}>
          <Image
              source={logo}
              style={styles.user}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.nome}>Vira Lar</Text>
              <Text style={styles.email}>viralar@gmail.com</Text>
            </View>
          </View>
        </View>
  
        <DrawerItem 
          label="Configurações" 
          onPress={() => navigation.navigate("Config")} 
          labelStyle={styles.drawerItem} />
        <DrawerItem 
          label="Sair" 
          onPress={() => navigation.navigate("Home")} 
          labelStyle={styles.drawerItem} />
      </DrawerContentScrollView>
    );
  }
  
  function DrawerNavigator() {
    const [searchText, setSearchText] = useState('');
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Tabs} options={{
        title: null,
        headerStyle: {
          backgroundColor: "#2163D3",
        },
        headerRight: () => (
          <Searchbar
            placeholder="Pesquisar"
            onChangeText={setSearchText}
            value={searchText}
            style={styles.searchInput}
          />
        ),
      }} />
      <Drawer.Screen name='Config' component={Config} /> 
    </Drawer.Navigator>
  );
}

function Home({ navigation }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const animalData = [
    { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', local: 'SP', image: require('../imgs/cat.jpg') },
    { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', local: 'SP', image: require('../imgs/dog.jpg') },
    { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', local: 'RJ', image: require('../imgs/bird.jpg') },
    { id: '4', name: 'Hamster', age: '6 meses', breed: 'Anão russo', local: 'MG', image: require('../imgs/hamster.jpeg') },
  ];

  const filterAnimals = () => {
    // Implemente sua lógica de filtro aqui com base em selectedFilters
    // Você pode filtrar a matriz animalData e atualizar o estado filteredAnimals
    // Para simplificar, usaremos toda a animalData neste exemplo
    return animalData;
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView style={styles.animalList}>
          <FlatList
            data={filterAnimals()}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AnimalCard animal={item} />
            )}
          />
        </ScrollView>
      </View>
    </Provider>
  );
}
const AnimalCard = ({ animal }) => (
  <Card style={styles.animalCard}>
    <Card.Cover style={styles.animalImage} source={animal.image} />
    <Card.Content>
      <Text variant="titleLarge" style={styles.animalText}>{animal.name}, {animal.age}</Text>
      <Text variant="bodyMedium" style={styles.animalText}>{animal.breed}</Text>
      <Text variant="bodyMedium" style={[styles.animalText, styles.animalLocal]}>{animal.local}</Text>
      <TouchableOpacity onPress={() => console.log('Adicionar aos Favoritos')} style={{ alignSelf: "flex-start" }}><HeartFilled /></TouchableOpacity>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  searchInput: {
    marginRight: "20%",
    borderRadius: 20,
    fontSize: 16,
    color: 'black',
    width: "80%",
    height: "85%",
    paddingLeft: 10, 
    paddingRight: 10, 
    borderColor: '#FFAE2E', 
    borderWidth: 2, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
  },
  menuButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  menu: {
    // Adicione seus estilos de menu aqui
  },
  animalList: {
    // Adicione estilos para a lista de animais aqui
  },
  animalCard: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  animalText: {
    color: 'black',
  },
  animalLocal: {
    textAlign: 'end',
    fontWeight: 'bold',
  },
  animalImage: {
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    width: "40%",
    height: "100%",
    backgroundColor: 'white',
  },
  //DRAWER
  containerDrawer:{
    flex:1,
    backgroundColor: 'lightblue',
  },
  userArea:{
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    borderColor: 'blue',
    borderBottomWidth: '4px',
    borderRadius: '2px',
  },
  user:{
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 40,
  },
  nome:{
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'navy'
  },
  email:{
    fontSize: 15,
    marginBottom: 8,
    color: 'darkblue', 
  },
  drawerItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
});
