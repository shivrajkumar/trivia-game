import * as firebase from "firebase";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhLyV7HSb5xdUDewJrwWxCoAchuMl1b9o",
  authDomain: "trivia-bed67.firebaseapp.com",
  databaseURL: "https://trivia-bed67.firebaseio.com",
  projectId: "trivia-bed67",
  storageBucket: "trivia-bed67.appspot.com",
  messagingSenderId: "1055225923879",
  appId: "1:1055225923879:web:92060404d2cf921dc40102",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestoreDatabase = firebase.firestore();
