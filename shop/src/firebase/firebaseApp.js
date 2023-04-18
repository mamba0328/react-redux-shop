import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA-DDidRQoq5OEv0adKxg0B2h4XaUCe7Ok",
    authDomain: "react-shop-5796d.firebaseapp.com",
    projectId: "react-shop-5796d",
    storageBucket: "react-shop-5796d.appspot.com",
    messagingSenderId: "1021243427699",
    appId: "1:1021243427699:web:859e19ac54db4060ee9306",
    measurementId: "G-71CDWX4SPB",
    databaseURL: 'https://react-shop-5796d-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
