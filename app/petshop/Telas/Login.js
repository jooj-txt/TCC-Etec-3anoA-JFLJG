import React, { useState, useContext  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../imgs/logo_Inicio.png';
import logo2 from '../imgs/logo_Inicio2.png';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './AuthProvider'; // Importe o contexto
import { Alert } from 'react-native';



export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const auth = getAuth();
  
  // Acesse o contexto para verificar o tipo de usuário
  const { userType, login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Autenticar o usuário com o Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      // Autenticação bem-sucedida, redirecionar para a tela correspondente
      if (userType === 'user') {
        navigation.navigate('Home');
      } else if (userType === 'userJur') {
        navigation.navigate('HomeJur');
      }
    } catch (error) {
      // Lidar com erros de autenticação, por exemplo, exibir uma mensagem de erro
      console.error('Erro de autenticação:', error.message);
    }  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          margin: 15,
          marginLeft: -200,
          backgroundColor: '#2163D3',
          borderRadius: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
        navigation.navigate('Inicio')   
     }}
      >
        <Ionicons name="ios-arrow-back-sharp" size={30} color="#FFAE2E" />
      </TouchableOpacity>
      <Image source={logo} style={styles.logo} />
      <Image source={logo2} style={styles.logo2} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.divider}>
        <View style={{ width: 35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px' }}></View>
        <View style={{ width: 35, height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px' }}></View>
        <View style={{ width: 35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px' }}></View>
        <View style={{ width: 35, height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px' }}></View>
        <View style={{ width: 35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px' }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // Cor de fundo branca
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 280,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2163D3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
    margin: 20,
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
    width: 220,
    height: 220,
    marginBottom: -5,
  },
  logo2: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },
});
