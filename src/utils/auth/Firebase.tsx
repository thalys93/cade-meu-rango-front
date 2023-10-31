// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB6OfVrVbR3QuxB1MJp-tj5j5oHDpLpxXw',
    authDomain: 'cade-meu-rango-front.firebaseapp.com',
    projectId: 'cade-meu-rango-front',
    storageBucket: 'cade-meu-rango-front.appspot.com',
    messagingSenderId: '403087065939',
    appId: '1:403087065939:web:def8c6d5aeb6b7f1e457a6',
    measurementId: 'G-M87FQ0FNFV'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const Fauth = getAuth(app);

// Initialize Firebase Storage and get a reference to the service
export const FireStoreDatabase = getFirestore(app)

// Para o Futuro (depois de criado o login e a autenticação com o usuário)
export const FireStorage = getStorage(app)