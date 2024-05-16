// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkBpDhNOD2l2ALG6gav5U-loyG6q8fhEk",
  authDomain: "image-stora.firebaseapp.com",
  projectId: "image-stora",
  storageBucket: "image-stora.appspot.com",
  messagingSenderId: "557174977924",
  appId: "1:557174977924:web:b7317e71afbf253695d9d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
