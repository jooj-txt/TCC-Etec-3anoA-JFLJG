import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Cor de fundo branca
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom:-30
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#2163D3', // Cor dos botões azul
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
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
