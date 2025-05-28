// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // <-- importa Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5l9_UFw-rqolyQ9gh-wR0YiPY-y3Z9Pg",
  authDomain: "my-ecommerce-app-34801.firebaseapp.com",
  projectId: "my-ecommerce-app-34801",
  storageBucket: "my-ecommerce-app-34801.firebasestorage.app",
  messagingSenderId: "607058304138",
  appId: "1:607058304138:web:25705ed4bb0c0c7bb3e173",
  measurementId: "G-PXQE7JYW1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Exporta db para usarlo en otros archivos
export { db };