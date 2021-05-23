import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBQ4mrkMfb4Zjihi1V0r0xmov-lI94bJOs",
  authDomain: "clone-cc6a3.firebaseapp.com",
  projectId: "clone-cc6a3",
  storageBucket: "clone-cc6a3.appspot.com",
  messagingSenderId: "1022328622600",
  appId: "1:1022328622600:web:e69d72146f7a12b8d84bbd",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
