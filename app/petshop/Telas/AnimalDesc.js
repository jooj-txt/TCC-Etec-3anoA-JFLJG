import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image,ActivityIndicator } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 


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
    return  <ActivityIndicator size="large" color="#2163D3" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:150 }} />

  }

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row'}}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="ios-arrow-back-sharp" size={25} color="#FFAE2E" />
      </Pressable>
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
        <Text style={styles.infoText}>{animalInfo.name}, {animalInfo.idade} </Text>

        <MaterialCommunityIcons name="gender-male-female" size={24} color="#FFAE2E" />
        <Text style={styles.infoText}>{animalInfo.sexo}</Text>

        <Text style={styles.infoLabel}>Raça:</Text>
        <Text style={styles.infoText}>{animalInfo.raça}</Text>

        <Text style={styles.infoLabel}>Local:</Text>
        <Text style={styles.infoText}>{animalInfo.cidade}-{animalInfo.estado}</Text>

        <Text style={styles.infoLabel}>Descrição:</Text>
Text style={styles.infoText}>{animalInfo.descricao}</Text>
      </View>

      <Pressable
        style={styles.Button}
        onPress={() => navigation.navigate('TelaAdocao', { animalId: animalInfo.ID })} >        
         <Text style={styles.infoTextButton}>ME ADOTE</Text>
     </Pressable>



      
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
    marginLeft:"10%",
    
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 24,
    marginBottom: 15,
  },
  infoTextButton: {
    fontSize: 16,
    marginBottom: 15,
    color:"#FFAE2E",
    fontWeight:'bold',
  },
  backButton: {
    backgroundColor: '#2163D3',
    padding: 7,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 5,
    marginBottom:25,
    marginRight:20,
    width:40,
    height:40,
  },
  Button: {
    backgroundColor: '#2163D3',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 150,
    marginLeft: 250,
    width:180,
    height: 50,
    borderColor: 'darkblue',
    borderBottomWidth: 5,
    justifyContent:'center'
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnimalDesc;
