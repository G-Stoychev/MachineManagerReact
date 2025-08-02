import React, { useState } from "react";
import styles from "./CarsData.module.css";

import { changeCarsData } from "../../services/dataService";

const CarsData = ({ toggle, cars, index }) => {
    const [tempPlate, setTempPlate] = useState({});
    const car = cars[index];

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
        <>
            <div className={styles.container}>
                <div>
                    <div className={styles.headerContainer}>
                        <h2 className={styles.title}>
                            Информация за автомобил
                        </h2>
                        <button className={styles.button} onClick={toggle}>
                            X
                        </button>
                    </div>

                    <div className={styles.carsData}>
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
                                <strong>ЗАСТРАХОВКА валидна до:</strong> <br />
                                <input
                                    type="date"
                                    value={car.insurance || ""}
                                    onChange={(e) =>
                                        changeCarsData([
                                            ...cars.slice(0, index),
                                            {
                                                ...car,
                                                insurance: e.target.value,
                                            },
                                            ...cars.slice(index + 1),
                                        ])
                                    }
                                />
                            </p>
                            <p>
                                <strong>ВИНЕТКА валидна до:</strong>
                                <br />
                                <input
                                    type="date"
                                    value={car.vignette || ""}
                                    onChange={(e) =>
                                        changeCarsData([
                                            ...cars.slice(0, index),
                                            {
                                                ...car,
                                                vignette: e.target.value,
                                            },
                                            ...cars.slice(index + 1),
                                        ])
                                    }
                                />
                            </p>
                            <p>
                                <strong>ПРЕГЛЕД валиден до: </strong>
                                <br />
                                <input
                                    type="date"
                                    value={car.inspection || ""}
                                    onChange={(e) =>
                                        changeCarsData([
                                            ...cars.slice(0, index),
                                            {
                                                ...car,
                                                inspection: e.target.value,
                                            },
                                            ...cars.slice(index + 1),
                                        ])
                                    }
                                />
                            </p>
                        </div>
                        <div className={`${styles.carRepairs} ${styles.card}`}>
                            <h2 className={styles.title}>
                                Ремонти по автомобила
                            </h2>
                        </div>
                        <div
                            className={`${styles.carMoveHistory} ${styles.card}`}
                        >
                            <h2 className={styles.title}>Пътна книжка</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarsData;
