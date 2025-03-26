import React, { useState, useEffect } from "react";
import styles from "./CarsData.module.css";

import { changeCarsData } from "../../services/dataService";
import { getDatabase, ref, onValue } from "firebase/database";

const CarsData = ({ toggle }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const carsRef = ref(database, "cars");
        const unsubscribe = onValue(
            carsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCars(data);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleChange = (index, field, value) => {
        const updatedCars = [...cars];
        updatedCars[index][field] = value;
        changeCarsData(updatedCars);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Информация за автомобили</h2>
            <div className={styles.grid}>
                {cars.map((car, index) => (
                    <div key={index} className={styles.card}>
                        <p>
                            <strong>Рег. номер:</strong>
                            <input
                                type="text"
                                value={car.plate}
                                onChange={(e) =>
                                    handleChange(index, "plate", e.target.value)
                                }
                            />
                        </p>
                        <p>
                            <strong>Гражданска:</strong>
                            <input
                                type="text"
                                value={car.insurance}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "insurance",
                                        e.target.value
                                    )
                                }
                            />
                        </p>
                        <p>
                            <strong>Винетка:</strong>
                            <input
                                type="text"
                                value={car.vignette}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "vignette",
                                        e.target.value
                                    )
                                }
                            />
                        </p>
                        <p>
                            <strong>Преглед:</strong>
                            <input
                                type="text"
                                value={car.inspection}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "inspection",
                                        e.target.value
                                    )
                                }
                            />
                        </p>
                    </div>
                ))}
            </div>
            <button className={styles.button} onClick={toggle}>
                Затвори
            </button>
        </div>
    );
};

export default CarsData;
