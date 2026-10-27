import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV7elG24fbloYKNJZsCumT-_BFIyEOt3Q",
  authDomain: "carstore-c7d9e.firebaseapp.com",
  projectId: "carstore-c7d9e",
  storageBucket: "carstore-c7d9e.firebasestorage.app",
  messagingSenderId: "500691255661",
  appId: "1:500691255661:web:3a8a36e1a02008d9265a64",
};

export const isFirebaseConfigured = true;

// Initialize Firebase
let app;
let auth;
let googleProvider;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  }
} catch (error) {
  console.warn("Firebase initialization skipped or failed:", error.message);
}

export {
  app,
  auth,
  googleProvider,
  firebaseConfig,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
};
