// tarefas.ts

export interface OpcaoResposta {
    id: string;
    texto: string;
    selecionada: boolean;
  }
  
  export interface Pergunta {
    id: string;
    texto: string;
    tipo: 'texto' | 'opcoes' | 'automatica';
    opcoes?: OpcaoResposta[];
    respostaAutomatica?: string; // Usado para perguntas de preenchimento automático
  }
  
  export const perguntasVistoria: Pergunta[] = [
    { 
      id: 'nomeFiscal', 
      texto: 'Nome do Fiscal', 
      tipo: 'automatica'
    },
    { 
      id: 'data', 
      texto: 'Data', 
      tipo: 'automatica'
    },
    { 
      id: 'geolocalizacao', 
      texto: 'Geolocalização', 
      tipo: 'automatica'
    },
    { 
      id: 'estrutura', 
      texto: 'A estrutura está em boas condições?',
      tipo: 'opcoes',
      opcoes: [
        { id: 'estrutura-1', texto: 'Sim', selecionada: false },
        { id: 'estrutura-2', texto: 'Não', selecionada: false }
      ] 
    },
    // Adicione outras perguntas conforme necessário
    // ...
  ];
  