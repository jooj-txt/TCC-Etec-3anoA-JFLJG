import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebaseConfig';

const itemStyles = [
  {borderColor: '#2163D3' },
  {borderColor: '#FFAE2E' }
]; // Cor das linhas(apenas decoração)


const PessoaJuridicaCadastro = ({setUser}) => {
  const [nome, setNome] = useState();
  const [cnpj, setCNPJ] = useState();
  const [email, setEmail] = useState();
  const [celular, setCelular] = useState();
  const [cep, setCep] = useState();
  const [endereco, setEndereco] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  const [aceitarTermos, setAceitarTermos] = useState(false);
  // Armazenando os dados de cadstro para posteriormente serem guardados no BD



  const handleCNPJChange = (text) => {
    const numericText = text.replace(/\D/g, ''); // Remover caracteres não numéricos

    if (numericText.length <= 2) {
      setCNPJ(numericText);
    } else if (numericText.length <= 5) {
      setCNPJ(`${numericText.slice(0, 2)}.${numericText.slice(2)}`);
    } else if (numericText.length <= 8) {
      setCNPJ(`${numericText.slice(0, 2)}.${numericText.slice(2, 5)}.${numericText.slice(5)}`);
    } else if (numericText.length <= 12) {
      setCNPJ(`${numericText.slice(0, 2)}.${numericText.slice(2, 5)}.${numericText.slice(5, 8)}/${numericText.slice(8)}`);
    } else if (numericText.length <= 14) {
      setCNPJ(`${numericText.slice(0, 2)}.${numericText.slice(2, 5)}.${numericText.slice(5, 8)}/${numericText.slice(8, 12)}-${numericText.slice(12)}`);
    }
  };
    // Formatando o formato do dado CPF


  const handleCheckboxToggle = () => {
    setAceitarTermos(!aceitarTermos);
  };

 
  const handleCad = () => {
    // Crie o usuário com o email e senha fornecidos
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário criado:', user);

        // Faça o login do usuário recém-criado
        signInWithEmailAndPassword(auth, email, senha)
          .then((userCredential) => {
            const loggedInUser = userCredential.user;
            console.log('Usuário logado:', loggedInUser);

            // Defina o usuário no estado
            setUser(loggedInUser);
          })
          .catch((error) => {
            console.error('Erro ao fazer login:', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao criar usuário:', errorMessage);
      });
  };



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro Pessoa Física</Text>
      <TextInput
        style={[styles.input,itemStyles[0]]}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[styles.input,itemStyles[1]]}
        placeholder="CNPJ"
        value={cnpj} 
        onChangeText={handleCNPJChange}     />
      <TextInput
        style={[styles.input,itemStyles[0]]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input,itemStyles[1]]}
        placeholder="Celular"
        value={celular}
        onChangeText={setCelular}
      />

      <TextInput
        style={[styles.input,itemStyles[0]]}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
      />
      <TextInput
        style={[styles.input,itemStyles[1]]}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={[styles.input,itemStyles[0]]}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={[styles.input,itemStyles[1]]}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={[styles.input,itemStyles[0]]}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={[styles.input,itemStyles[1]]}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
     
      <CheckBox
        title="ACEITAR TERMOS DE CONDIÇÕES"
        checked={aceitarTermos}
        onPress={handleCheckboxToggle}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxLabel}
        checkedColor="#2163D3"
        value={setAceitarTermos}
      />
      <TouchableOpacity style={styles.button}   onPress={() => {
            handleCad();
          }}   >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Cor de fundo branca
    alignItems: 'center',
    justifyContent: 'center',

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width:280,
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
    width:150,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

picker: {
  height: 40,
  width:280,
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
},
});

export default PessoaJuridicaCadastro;
