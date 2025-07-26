import { useRef, useState, useEffect, lazy, useMemo } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import CarsData from "../Menu/CarsData.jsx";
import ErrorModal from "../ErrorModal/ErrorModal.jsx";
import PortalMenu from "./MainPortalMenu.jsx";
const Container = lazy(() => import("../Container/Container.jsx"));

export default function MainPortal({ userInfo, logout }) {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(false);
    const errorModal = useRef();
    const [selectedComponent, setSelectedComponent] = useState("menu");

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

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
            setError(true);
            // alert(
            //     "⚠️ Внимание! Следните срокове изтичат скоро:\n\n" +
            //         expiringList.join("\n")
            // );
        }
        return expiringList.join("\n");
    };
    const expiringMessages = useMemo(() => checkExpiringDates(), [cars]);

    useEffect(() => {
        if (cars.length > 0) {
            checkExpiringDates();
        }
    }, [cars.length]);

    const handleToogleCars = () => {
        setSelectedComponent((prev) => (prev === "cars" ? "menu" : "cars"));
    };

    const handleToogleContainer = () => {
        setSelectedComponent((prev) =>
            prev === "container" ? "menu" : "container"
        );
    };

    return (
        <>
            {error && (
                <ErrorModal
                    title="⚠️ Внимание! Следните срокове изтичат скоро:"
                    text={expiringMessages.split("\n").map((line, index) => (
                        <span key={index}>{line}</span>
                    ))}
                    setError={setError}
                    ref={errorModal}
                />
            )}
            {selectedComponent === "cars" && (
                <CarsData toggle={handleToogleCars} cars={cars} />
            )}

            {selectedComponent === "container" && (
                <Container userInfo={userInfo} close={handleToogleContainer} />
            )}

            {selectedComponent === "menu" && (
                <PortalMenu
                    openCars={handleToogleCars}
                    openContainer={handleToogleContainer}
                    logout={logout}
                />
            )}
        </>
    );
}
