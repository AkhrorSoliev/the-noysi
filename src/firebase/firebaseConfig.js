import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-CHZaX2JQMnNhZ6cG_y461xKMGlvteT0",
  authDomain: "task-manager-d5f23.firebaseapp.com",
  projectId: "task-manager-d5f23",
  storageBucket: "task-manager-d5f23.firebasestorage.app",
  messagingSenderId: "783624832366",
  appId: "1:783624832366:web:23c76ee0b4fb011790ad7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
const auth = getAuth(app);

// google provider for auth
const GoogleProvider = new GoogleAuthProvider();

// db
const db = getFirestore(app);

export { GoogleProvider, auth, db };
