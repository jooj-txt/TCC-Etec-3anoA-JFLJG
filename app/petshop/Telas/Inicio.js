import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'; 


import styles from '../Design/style.js';
import logo from '../imgs/logo_Inicio.png';
import logo2 from '../imgs/logo_Inicio2.png';




export default function Inicio({navigation}) {
  
  const [showModal, setShowModal] = useState(false);
  const [isButtonsVisible, setButtonsVisible] = useState(true);

  
  const handlePessoaJuridicaPress = () => {
    setButtonsVisible(false);
    setShowModal(true);
  };


  
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Image source={logo2} style={styles.logo2} />

         

          {isButtonsVisible && (
         <View style={styles.buttonsContainer}>
         <TouchableOpacity style={styles.button} onPress={handlePessoaJuridicaPress}>
           <Text style={styles.buttonText}>ONG ou Petshop</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.button} onPress={handlePessoaJuridicaPress}>
           <Text style={styles.buttonText}>Adotante ou Doador</Text>
         </TouchableOpacity>

       </View>
      )}
        
      <View style={styles.divider}>
        <View style={{width:35,height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px',  }}></View>
        <View style={{width:35,  height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,  height: 3,backgroundColor: '#FFAE2E',  marginHorizontal: '4px'}}></View>
        <View style={{width:35,   height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px'}}></View>
      </View>

{showModal && (
  <Modal animationType="slide" visible={showModal} transparent={true}>
    <BlurView style={styles.containerModal} intensity={35} tint="light">

      <View style={estilo.buttonsContainer}>
        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            navigation.navigate('Login');
            setButtonsVisible(true);
            setShowModal(false);          }}   
        >
          <Text style={estilo.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            navigation.navigate('PessoaFisicaCadastro');
            setButtonsVisible(true);
            setShowModal(false);            
          }}
        >
          <Text style={estilo.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ 
          height:60,
          width:60,
          margin:15,
          marginLeft:50,
          backgroundColor:'#2163D3',
          borderRadius:200,
          alignItems:'center',
          justifyContent:"center"
        }}
          onPress={() => {
            setButtonsVisible(true);
            setShowModal(false);
          }}
        >
          <Ionicons name="ios-arrow-back-sharp" size={45} color="#FFAE2E" />
        </TouchableOpacity>


      </View>
    </BlurView>
  </Modal>
)}

    </View>
  );
}
const estilo = StyleSheet.create({
  button: {
      backgroundColor: '#2163D3', // Cor dos botões azul
      borderRadius: 10,
      height:50,
      width:150,
      margin:15,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      paddingVertical:12,
      textAlign:'center',
      alignSelf:'center',
      fontFamily:'Verdana',
      fontWeight:'bold'
      
    },

    buttonsContainer: {
      marginTop:320
    },

    


})