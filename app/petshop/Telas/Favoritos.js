import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  // Função para remover um animal da lista de favoritos
  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter((animal) => animal.id !== id));
  };

  const renderItem = ({ item }) => (
    <Card style={styles.animalCard}>
      <Card.Cover source={item.image} />
      <Card.Content>
        <Text>{item.name}</Text>
        <Text>{item.breed}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => removeFavorito(item.id)}>Remover dos Favoritos</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {favoritos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum animal nos favoritos.</Text>
      ) : (
        <FlatList
          data={favoritos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  animalCard: {
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
  },
});

export default Favoritos;
