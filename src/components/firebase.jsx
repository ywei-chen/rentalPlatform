import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJzG23PuZ1JYTWkl1AZrKmq2k0qcFBJmg",
  authDomain: "site-facility-e6bb7.firebaseapp.com",
  projectId: "site-facility-e6bb7",
  storageBucket: "site-facility-e6bb7.firebasestorage.app",
  messagingSenderId: "58850898640",
  appId: "1:58850898640:web:c910d1271ddfc77b0824d5"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export { firebase , db };