// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZJJHS26260CwY8vaE1hbRAbdNzF4Ghec",
  authDomain: "podcast-6dc44.firebaseapp.com",
  projectId: "podcast-6dc44",
  storageBucket: "podcast-6dc44.appspot.com",
  messagingSenderId: "648313921132",
  appId: "1:648313921132:web:5bfa049cf594e0299cc249",
  measurementId: "G-DP9QCVR5LW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);




export {db, storage, auth}