// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
import 'firebase/database';





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChD1nzPCYFrc5QqIiy-v6YWQx2kIAEUGY",
  authDomain: "gdsc-7e21b.firebaseapp.com",
  projectId: "gdsc-7e21b",
  storageBucket: "gdsc-7e21b.appspot.com", 
  messagingSenderId: "1057485287904",
  appId: "1:1057485287904:web:6c59b6b0dcdd4967ddfb85",
  measurementId: "G-BZN7G22K0R"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider();




