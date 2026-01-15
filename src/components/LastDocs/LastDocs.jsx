import { useEffect, useState } from "react";
import { useMachines } from "../../store/MachineContext.jsx";

import styles from "../LastDocs/LastDocs.module.css";
import { getDatabase, ref, onValue } from "firebase/database";

export default function LastDocs({ activeDocsContent }) {
    const [repairsList, setRepairsList] = useState([]);
    const [movements, setMovements] = useState([]);
    const { listOfMachines } = useMachines();

    function extractMachineId(machineId) {
        if (!machineId) return null;

        // ако е обект от Firebase
        if (typeof machineId === "object") {
            return (
                machineId.id ||
                machineId.machineId ||
                Object.values(machineId)[0]
            );
        }

        // ако е нормален string
        return machineId;
    }

    const repairs = repairsList.sort(
        (b, a) => new Date(a.date) - new Date(b.date)
    );
    const repairsWithMachineData = repairs.map((repair) => {
        const machine = listOfMachines.find((m) => m.id === repair.machineId);

        return {
            ...repair,
            machineBrand: machine?.brand || "-",
            machineModel: machine?.model || "-",
            machineSerial: machine?.serialNumber || "-",
        };
    });

    const movementsByDate = movements.sort(
        (b, a) => new Date(a.date) - new Date(b.date)
    );

    const movementsWithMachineData = movementsByDate.map((move) => {
        const mMachineId = extractMachineId(move.machineId);

        const machine = listOfMachines.find((m) => m.id === mMachineId);

        return {
            ...move,
            machineBrand: machine?.brand || "-",
            machineModel: machine?.model || "-",
            machineSerial: machine?.serialNumber || "-",
        };
    });

    useEffect(() => {
        const database = getDatabase();
        const repairsRef = ref(database, "repairs");
        const unsubscribe = onValue(
            repairsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const repairsArray = Object.values(data);

                    setRepairsList(repairsArray);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const database = getDatabase();
        const movementsRef = ref(database, "movements");
        const unsubscribe = onValue(
            movementsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const movementsArray = Object.values(data);

                    setMovements(movementsArray);
                }
            },
            {
                onlyOnce: true,
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className={styles.wrapper}>
            {activeDocsContent === "repairs" && (
                <>
                    <h1 className={styles.docshs}>
                        Последни документи ремонти
                    </h1>
                    <table className={styles.tableDocs}>
                        <thead>
                            <tr>
                                <th>Дата на ремонт</th>
                                <th>Извършил ремонта</th>
                                <th>Машина Марка</th>
                                <th>Машина модел</th>
                                <th>Машина сериен номер</th>
                                <th>Профилактика</th>
                                <th>Допълнителна информация</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repairsWithMachineData &&
                            repairsWithMachineData.length > 0 ? (
                                repairsWithMachineData.map((repair, index) => (
                                    <tr key={index}>
                                        <td>
                                            {new Date(
                                                repair.date
                                            ).toLocaleDateString("bg-BG")}
                                        </td>
                                        <td>{repair.person}</td>
                                        <td>{repair.machineBrand}</td>
                                        <td>{repair.machineModel}</td>
                                        <td>{repair.machineSerial}</td>
                                        <td style={{ textAlign: "center" }}>
                                            {repair.prevention
                                                ? `✔️ ${repair.profDate}`
                                                : "❌"}
                                        </td>
                                        <td>{repair.parts}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center",
                                            padding: "8px",
                                        }}
                                    >
                                        Няма налични ремонти
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

            {activeDocsContent === "movements" && (
                <>
                    <h1 className={styles.docshs}>
                        Последни документи движения
                    </h1>
                    <table className={styles.tableDocs}>
                        <thead>
                            <tr>
                                <th>Дата на движение</th>
                                <th>Фирма</th>
                                <th>Oбект</th>
                                <th>Име</th>
                                <th>Maшина марка</th>
                                <th>Машина модел</th>
                                <th>Машина сериен номер</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movementsWithMachineData &&
                            movementsWithMachineData.length > 0 ? (
                                movementsWithMachineData.map((move, index) => (
                                    <tr key={index}>
                                        <td>
                                            {new Date(
                                                move.date
                                            ).toLocaleDateString("bg-BG")}
                                        </td>
                                        <td>{move.partner}</td>
                                        <td>{move.object}</td>
                                        <td>{move.contact}</td>
                                        <td>{move.machineBrand}</td>
                                        <td>{move.machineModel}</td>
                                        <td>{move.machineSerial}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center",
                                            padding: "8px",
                                        }}
                                    >
                                        Няма налични ремонти
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
