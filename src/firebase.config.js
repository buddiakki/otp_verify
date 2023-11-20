// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuirLdCyVoZGp8yrALrCRdpVwHn7_JqWI",
  authDomain: "otp-project-8aa78.firebaseapp.com",
  projectId: "otp-project-8aa78",
  storageBucket: "otp-project-8aa78.appspot.com",
  messagingSenderId: "31839879405",
  appId: "1:31839879405:web:98242c52684044e3a40ce4",
  measurementId: "G-3CG136H82N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
