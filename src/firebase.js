// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Add other Firebase services as needed

// Your Firebase configuration object
const firebaseConfig = {
  
  apiKey: "AIzaSyC1OBkeIX4w6Lwg63Eh-uUkcW1RZzc872w",
  authDomain: "wings-cafe-inventory-f0d71.firebaseapp.com",
  projectId: "wings-cafe-inventory-f0d71",
  storageBucket: "wings-cafe-inventory-f0d71.firebasestorage.app",
  messagingSenderId: "160420697262",
  appId: "1:160420697262:web:e266a26a5b30997ec3893f",
  measurementId: "G-CCRB856NS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export initialized instances of Firebase services
export { app, auth, db };
