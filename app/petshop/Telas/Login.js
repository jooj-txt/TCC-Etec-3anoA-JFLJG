import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../imgs/logo_Inicio.png';
import logo2 from '../imgs/logo_Inicio2.png';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const auth = getAuth();
  const db = getFirestore();
  const [userType, setUserType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (auth, async (user) => {
    try {
      setIsLoading(true);
      // Autenticar o usuário com o Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);

      // Verificar se é a primeira vez que o usuário fez login
      const firstTimeLogin = await AsyncStorage.getItem('firstTimeLogin');
      if (!firstTimeLogin) {
        // Se for a primeira vez que o usuário fez login, exiba o modal
 setTimeout(() => {
        setShowModal(true);
      }, 8000);


        // Marque que o usuário já fez login para que o modal não seja exibido novamente
        await AsyncStorage.setItem('firstTimeLogin', 'true');
      }
    } catch (error) {
      setIsLoading(false);
      alert('Usuário ou senha incorretos. Verifique e tente novamente.');

 
        console.error('Erro de autenticação:', error.message);
      
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Usuário autenticado:', user);

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
            setUserType(userData.userType);
          } else if (!querySnapshotJuridicas.empty) {
            const userDocSnapshot = querySnapshotJuridicas.docs[0];
            const userData = userDocSnapshot.data();
            setUserType(userData.userType);
          } else {
            console.log('Documento do usuário não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar informações do usuário no Firestore', error);
        }
      } else {
        console.log('Usuário não está autenticado');
      }
    });

    // Certifique-se de cancelar a assinatura quando o componente for desmontado
    return () => unsubscribe();
  });



  // Quando o usuário efetuar login, redirecione-o com base no userType
  useEffect(() => {
    if (userType === 'user') {
      navigation.navigate('Home');
    } 
    if (userType === 'user' && !AsyncStorage.getItem('firstTimeLogin')) {
      
        setShowModal(true);
    
    }else if (userType === 'userJur') {
      navigation.navigate('HomeJur');
    }
  }, [userType]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ScrollView style={{backgroundColor:'white'}}>
        {isLoading ? ( // Mostra o indicador de carregamento enquanto isLoading é verdadeiro
        <ActivityIndicator size="large" color="#2163D3" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:'60%' }} />
      ) : (
       <View style={styles.container}>
 
 <Modal
   animationType="slide"
   transparent={true}
   visible={showModal}
   onRequestClose={closeModal}
 >
<BlurView style={styles.containerModal} intensity={35} tint="light">

   <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <Text style={styles.modalText}>
         Complete seu perfil para aproveitar ao máximo nosso aplicativo!
       </Text>
       <TouchableOpacity
         style={styles.modalButton}
         onPress={() => {
           closeModal();
           navigation.navigate('ConfigPerfil');
         }}
       >
         <Text style={styles.buttonText}>Completar Perfil</Text>
       </TouchableOpacity>
     </View>
   </View>
   </BlurView>
 </Modal>
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
     navigation.navigate('Inicio');
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
   <View
     style={{
       width: 35,
       height: 3,
       backgroundColor: '#FFAE2E',
       marginHorizontal: '4px',
     }}
   ></View>
   <View
     style={{
       width: 35,
       height: 3,
       backgroundColor: '#2163D3',
       marginHorizontal: '4px',
     }}
   ></View>
   <View
     style={{
       width: 35,
       height: 3,
       backgroundColor: '#FFAE2E',
       marginHorizontal: '4px',
     }}
   ></View>
   <View
     style={{
       width: 35,
       height: 3,
       backgroundColor: '#2163D3',
       marginHorizontal: '4px',
     }}
   ></View>
 </View>
</View>
)}
    </ScrollView>
    );
  }
  
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'25%'
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#2163D3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
  },
  containerModal: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
