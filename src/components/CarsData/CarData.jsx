import { useState } from "react";
import styles from "./CarsData.module.css";

import { changeCarsData } from "../../services/dataService";
import { useInput } from "../../store/InputContext";

const CarsData = ({ close, cars, index, carRepairs }) => {
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
            updatedCars[index].title = tempPlate[index];
            changeCarsData(updatedCars);
        }
    };

    const { aSideIsOpen, openASide } = useInput();

    return (
        <>
            <div className={styles.container}>
                <div>
                    <div className={styles.headerContainer}>
                        <h2 className={styles.title}>
                            Информация за автомобил
                        </h2>
                        <button
                            className={styles.closeBtn}
                            onClick={() => {
                                {
                                    !aSideIsOpen && openASide(), close();
                                }
                            }}
                        >
                            x
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
                                            : car.title
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
                            <p>
                                <strong>Километри : 160000</strong>
                            </p>
                        </div>
                        <div className={` ${styles.card}`}>
                            <div
                                className={`${styles.carRepairs}  ${styles.headerContainer}`}
                            >
                                <h4>Ремонти по автомобила</h4>
                                <button className={`${styles.addBtn} `}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <table className={`${styles.carTables} `}>
                                <thead>
                                    <tr className="info-row">
                                        <th>Дата</th>
                                        <th>Серивиз</th>
                                        <th>Километри</th>
                                        <th>Ремонт</th>
                                        <th>Следваща смяна</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carRepairs.map((repair) => (
                                        <tr key={new Date()}>
                                            <td className={styles.routeColumn}>
                                                {repair.repairDate}
                                            </td>
                                            <td>{repair.service}</td>
                                            <td>{repair.kmOnRepair}</td>
                                            <td className={styles.routeColumn}>
                                                {repair.repairInfo}
                                            </td>
                                            <td>{repair.kmOnNextRepair}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={` ${styles.card}`}>
                            <div
                                className={`${styles.carMoveHistory}  ${styles.headerContainer}`}
                            >
                                <h4>Пътна книжка</h4>
                                <button className={`${styles.addBtn} `}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <table className={`${styles.carTables} `}>
                                <thead>
                                    <tr className="info-row">
                                        <th>Дата</th>
                                        <th>Път на движенние</th>
                                        <th>Начални КМ</th>
                                        <th>Крайни КМ</th>
                                        <th>Изминати КМ</th>
                                        <th>Шофьор</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.roadTable}>
                                    <tr>
                                        <td className={styles.routeColumn}>
                                            08.08.2025
                                        </td>
                                        <td className={styles.routeColumn}>
                                            Бургас-Поморие - Сл.Бряг - Влас
                                            -Бургас{" "}
                                        </td>
                                        <td>156000</td>
                                        <td>166000</td>
                                        <td>1000</td>
                                        <td>Георги Стойчев</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarsData;
