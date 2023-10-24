import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AdicionarAnimal = ({ route, navigation }) => {
  // Suponha que você tenha passado as informações do animal como parâmetros de navegação.

  return (
    <View style={styles.container}>
      <Image style={styles.animalImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.animalName}></Text>
        <Text style={styles.animalInfo}></Text>
        <Text style={styles.animalInfo}></Text>
        <Text style={styles.animalInfo}></Text>
      </View>

      <TouchableOpacity
        style={styles.divulgarButton}
        onPress={() => {
          // Adicione a lógica para entrar em contato com o proprietário do animal
          // Isso pode ser um redirecionamento para uma página de contato ou outra ação.
        }}
      >
        <Text style={styles.divulgarButtonText}>Divulgar animal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  animalImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animalInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  divulgarButton: {
    backgroundColor: '#2163D3',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  divulgarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdicionarAnimal;
