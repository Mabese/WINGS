// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Add other Firebase services as needed

// Your Firebase configuration object
const firebaseConfig = {
  
  apiKey: "AIzaSyCM1JsnypdzJqc4lAawXQfye7-S8wUeRYw",
  authDomain: "my-wings-4a47d.firebaseapp.com",
  databaseURL: "https://my-wings-4a47d-default-rtdb.firebaseio.com",
  projectId: "my-wings-4a47d",
  storageBucket: "my-wings-4a47d.firebasestorage.app",
  messagingSenderId: "593549983946",
  appId: "1:593549983946:web:14b00b700865e436d13433"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export initialized instances of Firebase services
export { app, auth, db };
