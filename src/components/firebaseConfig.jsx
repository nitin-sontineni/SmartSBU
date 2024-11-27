// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBrp11jB23ouVyS9P8DgTTgg6wbqfbHMqk",
    authDomain: "smartsbu-95217.firebaseapp.com",
    projectId: "smartsbu-95217",
    storageBucket: "smartsbu-95217.firebasestorage.app",
    messagingSenderId: "356374619380",
    appId: "1:356374619380:web:27fe411faa71d1f8a96aa1",
    measurementId: "G-P3FZ0PMRMV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
