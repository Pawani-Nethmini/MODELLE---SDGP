// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmX6UdImjJ9PCGsbuz_A2q7gSiMC1EfOk",
  authDomain: "modelle-auth-b9c3e.firebaseapp.com",
  projectId: "modelle-auth-b9c3e",
  storageBucket: "modelle-auth-b9c3e.firebasestorage.app",
  messagingSenderId: "1078489404372",
  appId: "1:1078489404372:web:6a583b31c62390ac697c41",
  measurementId: "G-XT1LSRJ8LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const _analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };