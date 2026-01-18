import styles from "../Sales/Sales.module.css";

import { useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

// const [salesData, setSalesData] = useState([]);

// useEffect(() => {
//     const database = getDatabase();
//     const salesRef = ref(database, "sales");
//     const unsubscribe = onValue(
//         salesRef,
//         (snapshot) => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 setSalesData(Object.values(data));
//             } else {
//                 setSalesData([]);
//             }
//         },
//         {
//             onlyOnce: false,
//         },
//     );

//     return () => unsubscribe();
// }, []);

export default function Sales({ user, toggleSales }) {
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
                        <tr>
                            <td>{new Date().toLocaleDateString("bg-BG")}</td>
                            <td>1000102</td>
                            <td>Областна</td>
                            <td>Областна</td>
                            <td>0921321321321</td>
                            <td>122е</td>
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
                    </tbody>
                </table>
            </div>
        </>
    );
}
