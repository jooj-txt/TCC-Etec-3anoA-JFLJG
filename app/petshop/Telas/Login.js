import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import logo from '../imgs/logo_Inicio.png';
import logo2 from '../imgs/logo_Inicio2.png';

export default function Login({navigation}) {
  
  
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Image source={logo2} style={styles.logo2} />

      <TextInput
        style={styles.input}
        placeholder="Email"
     
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
      />

    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
        
      <View style={styles.divider}>
        <View style={{width:35,height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px',  }}></View>
        <View style={{width:35,  height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,  height: 3,backgroundColor: '#FFAE2E',  marginHorizontal: '4px'}}></View>
        <View style={{width:35,   height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px'}}></View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Cor de fundo branca
      alignItems: 'center',
      justifyContent: 'center',
  
    },
   
    input: {
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#2163D3',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      width:100,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      logo: {
        width:220, 
        height: 220, 
        marginBottom:-5
      },

      logo2: {
        width:220, 
        height: 220, 
        marginBottom: 10
      },
  
  
  });
  