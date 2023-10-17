import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text  } from 'react-native-paper';

const AnimalCard = ({ animal }) => (
  <Card style={styles.animalCard}>
    <Card.Cover source={animal.image} />
    <Card.Content>

      <Text variant="titleLarge">{animal.name}</Text>
      <Text>{animal.age}</Text>
      <Text  variant="bodyMedium">{animal.breed}</Text>
      <Text>{animal.color}</Text>
    </Card.Content>
  </Card>
);

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const animalData = [
    { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', color: 'Branco', image: require('../imgs/cat.jpg') },
    { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', color: 'Dourado', image: require('../imgs/dog.jpg') },
    { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', color: 'Amarelo', image: require('../imgs/bird.jpg') },
    // Add more animals as needed
  ];

  const filterAnimals = () => {
    // Implement your filter logic here based on selectedFilters
    // You can filter the animalData array and update the filteredAnimals state
    // For simplicity, we'll use the entire animalData for this example
    return animalData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar animais"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>

      {showMenu && (
        // Implement your menu component here
        <View style={styles.menu}>
          <Text>Menu Content</Text>
          {/* Add your filter options and logic here */}
        </View>
      )}

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 10, // Round the corners for card effect
  },
  animalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});


export default HomeScreen;
