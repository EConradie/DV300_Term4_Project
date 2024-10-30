import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "terpreter-818c9.firebaseapp.com",
  projectId: "terpreter-818c9",
  storageBucket: "terpreter-818c9.appspot.com",
  messagingSenderId: "1079253722746",
  appId: "1:1079253722746:web:c20400bf14bd9955c53dc3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
