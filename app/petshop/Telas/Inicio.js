import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'; 
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

import styles from '../Design/style.js';
import logo from '../imgs/logo_Inicio.png';
import logo2 from '../imgs/logo_Inicio2.png';

export default function Inicio({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isButtonsVisible, setButtonsVisible] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userType = await determineUserType();
        navigateToAppropriateScreen(userType);
      }
    });
  
    // Certifique-se de cancelar a assinatura quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  const determineUserType = async () => {
    const user = auth.currentUser;
  
    if (user) {
      const pessoasFisicasRef = collection(db, 'PessoasFisicas');
      const pessoasJuridicasRef = collection(db, 'PessoasJuridicas');
  
      const qFisicas = query(pessoasFisicasRef, where('userUid', '==', user.uid));
      const qJuridicas = query(pessoasJuridicasRef, where('userUid', '==', user.uid));
  
      try {
        const querySnapshotFisicas = await getDocs(qFisicas);
        const querySnapshotJuridicas = await getDocs(qJuridicas);
  
        if (!querySnapshotFisicas.empty) {
          const userDocSnapshot = querySnapshotFisicas.docs[0];
          const userData = userDocSnapshot.data();
          return userData.userType || ''; // Retorna o tipo de usuário se existir
        } else if (!querySnapshotJuridicas.empty) {
          const userDocSnapshot = querySnapshotJuridicas.docs[0];
          const userData = userDocSnapshot.data();
          return userData.userType || ''; // Retorna o tipo de usuário se existir
        } else {
          console.log('Documento do usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário no Firestore', error);
      }
    }
  
    return ''; // Retorna uma string vazia se o tipo de usuário não for encontrado
  };

  const navigateToAppropriateScreen = (userType) => {
    if (userType === 'user') {
      navigation.navigate('Home');
    } else if (userType === 'userJur') {
      navigation.navigate('HomeJur');
    }
  };
  

  const handlePessoaFisicaPress = () => {
    setButtonsVisible(false);
    setShowModal(true);
  };

  const handlePessoaJuridicaPress = () => {
    setButtonsVisible(false);
    setShowModal2(true);
  };
  
  return (

    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Image source={logo2} style={styles.logo2} />

         

          {isButtonsVisible && (
         <View style={styles.buttonsContainer}>
         <TouchableOpacity style={styles.button} onPress={handlePessoaJuridicaPress}>
           <Text style={styles.buttonText}>ONG</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.button} onPress={handlePessoaFisicaPress}>
           <Text style={styles.buttonText}>Tutor</Text>
         </TouchableOpacity>

       </View>
      )}
        
      <View style={styles.divider}>
        <View style={{width:35,height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px',  }}></View>
        <View style={{width:35,  height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35,  height: 3,backgroundColor: '#FFAE2E',  marginHorizontal: '4px'}}></View>
        <View style={{width:35,   height: 3, backgroundColor: '#2163D3', marginHorizontal: '4px'}}></View>
        <View style={{width:35, height: 3, backgroundColor: '#FFAE2E', marginHorizontal: '4px'}}></View>
      </View>

{showModal && (
  <Modal animationType="slide" visible={showModal} transparent={true}>
    <BlurView style={styles.containerModal} intensity={35} tint="light">

      <View style={estilo.buttonsContainer}>
        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            navigation.navigate('Login');
            setButtonsVisible(true);
            setShowModal(false);          }}   
        >
          <Text style={estilo.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            navigation.navigate('PessoaFisicaCadastro');
            setButtonsVisible(true);
            setShowModal(false);            
          }}
        >
          <Text style={estilo.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ 
          height:60,
          width:60,
          margin:15,
          marginLeft:50,
          backgroundColor:'#2163D3',
          borderRadius:200,
          alignItems:'center',
          justifyContent:"center"
        }}
          onPress={() => {
            setButtonsVisible(true);
            setShowModal(false);
          }}
        >
          <Ionicons name="ios-arrow-back-sharp" size={45} color="#FFAE2E" />
        </TouchableOpacity>


      </View>
    </BlurView>
  </Modal>
)}
{showModal2 && (
  <Modal animationType="slide" visible={showModal2} transparent={true}>
    <BlurView style={styles.containerModal} intensity={35} tint="light">

      <View style={estilo.buttonsContainer}>
        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            navigation.navigate('Login');
            setButtonsVisible(true);
            setShowModal2(false);          }}   
        >
          <Text style={estilo.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            navigation.navigate('PessoaJuridicaCadastro');
            setButtonsVisible(true);
            setShowModal2(false);            
          }}
        >
          <Text style={estilo.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ 
          height:60,
          width:60,
          margin:15,
          marginLeft:50,
          backgroundColor:'#2163D3',
          borderRadius:200,
          alignItems:'center',
          justifyContent:"center"
        }}
          onPress={() => {
            setButtonsVisible(true);
            setShowModal2(false);
          }}
        >
          <Ionicons name="ios-arrow-back-sharp" size={45} color="#FFAE2E" />
        </TouchableOpacity>


      </View>
    </BlurView>
  </Modal>
  
)}

    </View>
  );
}
const estilo = StyleSheet.create({
  button: {
      backgroundColor: '#2163D3', // Cor dos botões azul
      borderRadius: 10,
      height:50,
      width:120,
      margin:15,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      paddingVertical:12,
      textAlign:'center',
      alignSelf:'center',
      fontWeight:'bold'
      
    },

    buttonsContainer: {
      marginTop:320
    },

    


})