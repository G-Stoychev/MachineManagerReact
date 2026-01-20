import styles from "../Sales/Sales.module.css";

import { useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Sales({ user }) {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const salesRef = ref(database, "sales");
        const unsubscribe = onValue(
            salesRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setSalesData(Object.values(data));
                } else {
                    setSalesData([]);
                }
            },
            {
                onlyOnce: false,
            },
        );

        return () => unsubscribe();
    }, []);

    console.log(salesData);
    return (
        <>
            <div className={styles.wrapper}>
                <h1>Последни Продажби</h1>

                <table className={styles.tableDocs}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    className={styles.inputSales}
                                    type="date"
                                ></input>
                            </th>
                            <th>
                                <input
                                    className={styles.inputSales}
                                    placeholder="Клиент"
                                ></input>
                            </th>
                            <th>
                                <input
                                    className={styles.inputSales}
                                    placeholder="Обект"
                                ></input>
                            </th>
                            <th>
                                <input
                                    className={styles.inputSales}
                                    placeholder="Телефон"
                                ></input>
                            </th>
                        </tr>
                        <tr>
                            <th>Дата </th>
                            <th>Номер продажба </th>
                            <th>Клиент</th>
                            <th>Oбект</th>
                            <th>Телефон</th>
                            <th>Сума</th>
                            <th>Действие</th>
                        </tr>
                    </thead>

                    <tbody>
                        {salesData.map((sale) => (
                            <tr>
                                <td>{sale.createdAt}</td>
                                <td>{sale.firmEik}</td>
                                <td>{sale.firmName}</td>
                                <td>{sale.firmObject}</td>
                                <td>{sale.firmPhone}</td>
                                <td>€ {sale.totalSum.toFixed(2)}</td>
                                <td>
                                    <button
                                        className={styles.tableBtn}
                                        onClick={() => {
                                            const isConfirmed = confirm(
                                                "Сигурен ли си, че искаш да редактираш стока?",
                                            );

                                            if (!isConfirmed) return;

                                            console.log("Редактирам продажба");
                                        }}
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                    <button
                                        className={styles.tableBtn}
                                        onClick={() => {
                                            const isConfirmed = confirm(
                                                "Сигурен ли си, че искаш да редактираш стока?",
                                            );

                                            if (!isConfirmed) return;

                                            console.log("Редактирам продажба");
                                        }}
                                    >
                                        <i className="fa-solid fa-print"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
