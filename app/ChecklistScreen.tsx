// ChecklistScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import obterGeolocalizacao from './GeolocationService';
import obterDataHoraAtual from './DateTimeService';
import obterNomeFiscal from './UserDataService';
import { Pergunta, perguntasVistoria } from './perguntas'; // Certifique-se de importar a interface Pergunta
import { styles } from '../src/style'; // Atualize com o caminho correto para o seu arquivo de estilos

const ChecklistScreen = () => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>(perguntasVistoria);
  const [dataHora, setDataHora] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  useEffect(() => {
    const nomeFiscal = obterNomeFiscal();
    const { data, hora } = obterDataHoraAtual();
    setDataHora(`Data: ${data}, Hora: ${hora}`);

    obterGeolocalizacao(({ latitude, longitude }) => {
      setLocalizacao(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // Aqui você pode atualizar o estado das perguntas com as informações coletadas
    });
  }, []);

  const renderItem = ({ item }: { item: Pergunta }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.texto}</Text>
      {/* Renderização das opções, se houver */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Restante da tela */}
      <FlatList
        data={perguntas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChecklistScreen;

