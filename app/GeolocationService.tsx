// GeolocationService.tsx
import * as Location from 'expo-location';

interface Coordenadas {
  latitude: number;
  longitude: number;
}

const obterGeolocalizacao = async (): Promise<Coordenadas> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de geolocalização não concedida');
  }

  let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  };
};

export default obterGeolocalizacao;
