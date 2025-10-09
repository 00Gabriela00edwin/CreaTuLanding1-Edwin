// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8Z_GiLwmu4ub4i67vmW5dFhrWoqJ2jcE",
  authDomain: "ayg-app-vite.firebaseapp.com",
  projectId: "ayg-app-vite",
  storageBucket: "ayg-app-vite.firebasestorage.app",
  messagingSenderId: "64930832067",
  appId: "1:64930832067:web:1487a9515b793291df0c76",
  measurementId: "G-GN52MDF3WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);
