import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal } from 'react-native';
import { Button, Menu, Divider, Provider , Card, Text, Searchbar } from 'react-native-paper';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem  } from '@react-navigation/drawer';
import {MenuOutlined, HeartFilled} from '@ant-design/icons';
import Config from './Config';

const Drawer = createDrawerNavigator();

const AnimalCard = ({ animal }) => (
  <Card style={styles.animalCard}>
    <Card.Cover style={styles.animalImage} source={animal.image} />
    <Card.Content>
      <Text variant="titleLarge" style={styles.animalText}>{animal.name}, {animal.age}</Text>
      <Text variant="bodyMedium" style={styles.animalText}>{animal.breed}</Text>
      <Text variant="bodyMedium" style={[styles.animalText, styles.animalLocal]}>{animal.local}</Text>
      <TouchableOpacity style={{alignSelf: "flex-start"}}><HeartFilled/></TouchableOpacity>
    </Card.Content>
  </Card>
);

  export default function HomeScreen() {

    const [searchText, setSearchText] = useState('');


    return (     
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    
        <Drawer.Screen name='Home' component={Conteudo} 
         options={{
          title:null,
          headerStyle: {
            backgroundColor: "#2163D3",
          },
          headerRight: () => (
            <Searchbar
            placeholder="Pesquisar"
            onChangeText={setSearchText}
            value={searchText}
            style={styles.searchInput}
          />  ),
           
        
        }}
        />
        <Drawer.Screen name='Configurações' component={Config} />
      </Drawer.Navigator>
    );
      
  }
  
  function CustomDrawerContent({ navigation, props }) {
    return (
      <DrawerContentScrollView {...props}>
           <DrawerItem label="Configurações" onPress={() => navigation.navigate("Config")}
         />
           <DrawerItem label="Sair" onPress={() => navigation.navigate("Home")}
         />
      </DrawerContentScrollView>
    );
  }

  
  
  function Conteudo({ navigation }) { // Adicionado parâmetro de navegação
    const [selectedFilters, setSelectedFilters] = useState([]); // Movido para dentro do componente Conteudo
  
    const animalData = [
      { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', local: 'SP', image: require('../imgs/cat.jpg') },
      { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', local: 'SP', image: require('../imgs/dog.jpg') },
      { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', local: 'RJ', image: require('../imgs/bird.jpg') },
      { id: '4', name: 'Hamster', age: '6 meses', breed: 'Anão russo', local: 'MG', image: require('../imgs/hamster.jpeg') },
    ];
  
    const filterAnimals = () => {
      // Implement your filter logic here based on selectedFilters
      // You can filter the animalData array and update the filteredAnimals state
      // For simplicity, we'll use the entire animalData for this example
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
  searchInput : {
    marginRight:"20%",
    borderRadius: 20,
    backgroundColor: '#FFAE2E',
    fontSize: 16,
    color: 'black',
    width:"80%",
    height: "85%",
  },
  menuButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  menu: {
    // Add your menu styles here
  },
  animalList: {
    // Add styles for the animal list here
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
    color:'black',
  },
  animalLocal: {
    textAlign:'end',
    fontWeight:'bold',
  },
  animalImage: {
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    width:"40%", 
    height:"100%", 
    backgroundColor:'white',

  },
});


