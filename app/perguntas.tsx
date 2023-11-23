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
  respostaAutomatica?: string;
  geolocalizacao?: string; 
  respostaTexto?: string;
  geolocalizacaoSelecao?: string;
  timestampSelecao?: string;
  urlFoto?: string;
}

export const perguntasVistoria: Pergunta[] = [
    /*{ 
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
    },*/
    { 
      id: 'estrutura', 
      texto: 'A estrutura está em boas condições?',
      tipo: 'opcoes',
      opcoes: [
        { id: 'estrutura-1', texto: 'Sim', selecionada: false },
        { id: 'estrutura-2', texto: 'Não', selecionada: false }
      ] 
    },
    { 
      id: 'tipo-estrutura', 
      texto: 'Estrutura',
      tipo: 'opcoes',
      opcoes: [
        { id: 'tipo-estrutura-1', texto: 'Alvenaria', selecionada: false },
        { id: 'tipo-estrutura-2', texto: 'Madeira', selecionada: false },
        { id: 'tipo-estrutura-3', texto: 'Metálica', selecionada: false },
        { id: 'tipo-estrutura-4', texto: 'Pré-Fabricado', selecionada: false },
      ] 
    },
    { 
      id: 'cobertura', 
      texto: 'Cobertura',
      tipo: 'opcoes',
      opcoes: [
        { id: 'cobertura-1', texto: 'Telha de Barro', selecionada: false },
        { id: 'cobertura-2', texto: 'Laje', selecionada: false },
        { id: 'cobertura-3', texto: 'Fibrocimento', selecionada: false },
        { id: 'cobertura-4', texto: 'Zinco', selecionada: false },
      ] 
    },
    
];

  