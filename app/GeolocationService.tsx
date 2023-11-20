// GeolocationService.js
import Geolocation from '@react-native-community/geolocation';
import { Coordenadas } from '../src/interfaceChecklist';

const obterGeolocalizacao = (callback: (coords: Coordenadas) => void) => {
    Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      callback({ latitude, longitude });
    },
    (error) => {
      console.error(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};

export default obterGeolocalizacao;
