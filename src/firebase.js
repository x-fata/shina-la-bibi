import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Ongeza hii

const firebaseConfig = {
    apiKey: "AIzaSyAFbPAJKo42jyEuE-L7zjlf8vyVc0pTisw",
    authDomain: "shina-la-bibi-db.firebaseapp.com",
    projectId: "shina-la-bibi-db",
    storageBucket: "shina-la-bibi-db.firebasestorage.app",
    messagingSenderId: "72157542646",
    appId: "1:72157542646:web:d5b3de4a8e99dd852b54d7",
    measurementId: "G-V8XHK0RC6T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export storage kwa ajili ya picha