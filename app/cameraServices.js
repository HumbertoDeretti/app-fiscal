// CameraService.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const abrirCamera = async () => {
  const permCamera = await ImagePicker.requestCameraPermissionsAsync();

  if (permCamera.status !== 'granted') {
    Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para continuar');
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    return result.uri;
  }

  return null;
};

export const uploadFoto = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storage = getStorage();
  const filename = `vistoria-${new Date().getTime()}.jpg`;
  const fotoRef = ref(storage, `fotos/${filename}`);

  console.log('Iniciando upload do Blob');
  try {
    await uploadBytes(fotoRef, blob);
    const downloadURL = await getDownloadURL(fotoRef);
    console.log('Foto carregada com sucesso, URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload do Blob:', error);
    throw error;
  }
};



