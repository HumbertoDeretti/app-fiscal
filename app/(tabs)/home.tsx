import {Pressable, Text, View} from "react-native";
import { styles } from '../../src/style.js';
import { auth } from '../../src/firebase.config.js';
import { useRouter } from "expo-router";
import { Auth, signOut } from "firebase/auth";

export default function home() {
  const currentUser = auth.currentUser;
  const router = useRouter();

  if(currentUser != null){
    alert('Logado');
  } else {
    alert("Faça o Login para acessar!")
    router.replace('/');
  }

  function logout(){
    signOut(auth)
      .then(() => {
        alert("Desconectado!");
        router.replace('/');
      })
      .catch((error: { errorMessage: any; }) => {
        const errorMessage = error.errorMessage;
        alert(errorMessage);
      })
  }

  return (
    <View style={styles.internalContainer}>
      <View style={styles.topBar}>
        <Pressable
          onPress={logout}>
          <Text style={styles.topBarButtonText}>Sair</Text>
        </Pressable>
      </View>
      <Text style={styles.formTitle}>Página Inicial</Text>
    </View>
  )
}


