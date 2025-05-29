import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWls5fXoHc4Kgf4cRgMRvYJ4Zvh5RLt3U",
  authDomain: "learning-stall.firebaseapp.com",
  projectId: "learning-stall",
  storageBucket: "learning-stall.firebasestorage.app",
  messagingSenderId: "423362696974",
  appId: "1:423362696974:web:1004f05e0a57a0560de95f",
  measurementId: "G-B83E2QLV1N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);