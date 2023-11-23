import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { auth } from '../src/firebase.config.js';
import {Vistoria} from '../src/interfaceChecklist.js'
import { format } from 'date-fns';

const MainScreen: React.FC = () => {
  const [vistorias, setVistorias] = useState<Vistoria[]>([]); // Agora o estado tem um tipo definido
  const router = useRouter();
  const db = getFirestore();
  const userName = auth.currentUser?.displayName || 'Usuário'; // Substitua por como você obtém o nome do usuário

  useEffect(() => {
    const fetchVistorias = async () => {
      try {
        const q = query(
          collection(db, "respostasUsuarios"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const vistoriasData: Vistoria[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            geolocalizacao: data.geolocalizacao,
            perguntaID: data.perguntaID,
            resposta: data.resposta,
            timestamp: data.timestamp,
            userId: data.userId,
            userName: data.userName,
          };
        });
        setVistorias(vistoriasData);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Erro', error.message);
        } else {
          // Se o objeto de erro não é uma instância de Error, pode ser outra coisa lançada
          Alert.alert('Erro', 'Ocorreu um erro desconhecido ao tentar buscar as vistorias.');
        }
      }
    };

    fetchVistorias();
  }, []);




  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Deslogado', 'Você foi deslogado com sucesso.');
      router.replace('/login'); // Substitua pela rota de login
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro desconhecido ao tentar deslogar.');
      }
    }
  };

  // Função para adicionar vistoria
  const handleAddInspection = () => {
    router.push('/ChecklistScreen'); // Substitua pela rota correta da ChecklistScreen
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "dd/MM/yyyy");
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com o nome do usuário e ícone de logout */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{`Olá ${userName}`}</Text>
      </View>

      <FlatList
        data={vistorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>Vistoria realizada em: ({formatDate(item.timestamp)})</Text>
            <Text style={styles.itemText}>Usuário: {item.userName}</Text>
    </View>
  )}
/>

      {/* Botão de ação flutuante (FAB) para adicionar vistorias */}
      <TouchableOpacity style={styles.fab} onPress={handleAddInspection}>
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginRight: 20,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  itemText: {
    fontSize: 18,
  },

  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#01A9DB', // Ou qualquer outra cor desejada
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  // ...restante dos estilos
});

export default MainScreen;