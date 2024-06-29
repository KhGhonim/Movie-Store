// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxp00uEc7s6tmkRf3_xjldFeK_wozNIRc",
  authDomain: "movie-store-73e50.firebaseapp.com",
  projectId: "movie-store-73e50",
  storageBucket: "movie-store-73e50.appspot.com",
  messagingSenderId: "635100173273",
  appId: "1:635100173273:web:87c151707c4925d16a7fc8",
  
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);


