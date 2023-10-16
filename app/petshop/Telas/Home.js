import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  
  const [searchText, setSearchText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const animalData = [
    { id: '1', name: 'Gato', age: '2 anos', breed: 'Siamês', color: 'Branco' },
    { id: '2', name: 'Cachorro', age: '3 anos', breed: 'Labrador', color: 'Dourado' },
    { id: '3', name: 'Pássaro', age: '1 ano', breed: 'Canário', color: 'Amarelo' },
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
            <View style={styles.animalItem}>
              <Text>{item.name}</Text>
              <Text>{item.age}</Text>
              <Text>{item.breed}</Text>
              <Text>{item.color}</Text>
            </View>
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
  animalItem: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomeScreen;
