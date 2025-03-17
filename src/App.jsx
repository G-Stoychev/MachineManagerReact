import { useState, useEffect } from "react";
import { auth } from "../src/firebase.js";
import {
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

import Container from "./components/Container/Container.jsx";
import AuthForm from "./components/LoginPortal/AuthForm.jsx";

function App() {
    const [isValid, setIsValid] = useState(false);
    const [userName, setUserName] = useState("guest");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError("");
            if (email === "gstoychev20@gmail.com") {
                setUserName("Freakx");
            } else if (email === "tyuliev80@gmail.com") {
                setUserName("Krasi");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null); // Update user state after sign-out
            setIsValid(false);
            setError(""); // Clear any previous errors
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            setIsValid(true);
        }
    }, [user]);

    return (
        <>
            {isValid ? (
                <>
                    <Container userName={userName} logout={handleSignOut} />
                </>
            ) : (
                <AuthForm
                    error={error}
                    setError={setError}
                    handleSignin={handleSignin}
                />
            )}
        </>
    );
}

export default App;

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
