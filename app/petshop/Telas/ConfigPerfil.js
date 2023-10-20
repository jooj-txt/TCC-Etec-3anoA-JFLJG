import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

const ConfigPerfil = () => {
  const [name, setName] = useState('    ');
  const [email, setEmail] = useState('');

  const saveProfile = () => {
    // Implementar a lógica para salvar o perfil aqui
    // Normalmente, isso envolveria uma solicitação à API ou a persistência local
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Configuração de Perfil" />
      </Appbar.Header>

      <TextInput
        label="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <Button mode="contained" onPress={saveProfile} style={styles.button}>
        Salvar Perfil
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 16,
  },
  button: {
    margin: 16,
  },
});

export default ConfigPerfil;
