// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBy8euSpkzPDDPpE7DEdYoflYOkRUYeUu4",
  authDomain: "connectify-c3ab5.firebaseapp.com",
  //   databaseURL: 'https://project-id.firebaseio.com',
  projectId: "connectify-c3ab5",
  storageBucket: "connectify-c3ab5.firebasestorage.app",
  messagingSenderId: "354751853778",
  appId: "1:354751853778:web:376b5e1e4bfdd79dbc690b",
  //   measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
