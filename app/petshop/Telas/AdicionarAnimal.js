import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TextInput} from 'react-native-paper';

const AdicionarAnimal = ({ route, navigation }) => {
  const [name, onChangeName] = React.useState(null);
  const [sexo, onChangeSexo] = React.useState(null);
  const [raça, onChangeRaça] = React.useState(null);
  const [endereço, onChangeEndereço] = React.useState(null);
  const [descricao, onChangeDescricao] = React.useState(null);
  const [image, setImage] = React.useState(null);
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderButtonContent = () => {
    if (image) {
      return <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />;
    } else {
      return <FontAwesome5 name="image" size={24} color="black" />;
    }
  };

 
  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={{flexDirection: 'column',  alignItems:'center'}}>
            <TouchableOpacity style={styles.pickUpImage}  onPress={pickImage}>
              {renderButtonContent()}
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <FontAwesome5 name="user" size={24} color="black" />
              <TextInput
                style={[styles.input, styles.inputHeight]}
                onChangeText={onChangeName}
                value={name}
                label="Nome"
    
              />
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
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAE2E',
    alignItems: 'center',
    justifyContent:'center'
  },
  animalImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
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
    backgroundColor: '#FFAE2E',
  },
  inputHeight:{
    height: 50,
  },
  inputDesc: {
    height: 70,
  },
  pickUpImage: {
    width: 250, height: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center',
    margin: 12,
  }
});
 
export default AdicionarAnimal;