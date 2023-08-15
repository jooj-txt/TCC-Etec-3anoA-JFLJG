import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Cor de fundo branca
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width:220, 
      height: 220, 
      marginBottom: -10
    },
    logo2: {
      width:220, 
      height: 220, 
      marginBottom: 10
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#2163D3', // Cor dos botões azul
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 8,
      marginHorizontal: 10,
      height:50,
      width:150
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign:'center'
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    line: {
      width:20,
      height: 5,
      backgroundColor: '#2163D3', // Cor dos traços azul
      marginHorizontal: 2,
    },
  });
  
  export default styles;
