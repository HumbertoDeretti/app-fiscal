import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import obterGeolocalizacao from './GeolocationService';
import obterDataHoraAtual from './DateTimeService';
import obterNomeFiscal from './UserDataService';
import { perguntasVistoria } from './perguntas';
import ChecklistItem from './ChecklistItem';
import { styles } from '../src/style';
import { salvarRespostasNoFirestore } from '../src/firestoreFuncions';
import { auth } from '../src/firebase.config';
import * as ImagePicker from 'expo-image-picker';
import { abrirCamera, uploadFoto } from './cameraServices';

const ChecklistScreen = () => {
  const [perguntas, setPerguntas] = useState(perguntasVistoria);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fotoUri, setFotoUri] = useState(null);
  const router = useRouter();

  console.log("Perguntas Vistoria:", perguntasVistoria);
  console.log("Perguntas Estado:", perguntas);

  const handleCaptureImage = async () => {
    const uri = await abrirCamera();
    if (uri) {
      console.log('Foto capturada com URI:', uri); // Log quando a foto é capturada
      try {
        const fotoUrl = await uploadFoto(uri);
        console.log('Foto URL:', fotoUrl); // Log quando a foto é carregada
        setFotoUri(fotoUrl);
      } catch (error) {
        console.error('Erro ao fazer upload da foto:', error);
      }
    } else {
      console.log('Captura da foto cancelada');
    }
  };


  const handleSelectOption = async (perguntaId, opcaoId) => {
    try {
      const localizacao = await obterGeolocalizacao();
      const timestamp = new Date().toISOString();

      const perguntasAtualizadas = perguntas.map(pergunta => {
        if (pergunta.id === perguntaId) {
          return {
            ...pergunta,
            timestampSelecao: timestamp,
            geolocalizacaoSelecao: `Latitude: ${localizacao.latitude}, Longitude: ${localizacao.longitude}`,
            opcoes: pergunta.opcoes.map(opcao => ({
              ...opcao,
              selecionada: opcao.id === opcaoId
            }))
          };
        }
        return pergunta;
      });

      setPerguntas(perguntasAtualizadas);
    } catch (error) {
      console.error('Erro ao obter geolocalização:', error);
    }
  };

  const obterUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  const salvarRespostas = async () => {
    setError('');
    setLoading(true);
  
    const userId = obterUserId();
    if (!userId) {
      setError('Usuário não está autenticado');
      setLoading(false);
      return;
    }

    let fotoUrl = null;
    if (fotoUri) {
      try {
        fotoUrl = await uploadFoto(fotoUri);
      } catch (error) {
        console.error('Erro ao fazer upload da foto:', error);
        setError('Erro ao fazer upload da foto.');
        setLoading(false);
        return;
      }
    }
  
    try {
      const localizacaoFinal = await obterGeolocalizacao();
      const timestampFinal = new Date().toISOString();

      const respostasFormatadas = perguntas.map(pergunta => {
        let resposta = '';
        if (pergunta.tipo === 'opcoes') {
          resposta = pergunta.opcoes.find(opcao => opcao.selecionada).texto;
        }
  
        return {
          perguntaId: pergunta.id,
          resposta,
          geolocalizacaoSelecao: pergunta.geolocalizacaoSelecao,
          timestampSelecao: pergunta.timestampSelecao,
          geolocalizacaoFinal: `Latitude: ${localizacaoFinal.latitude}, Longitude: ${localizacaoFinal.longitude}`,
          timestampFinal
        };
      });
  
      // Aqui você pode decidir como incluir a URL da foto nas suas respostas
      // Por exemplo, adicionar como um campo separado no objeto a ser salvo
      const dadosVistoria = {
        respostas: respostasFormatadas,
        fotoUrl, // Inclui a URL da foto
        timestamp: timestampFinal,
      };
  
      await salvarRespostasNoFirestore(userId, dadosVistoria);
      Alert.alert('Sucesso', 'Respostas e foto salvas com sucesso');
      setLoading(false);
      router.replace('/MainScreen');
    } catch (error) {
      console.error('Erro ao salvar respostas ou fazer upload da foto:', error);
      setError('Erro ao salvar respostas ou fazer upload da foto. Por favor, tente novamente.');
      setLoading(false);
    }
  };
  
  const renderItem = ({ item }) => {
    return <ChecklistItem pergunta={item} onSelect={handleSelectOption} />;
  };

  return (
    <View style={styles.container}>
       <FlatList
        data={perguntas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Pressable style={styles.formButton} onPress={salvarRespostas} disabled={loading}>
        <Text style={styles.textButton}>
          {loading ? 'Salvando...' : 'Salvar Respostas'}
        </Text>
      </Pressable>
      <Pressable style={styles.formButton} onPress={handleCaptureImage}>
        <Text style={styles.textButton}>Tirar Foto</Text>
      </Pressable>
      {/* Exibição da imagem capturada */}
      {fotoUri && <Image source={{ uri: fotoUri }} style={{ width: 200, height: 200 }} />}
      {/* Mensagem de erro, se houver */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default ChecklistScreen;
