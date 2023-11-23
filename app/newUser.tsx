import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from '../src/firebase.config.js'; // Certifique-se de que firestore é a referência correta para o seu Firestore
import { useRouter } from "expo-router";
import { styles } from "../src/style.js";

export default function NewUser() {
    const [userMail, setUserMail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userRePass, setUserRePass] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");

    const router = useRouter();

    function newUser() {
        if (userMail === "" || userPass === "" || userRePass === "" || firstName === "" || lastName === "" || age === "") {
            Alert.alert("Todos os campos devem ser preenchidos");
            return;
        }
        if (userPass !== userRePass) {
            Alert.alert("A senha e a confirmação não são iguais");
            return;
        }

        createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((UserCredential) => {
                const user = UserCredential.user;

                // Atualiza o perfil com nome completo
                updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                }).then(() => {
                    // Adiciona detalhes adicionais ao Firestore
                    const userRef = collection(firestore, "users"); // ajuste 'users' para sua coleção
                    addDoc(userRef, {
                        uid: user.uid,
                        firstName,
                        lastName,
                        age,
                        email: userMail
                    });

                    Alert.alert("Usuário Criado", `O usuário ${userMail} foi criado. Faça o Login.`);
                    router.replace("/");
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert("Erro ao Criar Usuário", errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Novo Usuário</Text>
            {/* Inputs para nome, sobrenome e idade */}
            <TextInput
                style={styles.formInput}
                placeholder="Nome"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Sobrenome"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Idade"
                keyboardType="number-pad"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.formInput}
                placeholder="E-mail de usuário"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={userMail}
                onChangeText={setUserMail}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Senha do usuário"
                autoCapitalize="none"
                secureTextEntry
                value={userPass}
                onChangeText={setUserPass}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Repita a senha"
                autoCapitalize="none"
                secureTextEntry
                value={userRePass}
                onChangeText={setUserRePass}
            />
            <Pressable
                style={styles.formButton}
                onPress={newUser}
            >
                <Text style={styles.textButton}>
                    Cadastrar
                </Text>
            </Pressable>
        </View>
    );
}
