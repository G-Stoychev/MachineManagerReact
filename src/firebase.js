import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAca_usbqbokv4FrRdsJxxiAbcDL8-DVm8",
    authDomain: "machinemanager-d29f1.firebaseapp.com",
    databaseURL:
        "https://machinemanager-d29f1-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "machinemanager-d29f1",
    storageBucket: "machinemanager-d29f1.firebasestorage.app",
    messagingSenderId: "1073686995863",
    appId: "1:1073686995863:web:138405655459e40c225ad2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
