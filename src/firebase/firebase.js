// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6K46MEURHvYl5pfj13bxAdUo_NMtokrQ",
  authDomain: "inventoryapp-6ef20.firebaseapp.com",
  projectId: "inventoryapp-6ef20",
  storageBucket: "inventoryapp-6ef20.firebasestorage.app",
  messagingSenderId: "716857499850",
  appId: "1:716857499850:web:6335e428954035f45c5433"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db,  auth };
