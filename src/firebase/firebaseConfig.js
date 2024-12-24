import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0HEsoF8HVp04q58alKnvb1hl5RjwZDeU",
  authDomain: "uzum-91bb1.firebaseapp.com",
  projectId: "uzum-91bb1",
  storageBucket: "uzum-91bb1.firebasestorage.app",
  messagingSenderId: "904049799081",
  appId: "1:904049799081:web:d143cb2c427e82f0469eb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
const auth = getAuth();

// google provider for auth
const GoogleProvider = new GoogleAuthProvider();

// db
const db = getDatabase();

export { GoogleProvider, auth, db };
