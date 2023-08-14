import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./imgs/logo_Inicio.png')} style={styles.logo} />
      <Image source={require('./imgs/logo_Inicio2.png')} style={{width: 200,
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
    backgroundColor: '#2163D3', marginHorizontal: '4px',  }}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#2163D3',  marginHorizontal: '4px'}}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,
    height: 3,
    backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom:-30
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2163D3', // Cor dos botões azul
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width:20,
    height: 5,
    backgroundColor: '#2163D3', // Cor dos traços azul
    marginHorizontal: 2,
  },
});
