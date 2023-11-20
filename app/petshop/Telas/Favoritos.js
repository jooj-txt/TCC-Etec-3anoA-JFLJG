import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { getFirestore, collection, getDoc, query, where, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, auth } from 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

const Favoritos = ({ route, navigation }) => {
  const [user, setUser] = React.useState(null);
  const [favoritos, setFavoritos] = useState([]);

  const db = getFirestore();
  const auth = getAuth();

  const fetchData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'PessoasFisicas', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setFavoritos(userData.favoritos || []);
        } else {
          console.log('Documento do usuário não encontrado');
        }
      } else {
        console.log('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao buscar favoritos do usuário no Firestore', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Executa essa função sempre que a tela é focada
      fetchData(); // Chama a função para buscar os dados novamente
    }, [])
  );
 
  const removeFavorito = async (id) => {
    if (user && user.uid) {
      try {
        // Remova o favorito do estado local
        const updatedFavoritos = favoritos.filter((animal) => animal.id !== id);
        setFavoritos(updatedFavoritos);

        // Atualize os favoritos no Firestore
        const userDocRef = doc(db, 'PessoasFisicas', user.uid);
        await setDoc(userDocRef, { favoritos: updatedFavoritos });
        
        console.log('Favorito removido com sucesso!');
      } catch (error) {
        console.error('Erro ao remover favorito:', error);
      }
    }
  };
  const RenderItem = ({ item }) => (
    <Card>
      <Card.Cover style={styles.animalImage} source={{ uri: item.images && item.images.length > 0 ? item.images[0] : '' }} />
      <Card.Content>
        <Text variant="titleLarge" style={styles.animalText}>{item.name || 'Nome não disponível'}</Text>
        <Text variant="bodyMedium" style={styles.animalText}>{item.raça || 'Raça não disponível'}</Text>
        <Text variant="bodyMedium" style={styles.animalText}>{item.sexo || 'Sexo não disponível'}</Text>
        <Text variant="bodyMedium" style={[styles.animalText, styles.animalLocal]}>{item.endereço || 'Endereço não disponível'}</Text>
        <TouchableOpacity onPress={() => removeFavorito(item.id)} style={{ alignSelf: "flex-start" }}>
          <Text>Remover dos Favoritos</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
        <View style={styles.animalList}>
      {user && user.uid && favoritos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum animal nos favoritos.</Text>
      ) : (
        <FlatList
            data={favoritos}
              keyExtractor={(item) => item.ID}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.animalCard}
               onPress={() => navigation.navigate('AnimalDesc', { animalId: item.ID })}
              >
                  <RenderItem
              item={item}
              />


    </TouchableOpacity>
  )}
/>
      
      )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  animalCard: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
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
});

export default Favoritos;
