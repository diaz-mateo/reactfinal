// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5l9_UFw-rqolyQ9gh-wR0YiPY-y3Z9Pg",
  authDomain: "my-ecommerce-app-34801.firebaseapp.com",
  projectId: "my-ecommerce-app-34801",
  storageBucket: "my-ecommerce-app-34801.appspot.com",
  messagingSenderId: "607058304138",
  appId: "1:607058304138:web:25705ed4bb0c0c7bb3e173",
  measurementId: "G-PXQE7JYW1V",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta la instancia para usarla en toda la app
export { db };