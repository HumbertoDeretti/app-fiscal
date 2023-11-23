// firestoreFunctions.tsx ou o arquivo correspondente

/*import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase.config'; // Certifique-se de que esta é a localização correta

export const salvarRespostasNoFirestore = async (userId: string, respostas: any) => {
  try {
    const TIMEOUT = 10000; // 10 segundos, ajuste conforme necessário

    const salvar = setDoc(doc(firestore, 'respostasUsuarios', userId), { respostas }, { merge: true });
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Tempo limite excedido")), TIMEOUT));

    await Promise.race([salvar, timeout]);
    console.log('Respostas salvas com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    throw error; // Pode ser útil propagar o erro para tratá-lo onde a função é chamada
  }
};*/

// firestoreFunctions.tsx ou o arquivo correspondente

import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebase.config'; // Certifique-se de que esta é a localização correta
import { Resposta } from './interfaceChecklist';

export const salvarRespostasNoFirestore = async (userId: string, respostas: any) => {
  try {
    // Use a função 'collection' para criar uma referência à coleção
    const respostasCollectionRef = collection(firestore, 'respostasUsuarios');

    // Criando um novo documento na coleção
    const novaResposta = { userId, ...respostas };
    await addDoc(respostasCollectionRef, novaResposta);

    console.log('Respostas salvas com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    throw error;
  }
};

// Exemplo de uso:
// Suponha que você tenha um objeto respostas com todas as informações necessárias
const respostas = {
  // ... dados das respostas ...
};


