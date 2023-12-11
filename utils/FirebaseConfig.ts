// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiC8-k1yjQ6H1kl-lBmAQb4wMnX3UnvF8",
  authDomain: "zoom-3c8be.firebaseapp.com",
  projectId: "zoom-3c8be",
  storageBucket: "zoom-3c8be.appspot.com",
  messagingSenderId: "642071782860",
  appId: "1:642071782860:web:b7726f010623c34d4aa969",
  measurementId: "G-68WQ2VHRVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
export const firebaseDB = getFirestore(app)

export const userRef = collection(firebaseDB, 'users')
export const meetingsRef = collection(firebaseDB, 'meetings')