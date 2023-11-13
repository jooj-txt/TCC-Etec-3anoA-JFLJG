import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PosAdd({ navigation }) {
  const handleRefresh = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Image source={require('../imgs/logo_Inicio.png')} style={styles.image} />
        <Text style={styles.text}>Seu Texto Aqui</Text>
      </View>
      <TouchableOpacity onPress={handleRefresh} style={{ width: 200 }}>
        <Text>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
