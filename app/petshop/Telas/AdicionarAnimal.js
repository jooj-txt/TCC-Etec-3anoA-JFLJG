import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString   } from 'firebase/storage';

const AdicionarAnimal = ({ route, navigation }) => {
  const [name, onChangeName] = React.useState('');
  const [sexo, onChangeSexo] = React.useState('');
  const [raça, onChangeRaça] = React.useState('');
  const [endereço, onChangeEndereço] = React.useState('');
  const [descricao, onChangeDescricao] = React.useState('');
  const [tipo, onChangeTipo] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [userId, setUserId] = React.useState(null);
  const fileInputRef = useRef(null);

  const itemStyles = [
    { borderColor: '#2163D3' },
    { borderColor: '#FFAE2E' }
  ];

  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return unsubscribe;
  }, []);

  const uploadImageToStorage = async (file) => {
    const storage = getStorage();
    const imageRef = ref(storage, 'images/' + Date.now());

    try {
      // Fazer upload da imagem para o Firebase Storage
      await uploadBytes(imageRef, file);

      // Obter a URL de download da imagem
      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer o upload da imagem: ', error);
      return null;
    }
  };


  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Fazer upload da imagem para o Firebase Storage
        const downloadURL = await uploadImageToStorage(file);

        if (downloadURL) {
          const newImages = [...images, downloadURL]; // Adicione a URL de download da imagem ao array
          setImages(newImages);
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem: ', error);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const renderButtonContent = () => {
    if (images.length > 0) {
      return <FontAwesome5 name="image" size={24} color="black" />;
    } else {
      return <FontAwesome5 name="image" size={24} color="black" />;
    }
  };

  const divulgarAnimal = async () => {
    try {
      if (!userId) {
        console.log('O usuário não está autenticado.');
        return;
      }

      const animalData = {
        name,
        sexo,
        raça,
        endereço,
        descricao,
        images,
        tipo,
        userId,
      };

      const animaisRef = collection(db, 'Animais');
      const docRef = await addDoc(animaisRef, animalData);

      console.log('Animal adicionado com ID: ', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar o animal: ', error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
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
          <label htmlFor="imageInput" style={styles.pickImage}>
            
          </label>
          <input
          type="file"
          id="imageInput"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => handleFileInputChange(e)}
        />
        </View>
        <View style={[styles.detailsContainer, itemStyles[0]]}>
                <FontAwesome5 name="user" size={24} color="black" />
                <TextInput
                  style={[styles.input, styles.inputHeight]}
                  onChangeText={onChangeName}
                  value={name}
                  label="Nome"
                />
            </View>
            <View style={[styles.detailsContainer, itemStyles[1]]}>
              <FontAwesome5 name="venus-mars" size={24} color="black"/>
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeSexo}
                value={sexo}
                label='Sexo'
              />
            </View>
            <View style={[styles.detailsContainer, itemStyles[0]]}>
              <FontAwesome5 name="paw" size={24} color="black"/>
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeRaça}
                value={raça}
                label='Raça'
              />
               
            </View>

            <View style={styles.detailsContainer}>
            <Picker
        style={[styles.picker, itemStyles[1]]}
        selectedValue={tipo}
        onValueChange={(itemValue) => onChangeTipo(itemValue)}
      >
        <Picker.Item  style={[styles.picker, itemStyles[0]]} label="Selecione a espécie" value="" />
        <Picker.Item  style={[styles.picker, itemStyles[1]]} label="Gato" value="gato" />
        <Picker.Item  style={[styles.picker, itemStyles[0]]} label="Cachorro" value="cachorro" />
      
      </Picker>
      </View>
            <View style={[styles.detailsContainer, itemStyles[0]]}>
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
      </ScrollView>
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
    backgroundColor: '#FFAE2E',
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
  },
  picker: {
    height: 80,
    width:280,
    borderWidth:3,  

  },

});
 
export default AdicionarAnimal;