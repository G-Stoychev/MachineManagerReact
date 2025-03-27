import { useState, useEffect, lazy } from "react";
import { auth } from "../src/firebase.js";
import {
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import { changeUserInfo, changeCarsData } from "./services/dataService.js";
import CarsData from "./components/Menu/CarsData.jsx";

const Container = lazy(() => import("./components/Container/Container.jsx"));
const AuthForm = lazy(() => import("./components/LoginPortal/AuthForm.jsx"));

function App() {
    const [isValid, setIsValid] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "GUEST",
        theme: "Пролет",
    });
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [openCars, setOpenCars] = useState(false);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const carsRef = ref(database, "cars");
        const unsubscribe = onValue(carsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setCars(Object.values(data));
            }
        });

        return () => unsubscribe();
    }, []);

    const labels = {
        insurance: "ЗАСТРАХОВКА",
        vignette: "ВИНЕТКА",
        inspection: "ПРЕГЛЕД",
    };

    const checkExpiringDates = () => {
        const today = new Date();
        let expiringList = [];

        cars.forEach((car) => {
            ["insurance", "vignette", "inspection"].forEach((field) => {
                if (car[field]) {
                    const expirationDate = new Date(car[field]);
                    const timeDiff = expirationDate - today;
                    const daysLeft = Math.ceil(
                        timeDiff / (1000 * 60 * 60 * 24)
                    );

                    if (daysLeft === 10 || (daysLeft < 10 && daysLeft >= 0)) {
                        expiringList.push(
                            `🚗 ${car.plate}: ${labels[field]} изтича след ${daysLeft} дни (${car[field]})`
                        );
                    }
                }
            });
        });

        if (expiringList.length > 0) {
            alert(
                "⚠️ Внимание! Следните срокове изтичат скоро:\n\n" +
                    expiringList.join("\n")
            );
        }
    };

    useEffect(() => {
        if (cars.length > 0) {
            checkExpiringDates();
        }
    }, [cars.length]);

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
        setOpenCars(!openCars);
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
                    {openCars && (
                        <CarsData toggle={handleToogleCars} cars={cars} />
                    )}
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
