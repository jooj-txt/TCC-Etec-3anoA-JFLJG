import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Provider , Card, Text, Searchbar   } from 'react-native-paper';
import {MenuOutlined} from '@ant-design/icons';


const AnimalCard = ({ animal }) => (
  <Card style={styles.animalCard}>
    <Card.Cover style={styles.animalImage} source={animal.image} />
    <Card.Content>
      <Text variant="titleLarge" style={styles.animalText}>{animal.name}</Text>
      <Text style={styles.animalText}>{animal.age}</Text>
      <Text variant="bodyMedium" style={styles.animalText}>{animal.breed}</Text>
      <Text style={styles.animalText}>{animal.color}</Text>
    </Card.Content>
  </Card>
);

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  const animalData = [
    { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', color: 'Branco', image: require('../imgs/cat.jpg') },
    { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', color: 'Dourado', image: require('../imgs/dog.jpg') },
    { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', color: 'Amarelo', image: require('../imgs/bird.jpg') },
    { id: '4', name: 'Hamster', age: '6 meses', breed: 'Anão russo', color: 'Branco', image: require('../imgs/hamster.jpeg') },
    // Add more animals as needed
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
        <View style={styles.header}>
          <View>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Button onPress={openMenu}><MenuOutlined/></Button> }>
              <Menu.Item onPress={() => {}} title="Item 1" />
              <Menu.Item onPress={() => {}} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
          </View>
          <Searchbar
            style={styles.searchInput}
            placeholder="Pesquisar animais"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
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
  animalImage: {

    marginBottom: 20,
  },
});


export default HomeScreen;
