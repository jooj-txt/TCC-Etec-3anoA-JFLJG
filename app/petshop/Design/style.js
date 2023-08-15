import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Cor de fundo branca
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '12em',
      height: '10em',
      marginBottom:-19
    },
    logo2: {
      width: '12em',
      height: '12em',
      marginBottom:10
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
      height:'3em',
      width:'10em'
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
