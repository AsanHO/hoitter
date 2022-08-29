import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4S_8p3bCsDwcUh-keh8rxYXQ7-Vil1Io",
  authDomain: "hoitter.firebaseapp.com",
  projectId: "hoitter",
  storageBucket: "hoitter.appspot.com",
  messagingSenderId: "1046367215865",
  appId: "1:1046367215865:web:f62b2a279f2e74f87ac228",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
