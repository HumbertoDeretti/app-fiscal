// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrWkhJ9q55j3GesWl5IGIx_v2woUe-k-8",
  authDomain: "login-app-fiscal.firebaseapp.com",
  projectId: "login-app-fiscal",
  storageBucket: "login-app-fiscal.appspot.com",
  messagingSenderId: "655574875680",
  appId: "1:655574875680:web:cd665f57b1419429784645",
  measurementId: "G-E0G1B9ZDNN"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase); // Inicializando Firestore
//const analytics = getAnalytics(app);
