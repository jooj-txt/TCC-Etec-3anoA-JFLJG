import React from 'react';
import { StyleSheet, Text, View, Pressable, Image} from 'react-native';
import styles from '../Design/style.js';


export default function Inicio({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/logo_Inicio.png')} style={styles.logo} />
      <Image source={require('../imgs/logo_Inicio2.png')} style={styles.logo2}/>

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