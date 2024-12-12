/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzSstU9WZo3h1MTOnSpSrvfkwoHE4zkYo",
  authDomain: "it33-system.firebaseapp.com",
  projectId: "it33-system",
  storageBucket: "it33-system.firebasestorage.app",
  messagingSenderId: "969902558297",
  appId: "1:969902558297:web:fb273f76efa24838823548",
  measurementId: "G-3XXE679W96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db, addDoc, collection};

