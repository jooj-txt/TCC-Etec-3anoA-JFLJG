import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { getFirestore, doc, updateDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



const ConfigPerfil = ({ route }) => {
  const db = getFirestore();
  const auth = getAuth();

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [generoFeminino, setGeneroFeminino] = useState(false);
  const [generoMasculino, setGeneroMasculino] = useState(false);
  const [criancasSim, setCriancasSim] = useState(false);
  const [criancasNao, setCriancasNao] = useState(false);
  const [moradiaCasa, setMoradiaCasa] = useState(false);
  const [moradiaApartamento, setMoradiaApartamento] = useState(false);
  const [espacoPequeno, setEspacoPequeno] = useState(false);
  const [espacoMedio, setEspacoMedio] = useState(false);
  const [espacoGrande, setEspacoGrande] = useState(false);
  const [possuiPetsSim, setPossuiPetsSim] = useState(false);
  const [possuiPetsNao, setPossuiPetsNao] = useState(false);
  const [horas4ouMenos, setHoras4ouMenos] = useState(false);
  const [horas4a8, setHoras4a8] = useState(false);
  const [horas8a12, setHoras8a12] = useState(false);
  const [horas12ouMais, setHoras12ouMais] = useState(false);
  const [ocupacao, setOcupacao] = useState('');
  const [numPessoas, setNumPessoas] = useState('');
  const [instagram, setInstagram] = useState('');
  const [conheceuRedes, setConheceuRedes] = useState({
    instagram: false,
    facebook: false,
    twitter: false,
    linkedin: false,
  });
  const [selectedButtons, setSelectedButtons] = useState({
    genero: null,
    criancas: null,
    moradia: null,
    espaco: null,
    possuiPets: null,
    horas: null,
  });

  const [userId, setUserId] = useState('');
 useEffect(() => {

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log('Usuário autenticado:', user);
      const pessoasFisicasRef = collection(db, 'PessoasFisicas');
      const q = query(pessoasFisicasRef, where('userUid', '==', user.uid));
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDocSnapshot = querySnapshot.docs[0];
          const userData = userDocSnapshot.data();
          setUserId(userDocSnapshot.id); // Defina o ID do documento

          // Restante do seu código...
        } else {
          console.log('Documento do usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário no Firestore', error);
      }
    }
  });
  
  const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, 'PessoasFisicas',userId );
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setNome(userData.nome);
          setDataNascimento(userData.dataNascimento);
          setEmail(userData.email);
          setCelular(userData.celular);

                } else {
          console.warn('Documento do usuário não encontrado no Firestore');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário no Firestore', error);
      }
    };

    fetchUserProfile();
  }, [userId, db]);

  const handleSaveProfile = async () => {
    try {
      // Use o ID do documento recuperado da consulta
      const userDocRef = doc(db, 'PessoasFisicas', userId);
      const profileData = {};

    // Adicione as categorias selecionadas ao objeto profileData
    if (selectedButtons.genero) {
      profileData.genero = selectedButtons.genero;
    }

    if (selectedButtons.criancas) {
      profileData.criancas = selectedButtons.criancas;
    }

    if (selectedButtons.moradia) {
      profileData.moradia = selectedButtons.moradia;
    }

    if (selectedButtons.espaco) {
      profileData.espaco = selectedButtons.espaco;
    }

    if (selectedButtons.possuiPets) {
      profileData.possuiPets = selectedButtons.possuiPets;
    }

    if (selectedButtons.horas) {
      profileData.horas = selectedButtons.horas;
    }
    if (selectedButtons.conheceuRedes) {
      profileData.conheceuRedes = selectedButtons.conheceuRedes;
    }

    // Adicione outras categorias conforme necessário

    // Adicione campos adicionais
    profileData.nome = nome;
    profileData.dataNascimento = dataNascimento;
    profileData.email = email;
    profileData.celular = celular;
    profileData.ocupacao = ocupacao;
    profileData.instagram = instagram;
    profileData.numPessoas = numPessoas;
  
    




      await updateDoc(userDocRef, profileData);
      Alert.alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil do usuário', error);
      Alert.alert('Erro ao atualizar o perfil. Tente novamente mais tarde.');
    }
  };
  

  const handleGeneroChange = (femininoSelected, masculinoSelected) => {
    setGeneroFeminino(femininoSelected);
    setGeneroMasculino(masculinoSelected);
  };

  const handleCriancasChange = (simSelected, naoSelected) => {
    setCriancasSim(simSelected);
    setCriancasNao(naoSelected);
  };

  const handleMoradiaChange = (casaSelected, apartamentoSelected) => {
    setMoradiaCasa(casaSelected);
    setMoradiaApartamento(apartamentoSelected);
  };

  const handleEspacoChange = (pequenoSelected, medioSelected, grandeSelected) => {
    setEspacoPequeno(pequenoSelected);
    setEspacoMedio(medioSelected);
    setEspacoGrande(grandeSelected);
  };

  const handlePossuiPetsChange = (simSelected, naoSelected) => {
    setPossuiPetsSim(simSelected);
    setPossuiPetsNao(naoSelected);
  };

  const handleHorasChange = (menos4Selected, a8Selected, a12Selected, mais12Selected) => {
    setHoras4ouMenos(menos4Selected);
    setHoras4a8(a8Selected);
    setHoras8a12(a12Selected);
    setHoras12ouMais(mais12Selected);
  };

  const handleConheceuRedesChange = (rede) => {
    setConheceuRedes((prevState) => ({ ...prevState, [rede]: !prevState[rede] }));
  };

  const handleButtonPress = (category, buttonName) => {
    setSelectedButtons((prevButtons) => ({
      ...prevButtons,
      [category]: buttonName,
    }));

    switch (category){
      case 'feminino':
        handleGeneroChange(true, false);
        break;
      case 'masculino':
        handleGeneroChange(false, true);
        break;
      case 'criancasSim':
        handleCriancasChange(true, false);
        break;
      case 'criancasNao':
        handleCriancasChange(false, true);
        break;
      case 'moradiaCasa':
        handleMoradiaChange(true, false);
        break;
      case 'moradiaApartamento':
        handleMoradiaChange(false, true);
        break;
      case 'espacoPequeno':
        handleEspacoChange(true, false, false);
        break;
      case 'espacoMedio':
        handleEspacoChange(false, true, false);
        break;
      case 'espacoGrande':
        handleEspacoChange(false, false, true);
        break;
      case 'possuiPetsSim':
        handlePossuiPetsChange(true, false);
        break;
      case 'possuiPetsNao':
        handlePossuiPetsChange(false, true);
        break;
      case 'horas4ouMenos':
        handleHorasChange(true, false, false, false);
        break;
      case 'horas4a8':
        handleHorasChange(false, true, false, false);
        break;
      case 'horas8a12':
        handleHorasChange(false, false, true, false);
        break;
      case 'horas12ouMais':
        handleHorasChange(false, false, false, true);
        break;
      // Adicione outros casos conforme necessário
      default:
        break;
    }
  };

  const renderButton = (category, buttonName, buttonText) => (
    <TouchableOpacity
      key={buttonName}
    
      onPress={() => {
        handleButtonPress(category, buttonName);

      }}   
      style={[
        styles.button,
        {
          backgroundColor:
            selectedButtons[category] === buttonName ? 'white' : '#2163D3',
          marginBottom: 10,
        },
      ]}
    >
      <Text style={{ color: selectedButtons[category] === buttonName ? '#FFAE2E' : 'white' }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
  

  return (
    <ScrollView>
      <View>
        <Text>Nome</Text>
        <TextInput value={nome} onChangeText={setNome} />

        <Text>Data de Nascimento</Text>
        <TextInput value={dataNascimento} onChangeText={setDataNascimento} />

        <Text>Email</Text>
        <TextInput value={email} onChangeText={setEmail} />

                <Text>Gênero</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderButton('genero', 'feminino', 'Feminino')}
          {renderButton('genero', 'masculino', 'Masculino')}
        </View>

        <Text>Há crianças em sua residência?</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderButton('criancas', 'Sim', 'Sim')}
          {renderButton('criancas', 'Nao', 'Não')}
        </View>

        <Text>Você mora em:</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderButton('moradia', 'Casa', 'Casa')}
          {renderButton('moradia', 'Apartamento', 'Apartamento')}
        </View>

        <Text>Espaço de sua residência:</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderButton('espaco', 'Pequeno', 'Pequeno')}
          {renderButton('espaco', 'Medio', 'Médio')}
          {renderButton('espaco', 'Grande', 'Grande')}
        </View>

        <Text>Você possui outros pets?</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderButton('possuiPets', 'Sim', 'Sim')}
          {renderButton('possuiPets', 'Nao', 'Não')}
        </View>

        <Text>Quantas horas passa em casa por dia?</Text>
        <View style={{ flexDirection: 'row' }}>
          {renderButton('horas', '4ouMenos', '4 ou menos')}
          {renderButton('horas', '4a8', '4 a 8 horas')}
          {renderButton('horas', '8a12', '8 a 12 horas')}
          {renderButton('horas', '12ouMais', '12 ou mais horas')}
        </View>
        <Text>Sua ocupação</Text>
        <TextInput value={ocupacao} onChangeText={setOcupacao} />

        <Text>Número de pessoas que moram com você</Text>
        <TextInput value={numPessoas} onChangeText={setNumPessoas} />

        <Text>Possui Instagram?</Text>
        <TextInput value={instagram} onChangeText={setInstagram} />

        <Text>Whatsapp</Text>
        <TextInput value={celular} onChangeText={setCelular} />

        <Text>Como conheceu a gente?</Text>
        <View>
                {['instagram', 'facebook', 'twitter', 'outros'].map((buttonName) => (
          <TouchableOpacity
            key={buttonName}
            onPress={() => handleButtonPress('conheceuRedes', buttonName)}
            style={[
              styles.button,
              {
                backgroundColor:
                  selectedButtons.conheceuRedes === buttonName ? 'white' : '#2163D3',
                marginBottom: 10,
              },
            ]}
          >
            <Text style={{ color: selectedButtons.conheceuRedes === buttonName ? '#2163D3' : 'white' }}>
              {buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
        </View>

        <TouchableOpacity onPress={handleSaveProfile} style={styles.button}>
          <Text style={{ color: 'white' }}>Salvar Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2163D3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
};

export default ConfigPerfil;
