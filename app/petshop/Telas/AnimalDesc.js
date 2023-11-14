import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; 

const AnimalDesc = ({ route, navigation }) => {
  const { animalId } = route.params;
  const [animalInfo, setAnimalInfo] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchAnimalInfo = async () => {
      try {
        const animalDocRef = doc(db, 'Animais', animalId);
        const animalDocSnap = await getDoc(animalDocRef);

        if (animalDocSnap.exists()) {
          setAnimalInfo(animalDocSnap.data());
        } else {
          console.log('Documento do animal não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do animal no Firestore', error);
      }
    };

    fetchAnimalInfo();
  }, [animalId]);

  if (!animalInfo) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="ios-arrow-back-sharp" size={25} color="#FFAE2E" />
      </TouchableOpacity>
      <Text style={styles.title}>Informações do Pet</Text>
      </View>
      

      <View style={styles.swiper} showsButtons>
        {animalInfo.images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Nome:</Text>
        <Text style={styles.infoText}>{animalInfo.name}</Text>

        <Text style={styles.infoLabel}>Sexo:</Text>
        <Text style={styles.infoText}>{animalInfo.sexo}</Text>

        <Text style={styles.infoLabel}>Raça:</Text>
        <Text style={styles.infoText}>{animalInfo.raça}</Text>

        <Text style={styles.infoLabel}>Local:</Text>
        <Text style={styles.infoText}>{animalInfo.endereço}</Text>

        <Text style={styles.infoLabel}>Descrição:</Text>
      </View>

      <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('TelaAdoção')}>
      <Text style={styles.infoText}>ME ADOTE</Text>
      </TouchableOpacity>



      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft:"20%",
    
  },
  swiper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#2163D3',
    padding: 7,
    borderRadius: "100%",
    alignItems: 'center',
    marginTop: 5,
    marginBottom:25,
    marginRight:20,
    width:40,
    height:40,
  },
  kButton: {
    backgroundColor: '#2163D3',
    padding: 7,
    borderRadius: "10%",
    alignItems: 'center',
    marginTop: 5,
    marginBottom:25,
    marginRight:20,
    width:100,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnimalDesc;
