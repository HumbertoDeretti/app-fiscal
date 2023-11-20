// DateTimeService.js

const obterDataHoraAtual = () => {
    const agora = new Date();
    const data = agora.toISOString().split('T')[0];
    const hora = agora.toTimeString().split(' ')[0];
  
    return { data, hora };
  };
  
  export default obterDataHoraAtual;
  