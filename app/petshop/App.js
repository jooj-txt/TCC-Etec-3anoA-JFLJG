import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
styles = require('../estilos/style');

const AppStartScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/logo.png')} style={styles.logo} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pessoa Jurídica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pessoa Física</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
      </View>
    </View>
  );
};
