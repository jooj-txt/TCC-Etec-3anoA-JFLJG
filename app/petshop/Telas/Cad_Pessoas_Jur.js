  import React, { useState,useContext,useEffect   } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
  import { Alert } from 'react-native';
  import {  CheckBox } from 'react-native-elements';  
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  import { auth, firestore } from '../Services/firebaseConfig';
  import { collection, addDoc } from 'firebase/firestore';




  const itemStyles = [
    {borderColor: '#2163D3' },
    {borderColor: '#FFAE2E' }
  ]; // Cor das linhas(apenas decoração)

  
  const PessoaJuridicaCadastro = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [aceitarTermos, setAceitarTermos] = useState(false);
    // Armazenando os dados de cadstro para posteriormente serem guardados no BD
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const validateFields = () => {
      if (
        nome &&
        isValidCNPJ(cnpj) &&
        email &&
        celular &&
        cep &&
        endereco &&
        cidade &&
        estado &&
        senha &&
        senha === confirmarSenha &&
        aceitarTermos
      ) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };
  
    useEffect(() => {
      validateFields();
    }, [nome, cnpj, email, celular, cep, endereco, cidade, estado, senha, confirmarSenha, aceitarTermos]);
  
  
    const isValidCNPJ = (cnpj) => {
      // Expressão regular para validar CNPJ
      const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      return cnpjPattern.test(cnpj);
    };
    
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
      if (!isButtonDisabled) {
        navigation.navigate('Login');

      // Crie o usuário com o email e senha fornecidos
      createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const userJur = userCredential.user;
          const userUid = userJur.uid;
          const userType = "userJur"

          console.log('Usuário criado:', userJur);
    
          // Crie um objeto com os dados do usuário
          const userData = {
            nome,
            cnpj,
            email,
            celular,
            cep,
            endereco,
            cidade,
            estado,
            userUid,
            userType
          };
    
          // Obtenha uma referência à coleção "PessoasJuridicas"
          const pessoasJuridicasRef = collection(firestore, 'PessoasJuridicas');
    
          // Adicione os dados do usuário a um novo documento
          addDoc(pessoasJuridicasRef, userData)
            .then((docRef) => {
              console.log('Dados do usuário adicionados ao Firestore com ID do documento: ', docRef.id);          
               
            })
            
        })
        
  
      } else {

        alert(
          'Preenche aeeeeeee',"fuandjsafbsbfls")
      }
      
    };
    



    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cadastro Pessoa Jurídica</Text>
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
          onPress={() => {
            handleCheckboxToggle();
          }}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
          checkedColor="#2163D3"
          value={setAceitarTermos}
        />
        <TouchableOpacity style={styles.button}  onPress={() =>  {{} handleCad();
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
