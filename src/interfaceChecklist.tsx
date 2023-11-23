// types.tsx ou interfaces.tsx

export interface Tarefa {
    id: string;
    titulo: string;
    concluida: boolean;
  }


// types.ts ou interfaces.ts
export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export interface Resposta {
  id: string;
  texto: string;
  selecionada: boolean;
  geolocalizacao?: string; // Opcional, se você sempre tiver esse campo, pode remover o '?'
  // Adicione outros campos que são esperados nas respostas
}

interface Ambiente {
  id: string;
  nome: string;
  progresso: string;
  itens: number;
}

export interface Vistoria {
  id: string;
  geolocalizacao: string; 
  perguntaID: string; 
  resposta: string;
  timestamp: string;
  userId: string;
  userName: string;
}

  