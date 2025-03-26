import { useState, useEffect, lazy } from "react";
import { auth } from "../src/firebase.js";
import {
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import { changeUserInfo } from "./services/dataService.js";
import CarsData from "./components/Menu/CarsData.jsx";

const Container = lazy(() => import("./components/Container/Container.jsx"));
const AuthForm = lazy(() => import("./components/LoginPortal/AuthForm.jsx"));

// import Container from "./components/Container/Container.jsx";
// import AuthForm from "./components/LoginPortal/AuthForm.jsx";

function App() {
    const [isValid, setIsValid] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "GUEST",
        theme: "Пролет",
    });
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState(false);

    useEffect(() => {
        const database = getDatabase();
        const userRef = ref(database, "userInfo");
        const unsubscribe = onValue(
            userRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserInfo(data);
                }
            },
            {
                onlyOnce: true,
            }
        );

        return () => unsubscribe();
    }, []);

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
        } catch (error) {
            setError(error.message);
        }
        if (email === "gstoychev20@gmail.com") {
            setUserInfo((prevState) => ({
                ...prevState,
                name: "Freakx",
            }));
            changeUserInfo(userInfo);
        } else if (email === "tyuliev80@gmail.com") {
            setUserInfo((prevState) => ({
                ...prevState,
                name: "Krasi",
            }));
            changeUserInfo(userInfo);
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

    const handleToogleCars = () => {
        setCars(!cars);
    };

    return (
        <>
            {isValid ? (
                <>
                    <Container
                        userInfo={userInfo}
                        logout={handleSignOut}
                        openCars={handleToogleCars}
                    />
                    {cars && <CarsData toggle={handleToogleCars} />}
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
