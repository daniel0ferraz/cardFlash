// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4sqE8j0F4IyaC-NJePcoDxaGivv5o6Jc",
  authDomain: "flashcards-68b11.firebaseapp.com",
  projectId: "flashcards-68b11",
  storageBucket: "flashcards-68b11.appspot.com",
  messagingSenderId: "29209781830",
  appId: "1:29209781830:web:c99e7d3749122b260e4c47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
