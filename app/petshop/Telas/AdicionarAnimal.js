import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-paper';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AdicionarAnimal = ({ route, navigation }) => {
  const [name, onChangeName] = React.useState('');
  const [sexo, onChangeSexo] = React.useState('');
  const [raça, onChangeRaça] = React.useState('');
  const [endereço, onChangeEndereço] = React.useState('');
  const [descricao, onChangeDescricao] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [userId, setUserId] = React.useState(null);

  const db = getFirestore();
  const auth = getAuth();

  // Use useEffect para observar as mudanças no usuário autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Defina o userId com o ID do usuário autenticado
      } else {
        // O usuário não está autenticado, você pode fazer algo aqui se necessário
        setUserId(null);
      }
    });

    return unsubscribe; // Certifique-se de cancelar a inscrição ao descartar o componente
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newImages = [...images, result.uri]; // Adicione a URL da imagem ao array
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index); // Remova a imagem do array com base no índice
    setImages(newImages);
  };

  const renderButtonContent = () => {
    if (images.length > 0) {
      return (
        <ScrollView horizontal>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={{ width: 200, height: 200, marginRight: 15 }} />
          ))}
        </ScrollView>
      );
    } else {
      return <FontAwesome5 name="image" size={24} color="black" />;
    }
  };


  const divulgarAnimal = async () => {
    try {
      // Verifique se o usuário está autenticado
      if (!userId) {
        console.log('O usuário não está autenticado.');
        return;
      }

      // Envie os dados do animal para o Firestore, incluindo o userId
      const animalData = {
        name,
        sexo,
        raça,
        endereço,
        descricao,
        images,
        userId, // Inclua o userId do usuário logado
      };

      const animaisRef = collection(db, 'Animais');
      const docRef = await addDoc(animaisRef, animalData);

      console.log('Animal adicionado com ID: ', docRef.id);

      // Lógica para redirecionar após adicionar o animal
      // Você pode redirecionar para uma página de sucesso, por exemplo
    } catch (error) {
      console.error('Erro ao adicionar o animal: ', error);
    }
  };

  // Renderização do componente e outras partes do código...
  return (
      <View style={styles.container}>
            {/* Componente para exibir imagens selecionadas e permitir remoção */}
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.selectedImageContainer}>
              <Image source={{ uri: image }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <FontAwesome5 name="times-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
            {renderButtonContent()}
          </TouchableOpacity>
          <View>
            <View style={[styles.detailsContainer, styles.ajust]}>
              <FontAwesome5 name="user" size={24} color="black" />
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeName}
                value={name}
                label="Nome"
    
              />
            </View>
            </View>
          
        </View>
          
            <View style={styles.detailsContainer}>
              <FontAwesome5 name="venus-mars" size={24} color="black"/>
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeSexo}
                value={sexo}
                label='Sexo'
              />
            </View>
            <View style={styles.detailsContainer}>
              <FontAwesome5 name="paw" size={24} color="black"/>
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeRaça}
                value={raça}
                label='Raça'
              />
            </View>
            <View style={styles.detailsContainer}>
              <FontAwesome5 name="house-user" size={24} color="black"/>
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeEndereço}
                value={endereço}
                label='Endereço'
              />
            </View>
            <View style={styles.detailsContainer}>
              <FontAwesome5 name="keyboard" size={24} color="black"/>
              <TextInput
                style={[styles.inputDesc, styles.input]}
                onChangeText={onChangeDescricao}
                value={descricao}
                label='Descrição'
                multiline={true}
                numberOfLines={4}
              />
            </View>
        <TouchableOpacity
          style={styles.divulgarButton}
          onPress={divulgarAnimal}        >
          <Text style={styles.divulgarButtonText}>Divulgar animal</Text>
        </TouchableOpacity>
      </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center'
  },
  animalImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2163D3', 
    borderRadius: 5, 
    padding: 8,
    margin: 5,
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderBottomColor: '#0B35C3',
    borderBottomWidth: 5,
  },
  divulgarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2163D3', 
    borderRadius: 5, 
    padding: 8,
    margin: 5,
    shadowRadius:2,
  },
  input: {
    flex: 1,
    marginLeft: 8, 
    color: '#000',
    backgroundColor: 'white',
  },
  inputHeight:{
    height: 80,
  },
  inputDesc: {
    height: 70,
  },
  pickUpImage: {
    width: 250, 
    height: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center',
    margin: 12,
    shadowOpacity:2,
    shadowRadius:2,
  },
  pickImage: {
    width: 200,
    height: 200,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:60,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    zIndex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedImageContainer: {
    margin: 5,
    position: 'relative',
  },
  selectedImage: {
    width: 200,
    height:200,
  },
  ajust:{
marginTop:100,
width:100,
height:85,

  }

});
 
export default AdicionarAnimal;