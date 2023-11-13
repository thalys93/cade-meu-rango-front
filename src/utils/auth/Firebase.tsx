// Import the functions you need from the SDKs you need


import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREAPI,
    authDomain: import.meta.env.VITE_FIREDOMAIN ,
    projectId: import.meta.env.VITE_FIREID,
    storageBucket: import.meta.env.VITE_FIREBUCKET,
    messagingSenderId: import.meta.env.VITE_FIRESENDER,
    appId: import.meta.env.VITE_FIREAPPID,
    measurementId: import.meta.env.VITE_FIREMEASUREMENT
};

// Initialize Firebase
// eslint-disable-next-line react-refresh/only-export-components
export const app = firebase.initializeApp(firebaseConfig);

// console.log(app) //opção para debugar

// Initialize Firebase Authentication and get a reference to the service
export const Fauth = getAuth(app);

// Initialize Firebase Storage and get a reference to the service
export const FireStoreDatabase = getFirestore(app)

// Para o Futuro (depois de criado o login e a autenticação com o usuário)
export const FireStorage = getStorage(app)