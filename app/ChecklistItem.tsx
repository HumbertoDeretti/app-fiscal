// ChecklistItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../src/style';
import { Pergunta, perguntasVistoria } from './perguntas';
type Props = {
  pergunta: Pergunta;
  onSelect: (perguntaId: string, opcaoId: string) => void;
};

const ChecklistItem: React.FC<Props> = ({ pergunta, onSelect }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{pergunta.texto}</Text>
      {pergunta.tipo === 'opcoes' && pergunta.opcoes?.map(opcao => (
        <TouchableOpacity
          key={opcao.id}
          style={styles.optionButton}
          onPress={() => onSelect(pergunta.id, opcao.id)}
        >
          <Text style={[styles.optionText, opcao.selecionada && styles.selectedOption]}>
            {opcao.texto}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChecklistItem;




