import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal } from 'react-native';
import { Button, Menu, Divider, Provider , Card, Text, Searchbar } from 'react-native-paper';
import {MenuOutlined, HeartFilled} from '@ant-design/icons';

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

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const modalV = () => {
    setShowModal(true);
  };

  const animalData = [
    { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', local: 'SP', image: require('../imgs/cat.jpg') },
    { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', local: 'SP', image: require('../imgs/dog.jpg') },
    { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', local: 'RJ', image: require('../imgs/bird.jpg') },
    { id: '4', name: 'Hamster', age: '6 meses', breed: 'Anão russo', local: 'MG', image: require('../imgs/hamster.jpeg') },
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
           <TouchableOpacity onPress={modalV}> <MenuOutlined/> </TouchableOpacity> 
          </View>
          {showModal && (
            <Modal animationType="slide" visible={showModal} transparent={true}>
              <View  style={styles.modalContent}>
                <Text>CONDIGURSDASFSJHJDSVHD </Text>
                <Button style={{backgroundColor: 'black'}} value="Fechar" onPress={() => setShowModal(false)} />
              </View>
            </Modal>
          )}
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
    padding: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: 'black',
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


export default HomeScreen;