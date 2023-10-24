import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, StyleSheet, Image, SafeAreaView, Switch } from 'react-native';
import {  Provider , Card, Text, Searchbar } from 'react-native-paper';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Add, ConfigPerfil, Favoritos} from './rotas';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import logo from '../imgs/logo_Inicio.png';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const animalAdd = [
  { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', local: 'SP', image: require('../imgs/cat.jpg') },
  { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', local: 'SP', image: require('../imgs/dog.jpg') },
  { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', local: 'RJ', image: require('../imgs/bird.jpg') },
  { id: '4', name: 'Hamster', age: '6 meses', breed: 'Anão russo', local: 'MG', image: require('../imgs/hamster.jpeg') },
  { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', local: 'SP', image: require('../imgs/dog.jpg') },
  { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', local: 'SP', image: require('../imgs/cat.jpg') },
];

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
      },
    }}>
      <Tab.Screen 
        name='Casa' 
        component={Casa} 
        options={{ 
          headerShown: false, 
          tabBarLabel: '', 
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name='Add' 
        component={Add} 
        
        options={{ 
          headerShown: false, 
          tabBarLabel: '', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
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
            <Ionicons name="person" size={size} color={color} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
}


  function CustomDrawerContent({ navigation, ...props }) {
    const [isDarkMode, setIsDarkMode] = useState('');

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
          label="Sair" 
          onPress={() => navigation.navigate("Home")} 
          labelStyle={styles.drawerItem} />

        <View style={styles.darkModeSwitch}>
        <Text style={styles.darkModeLabel}>Modo Escuro</Text>
        <Switch value={isDarkMode} />
      </View>
      </DrawerContentScrollView>
    );
  }
  
  function DrawerNavigator() {
    const [searchText, setSearchText] = useState('');
    const searchAnimals = () => {
      if (searchText === '') {
        return animalAdd; 
      } else {
        return animalAdd.filter(animal => animal.name.toLowerCase().includes(searchText.toLowerCase()));
      }
    };
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

    </Drawer.Navigator>
  );
}

function Casa({ navigation }) {
  
  const [selectedFilter, setSelectedFilter] = useState('TODOS');
  const filterAnimals = () => {
    if (selectedFilter === 'TODOS') {
      return animalAdd; 
    } else {
      return animalData.filter(animal => animal.name.toLowerCase() === selectedFilter.toLowerCase());
    }
  };
  
  
  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View style={styles.animalList}>
         
          <FlatList
            data={filterAnimals()}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AnimalCard animal={item} />
            )}
          />
        </View>
      </ScrollView>
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
      <TouchableOpacity onPress={() => console.log('Adicionar aos Favoritos')} style={{ alignSelf: "flex-start" }}>
        <FontAwesome5 name="heart" size={16} color="black" />
      </TouchableOpacity>
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
    marginRight: '20%',
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
    textAlign: 'right',
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
    borderBottomWidth: 4,
    borderRadius: 2,
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
  //FILTER
  filterContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center', 
  },

  filterCard:{
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:1,
    margin: 5,
  },
  textFilter:{
    fontSize: 12,
    fontFamily: "sans-serif-light",
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  darkModeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  darkModeLabel: {
    fontSize: 16,
  },
});