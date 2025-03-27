import React, { useState, useEffect } from "react";
import styles from "./CarsData.module.css";

import { changeCarsData } from "../../services/dataService";

const CarsData = ({ toggle, cars }) => {
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
                            <strong>Валиден до (ЗАСТРАХОВКА):</strong>
                            <input
                                type="date"
                                value={car.insurance || ""}
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
                            <strong>Валиден до (ВИНЕТКА):</strong>
                            <input
                                type="date"
                                value={car.vignette || ""}
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
                            <strong>Валиден до (ПРЕГЛЕД):</strong>
                            <input
                                type="date"
                                value={car.inspection || ""}
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
