import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, FlatList, StyleSheet, Image, SafeAreaView, Switch, Pressable } from 'react-native';
import {  Provider , Card, Text, Searchbar } from 'react-native-paper';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Add, PosAdd, ConfigPerfil, Favoritos, AnimalDesc, HomeScreenJur, Login, Inicio, PessoaFisicaCadastro, PessoaJuridicaCadastro} from './rotas';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import logo from '../imgs/logo_Inicio.png';
import { getFirestore, collection, doc, getDocs,setDoc, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const db = getFirestore();


export default function HomeScreen({ route }) {

  return (
    <NavigationContainer independent={true}>
    <DrawerNavigator/>
  </NavigationContainer>

  );
}

      function Tabs({ navigation, route }) {

      return (
      <Tab.Navigator screenOptions={{
      tabBarLabelStyle: {
      fontWeight: 'bold', // Estilo da fonte das guias
      },
      tabBarActiveTintColor: '#FFAE2E', // Cor do texto da guia ativa
      tabBarInactiveTintColor: '#143D9B', // Cor do texto da guia inativa
      tabBarStyle: {
      backgroundColor: '#2163D3',
      // Cor de fundo da barra de guias
      },
      }}>
      <Tab.Screen 
      name='Casa' 
      component={Casa} 
      options={{ 
        headerShown: false, 
        tabBarLabel: '', 
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="home" size={size} color={color} style={{ marginTop:8,}} />
        ),
      }} 
      />
      <Tab.Screen 
      name='Favoritos' 
      component={Favoritos} 
      options={{ 
        headerShown: false, 
        tabBarLabel: '', 
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="heart" size={size} color={color} style={{ marginTop:8,}} />
        ),
      }} 
      />
      <Tab.Screen 
      name='Configurações' 
      component={ConfigPerfil}  
      options={{ 
        headerShown: false, 
        tabBarLabel: '', 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} style={{ marginTop:8,}} />
        ),
      }}  

      />

</Tab.Navigator>
);
}
function CustomDrawerContent({ navigation, ...props }) {
  const [isDarkMode, setIsDarkMode] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Usuário autenticado:', user);
        const pessoasFisicasRef = collection(db, 'PessoasFisicas');
        const q = query(pessoasFisicasRef, where('userUid', '==', user.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDocSnapshot = querySnapshot.docs[0]; // Assume que há apenas um documento correspondente
            console.log('Dados do usuário:', userDocSnapshot.data());
            const userData = userDocSnapshot.data();
            setUserName(userData.nome);
            setUserEmail(userData.email);
            setUserId(userData.userUid);

          } else {
            console.log('Documento do usuário não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar informações do usuário no Firestore', error);
        }
      } else {
        console.log('Usuário não está autenticado');
        setUserName('');
        setUserEmail('');
      }
    });
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.containerDrawer}>
        <View  style={styles.userArea}>
          <Image
            source={logo}
            style={styles.user}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.nome}>{userName}</Text>
            <Text style={styles.email}>{userEmail}</Text>
          </View>
        </View>
      </View>
      <DrawerItem 
        label="Adicionar animal"
        onPress={() => navigation.navigate('AdicionarAnimal')} 
        labelStyle={styles.drawerItem} />
      <DrawerItem 
        label="Sair" 
        onPress={() => handleLogout(navigation)} // Utiliza a função handleLogout
        labelStyle={styles.drawerItem} />
      <View style={styles.darkModeSwitch}>
        <Text style={styles.darkModeLabel}>Modo Escuro</Text>
        <Switch value={isDarkMode} />
      </View>
    </DrawerContentScrollView>
  );
}

// Adiciona a função handleLogout
const handleLogout = async (navigation) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    navigation.navigate('Login'); 
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
function DrawerNavigator() {
  const [searchText, setSearchText] = useState('');
  const [animais, setAnimais] = useState([]);

  const fetchAnimais = async () => {
    const animaisCollection = collection(db, 'Animais');
    const animaisQuery = await getDocs(animaisCollection);

    const animaisData = [];
    animaisQuery.forEach((doc) => {
      const animal = doc.data();
      animaisData.push(animal);
    });

    setAnimais(animaisData);
  };
  

  const searchAnimals = () => {
    if (searchText === '') {
      return animais; // Retorna todos os animais se a barra de pesquisa estiver vazia
    } else {
      return animais.filter(animal =>
        animal.name.toLowerCase().includes(searchText.toLowerCase()) ||
        animal.raça.toLowerCase().includes(searchText.toLowerCase()) ||
        animal.estado.toLowerCase().includes(searchText.toLowerCase()) ||
        animal.cidade.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  };
return (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={Tabs} options={{
      title: null,
      headerStyle: {
        backgroundColor: "#2163D3",
      },
      headerRight: () => (
        <Searchbar
          placeholder="Pesquisar"
          onChangeText={setSearchText}
          value={searchText}
          style={styles.searchInput}
        />
      ),
    }} />
    <Drawer.Screen name='AdicionarAnimal' component={Add} options={{
      title: null,
      headerStyle: {
        backgroundColor: "#2163D3",
      },
    }} /> 
     <Drawer.Screen name='PosAdd' component={PosAdd} options={{
      title: null,
      headerStyle: {
        backgroundColor: "#2163D3",
      },
    }} /> 
    <Drawer.Screen name='AnimalDesc' component={AnimalDesc} options={{
      title: null,
      headerStyle: {
        backgroundColor: "#2163D3",
      },
    }} /> 
      <Drawer.Screen name='HomeJur' component={HomeScreenJur} options={{
      title: null,
      headerShown: false

    }} />
      <Drawer.Screen name='Login' component={Login} options={{
      title: null,
      headerShown: false

    }} />
      <Drawer.Screen name='Inicio' component={Inicio} options={{
      title: null,
      headerShown: false

    }} /> 
         <Drawer.Screen name='ConfigPerfil' component={ConfigPerfil} options={{
      title: null,
      headerShown: false

    }} /> 
            <Drawer.Screen name='PessoaJuridicaCadastro' component={PessoaJuridicaCadastro} options={{
      title: null,
      headerShown: false

    }} /> 
            <Drawer.Screen name='PessoaFisicaCadastro' component={PessoaFisicaCadastro} options={{
      title: null,
      headerShown: false

    }} /> 
  </Drawer.Navigator>
);
}

const Casa = ({ navigation, route }) => {
  const [selectedFilter, setSelectedFilter] = useState('TODOS');
  const [animais, setAnimais] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const pessoasFisicasRef = collection(db, 'PessoasFisicas');
        const q = query(pessoasFisicasRef, where('userUid', '==', user.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDocSnapshot = querySnapshot.docs[0]; // Assume que há apenas um documento correspondente

            const userData = userDocSnapshot.data();
          
            setUserId(userData.userUid);

          } 
        } catch (error) {
          console.error('Erro ao buscar informações do usuário no Firestore', error);
        }
      } 
    });
  }, []);

  const handleAdicionarFavorito = async (animal) => {
    try {
      // Adiciona o animal aos favoritos do usuário
      const updatedFavoritos = [...favoritos, { ...animal, userId: userId }];
  
      // Atualiza o estado local
      setFavoritos(updatedFavoritos);
  
      // Obtém uma referência para o documento do usuário no Firestore
      const userDocRef = doc(db, 'PessoasFisicas', userId);
  
      // Atualiza o campo de favoritos no documento do usuário
      await setDoc(userDocRef, { favoritos: updatedFavoritos }, { merge: true });
  
      console.log('Animal favoritado com sucesso!');
    } catch (error) {
      console.error('Erro ao favoritar o animal:', error);
    }
  };
  
  
  const fetchAnimais = async () => {
    const animaisCollection = collection(db, 'Animais');
    const animaisQuery = await getDocs(animaisCollection);

    const animaisData = [];
    animaisQuery.forEach((doc) => {
      const animal = doc.data();
      animaisData.push(animal);
    });

    setAnimais(animaisData);
  };

  useEffect(() => {
    fetchAnimais(); // Chama a função para buscar os dados quando o componente é montado
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Executa essa função sempre que a tela é focada
      fetchAnimais(); // Chama a função para buscar os dados novamente
    }, [])
  );
  

  const filterAnimals = () => {
    if (selectedFilter === 'TODOS') {
      return animais;
    } else {
      return animais.filter((animal) => animal.tipo.toLowerCase() === selectedFilter.toLowerCase());
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View style={styles.animalList}>
          <View style={styles.filterContainer}>
            <Pressable
              onPress={() => setSelectedFilter('TODOS')}
              style={[
                styles.filterCard,
                selectedFilter === 'TODOS' ? { backgroundColor: '#2163D3' } : null,
              ]}
            >
              <Text
                style={[
                  styles.textFilter,
                  selectedFilter === 'TODOS' ? { color: '#FFAE2E' } : null,
                ]}
              >
                TODOS
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter('Gato')}
              style={[
                styles.filterCard,
                selectedFilter === 'Gato' ? { backgroundColor: '#2163D3' } : null,
              ]}
            >
              <FontAwesome5 name="cat" size={24} color={selectedFilter === 'Gato' ? '#FFAE2E' : 'black'} />
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter('Cachorro')}
              style={[
                styles.filterCard,
                selectedFilter === 'Cachorro' ? { backgroundColor: '#2163D3' } : null,
              ]}
            >
              <FontAwesome5 name="dog" size={24} color={selectedFilter === 'Cachorro' ? '#FFAE2E' : 'black'} />
            </Pressable>
          </View>
          <Text  style={styles.AnimalsText}>ANIMAIS DISPOIVEIS PARA ADOÇÃO:</Text>
          <FlatList
            data={filterAnimals()}
            numColumns={2}
              keyExtractor={(item) => item.ID}
            renderItem={({ item }) => (
              <Pressable
              style={[styles.animalCard]}
               onPress={() => navigation.navigate('AnimalDesc', { animalId: item.ID })}
              >
             <AnimalCard
              animal={item}
              onAdicionarFavorito={() => handleAdicionarFavorito(item)}
              />

               
    </Pressable>
  )}
/>
        </View>
      </ScrollView>
    </Provider>
  );
}

const AnimalCard = ({ animal, onAdicionarFavorito  }) => (
  <Card style={{backgroundColor:"#2163D3", borderRadius:10}}>
    <Card.Cover style={[styles.animalImage]} source={{uri: animal.images[0]}} />
    <Card.Content style={{backgroundColor:"#2163D3", borderRadius:10}}>
      <Text variant="titleLarge" style={styles.animalText}>{animal.name}</Text>
      <Text variant="bodyMedium" style={styles.animalText}>{animal.raça}</Text>
      <Text variant="bodyMedium" style={styles.animalText}>{animal.sexo}</Text>
      <Text variant="bodyMedium" style={[styles.animalText, styles.animalLocal]}>{animal.cidade}-{animal.estado}</Text>
      {animal.userType === "userJur" && (
        <Text variant="bodyMedium" style={[styles.animalText2, styles.animalLocal]}>DIVULGADO POR UMA ONG :)</Text>
      )}

      <Pressable onPress={onAdicionarFavorito} style={{ alignSelf: "flex-start" }}>
        <FontAwesome5 name="heart" size={16} color="black" />
      </Pressable>
    </Card.Content>
  </Card>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  searchInput: {
    marginRight: '20%',
    borderRadius: 20,
    fontSize: 16,
    color: 'black',
    width: "80%",
    height: "85%",
    paddingLeft: 10, 
    paddingRight: 10, 
    borderColor: '#FFAE2E', 
    borderWidth: 2, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
  },
  animalCard: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#FFAE2E',
    
  },
  animalText: {
    color: 'black',
  },
  animalText2: {
    color: '#FFAE2E',
  },
  animalLocal: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  animalImage: {
    marginBottom: 20,
  },

  //DRAWER
  containerDrawer:{
    flex:1,
    backgroundColor: 'lightblue',
  },
  userArea:{
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    borderColor: 'blue',
    borderBottomWidth: 4,
    borderRadius: 2,
  },
  user:{
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 40,
  },
  nome:{
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'navy'
  },
  email:{
    fontSize: 15,
    marginBottom: 8,
    color: 'darkblue', 
  },
  drawerItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  //FILTER
  filterContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center', 
  },

  filterCard:{
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:1,
    margin: 5,
  },
  textFilter:{
    fontSize: 12,
    fontFamily: "sans-serif-light",
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  darkModeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  darkModeLabel: {
    fontSize: 16,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnimalsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color:'#000'
  },
});
