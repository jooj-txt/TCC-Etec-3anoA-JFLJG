import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Image, Modal} from 'react-native';
import styles from '../Design/style.js';

import logo from '../imgs/logo_Inicio.png';
import logo2 from '../imgs/logo_Inicio2.png';




export default function Inicio({navigation}) {
  
  const [showModal, setShowModal] = useState(false);
  

 


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Image source={logo2} style={styles.logo2} />

          <View style={styles.buttonsContainer}>
            <Pressable style={styles.button} onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Pessoa Jurídica</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Pessoa Física</Text>
            </Pressable>
          </View>
        
      <View style={styles.divider}>
        <View style={{width:35,height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px',  }}></View>
        <View style={{width:35,  height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,  height: 3,backgroundColor: '#FFAE2E',  marginHorizontal: '4px'}}></View>
        <View style={{width:35,   height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px'}}></View>
      </View>

{showModal && (
  <Modal animationType="slide" transparent={true} visible={showModal}>
    <View style={styles.container}>
    <Image source={logo} style={styles.logo} />


      <View style={estilo.buttonsContainer}>
        <Pressable style={estilo.button}>
          <Text style={estilo.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={estilo.button}>
          <Text style={estilo.buttonText}>Cadastrar-se</Text>
        </Pressable>
      </View>

    </View>
  </Modal>
)}
    </View>
  );
}
const estilo = StyleSheet.create({
  button: {
      backgroundColor: '#2163D3', // Cor dos botões azul
      borderRadius: 8,
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
    },

    buttonsContainer: {
    },



})