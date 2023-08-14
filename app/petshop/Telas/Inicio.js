import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import styles from '../Design/style.js';


export default function Inicio({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/logo_Inicio.png')} style={styles.logo} />
      <Image source={require('../imgs/logo_Inicio2.png')} style={{width: 200,
    height: 200}}/>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Pessoa Jurídica</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Pessoa Física</Text>
        </Pressable>
      </View>

      <View style={styles.divider}>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#FFAE2E', marginHorizontal: '4px',  }}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#FFAE2E',  marginHorizontal: '4px'}}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#FFAE2E', marginHorizontal: '4px'}}></View>
      </View>
    </View>
  );
}