import React, { useState } from "react";
import styles from "./CarsData.module.css";

import { changeCarsData } from "../../services/dataService";

const CarsData = ({ toggle, cars }) => {
    const [tempPlate, setTempPlate] = useState({});

    const handleTempChange = (index, value) => {
        setTempPlate((prev) => ({ ...prev, [index]: value }));
    };

    const handleSavePlate = (index) => {
        if (
            tempPlate[index] !== undefined &&
            tempPlate[index] !== cars[index].plate
        ) {
            const updatedCars = [...cars];
            updatedCars[index].plate = tempPlate[index];
            changeCarsData(updatedCars);
        }
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
                                value={
                                    tempPlate[index] !== undefined
                                        ? tempPlate[index]
                                        : car.plate
                                }
                                onChange={(e) =>
                                    handleTempChange(index, e.target.value)
                                }
                                onBlur={() => handleSavePlate(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSavePlate(index);
                                        e.target.blur();
                                    }
                                }}
                            />
                        </p>
                        <p>
                            <strong>Валиден до (ЗАСТРАХОВКА):</strong>
                            <input
                                type="date"
                                value={car.insurance || ""}
                                onChange={(e) =>
                                    changeCarsData([
                                        ...cars.slice(0, index),
                                        { ...car, insurance: e.target.value },
                                        ...cars.slice(index + 1),
                                    ])
                                }
                            />
                        </p>
                        <p>
                            <strong>Валиден до (ВИНЕТКА):</strong>
                            <input
                                type="date"
                                value={car.vignette || ""}
                                onChange={(e) =>
                                    changeCarsData([
                                        ...cars.slice(0, index),
                                        { ...car, vignette: e.target.value },
                                        ...cars.slice(index + 1),
                                    ])
                                }
                            />
                        </p>
                        <p>
                            <strong>Валиден до (ПРЕГЛЕД):</strong>
                            <input
                                type="date"
                                value={car.inspection || ""}
                                onChange={(e) =>
                                    changeCarsData([
                                        ...cars.slice(0, index),
                                        { ...car, inspection: e.target.value },
                                        ...cars.slice(index + 1),
                                    ])
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
