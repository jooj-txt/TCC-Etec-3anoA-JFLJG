import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const PessoaFisicaCadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [genero, setGenero] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [dataNascimento, setDataNascimento] = useState('');

  const handleDateChange = (text) => {
    const numericText = text.replace(/\D/g, ''); // Removendo caracteres não numéricos
    let formattedDate = '';

    if (numericText.length <= 2) {
      formattedDate = numericText;
    } else if (numericText.length <= 4) {
      formattedDate = `${numericText.slice(0, 2)}/${numericText.slice(2)}`;
    } else if (numericText.length <= 8) {
      formattedDate = `${numericText.slice(0, 2)}/${numericText.slice(2, 4)}/${numericText.slice(4, 8)}`;
    }

    setDataNascimento(formattedDate);
  };

  const handleCadastro = () => {
    // Lógica de cadastro aqui
    console.log('Dados de cadastro:', nome, cpf, email, celular, genero, dataNascimento, cep, endereco, cidade, estado);
  };

  const itemStyles = [
    {borderColor: '#2163D3' },
    {borderColor: '#FFAE2E' }
  ];


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
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
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

      <Picker
        style={[styles.picker, itemStyles[0]]}
        selectedValue={genero}
        onValueChange={(itemValue) => setGenero(itemValue)}
      >
        <Picker.Item  style={[styles.picker, itemStyles[0]]} label="Selecione o gênero" value="" />
        <Picker.Item  style={[styles.picker, itemStyles[0]]} label="Masculino" value="masculino" />
        <Picker.Item  style={[styles.picker, itemStyles[0]]} label="Feminino" value="feminino" />
        <Picker.Item  style={[styles.picker, itemStyles[0]]} label="Outro" value="outro" />
      </Picker>

      <TextInput
        style={[styles.input,itemStyles[1]]}
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChangeText={handleDateChange}
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
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={aceitarTermos}
          onValueChange={setAceitarTermos}
        />
        <Text style={styles.checkboxLabel}>Aceitar termos e condições</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

picker: {
  height: 40,
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
},
});

export default PessoaFisicaCadastro;