// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBS8uqnQzTuZL_TUdqBy2UcCGH4vQuAIcs",
  authDomain: "tryhackuta.firebaseapp.com",
  projectId: "tryhackuta",
  storageBucket: "tryhackuta.appspot.com",
  messagingSenderId: "816330180383",
  appId: "1:816330180383:web:4ea32210633fd11853522a",
  measurementId: "G-X3406VYDRV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, auth, analytics, serverTimestamp };