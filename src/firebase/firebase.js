// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoAno2UGZVIB0RBG_Sp7AscLf3TgOeBKs",
  authDomain: "moviesmania-96783.firebaseapp.com",
  projectId: "moviesmania-96783",
  storageBucket: "moviesmania-96783.appspot.com",
  messagingSenderId: "1014932272830",
  appId: "1:1014932272830:web:3137747dd29be55d2cd0ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const userRef = collection(db,"users");
export default app;