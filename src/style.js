import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'orange',
      margin: 10,
    },
    formInput: {
      borderColor: 'orange',
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 20,
      width: '80%',
      padding: 10,
      margin: 10,
    },
    formButton: {
      backgroundColor: 'orange',
      width: '80%',
      margin: 10,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center'
    },
    textButton: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    subContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    subButton: {
      padding: 10,
    },
    subTextButton: {
      color: 'orange',
    },

    //Telas Internas
    internalContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },

    topBar: {
      flexDirection: 'row-reverse',
      padding: 10,
      backgroundColor: 'orange',
      width: '100%'
    },

    topBarButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '700'
    },

    cheListContainer: {
      flex: 1,
      backgroundColor: '#fefefe',
    },

    checkListTitle: {
      color: '#333',
      size: 16,
      fontWeight: '700',
      textTransform: 'uppercase',
      marginVertical: 10,
      marginLeft: 12,
    },

    // Estilos adicionados para a ChecklistScreen
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // A cor de fundo pode ser ajustada para corresponder à imagem
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centraliza o título
  },
  itemContainer: {
    padding: 10,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 5,
    // Não defina flexDirection: 'row' aqui
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    // Estilo para o texto da pergunta
  },
  optionButton: {
    // Estilos para os botões das opções de resposta
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
  },
  optionText: {
    fontSize: 16,
    // Estilo para o texto da opção de resposta
  },
  selectedOption: {
    // Estilo para a opção de resposta selecionada
    fontWeight: '700',
    backgroundColor: '#e2e2e2',
  },
  optionsContainer: {
    marginTop: 10,
  },
  
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 4,
    // Adicione estilos adicionais conforme necessário
  },
  
  selectedOption: {
    backgroundColor: '#e4e4e4', // Um fundo diferente para indicar seleção, se desejado
    // Adicione estilos adicionais para uma opção selecionada
  },

  
  })