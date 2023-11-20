import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "../src/style.js";
import {useState} from "react";
import {useRouter} from "expo-router";
import { auth } from '../src/firebase.config.js';
import { sendPasswordResetEmail } from "firebase/auth";

export default function ReplacePass(){
    const [userMail, setUserMail] = useState('');
    const router = useRouter();

    function replacePass(){
        if(userMail !== '') {
            sendPasswordResetEmail(auth, userMail)
            .then(() => {
                alert("Um e-mail foi enviado para: " + userMail);
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Ops! Algo deu errado." + errorMessage);
                return;
            });
        } else {
            alert("Informe um e-mail válido!");
            return;
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.formTitle}>Redefinição de Senha</Text>
            <TextInput
                style={styles.formInput}
                placeholder="Informe o email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={userMail}    
                onChangeText={setUserMail}
                />
                <Pressable
                    style={styles.formButton}
                    onPress={replacePass}
                >
                    <Text style={styles.textButton}>Enviar</Text>
                </Pressable>
                <View style={styles.subContainer}>
                    <Pressable
                        onPress={() => router.push("/")}
                    >
                        <Text>Voltar</Text>
                    </Pressable>
                </View>
        </View>
    );
}