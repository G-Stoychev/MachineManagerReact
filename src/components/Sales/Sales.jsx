import styles from "../Sales/Sales.module.css";

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
                            <th>Клиент</th>
                            <th>Oбект</th>
                            <th>Телефон</th>
                            <th>Сума</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {movementsWithMachineData &&
                        movementsWithMachineData.length > 0 ? (
                            movementsWithMachineData.map((move, index) => (
                                <tr key={index}>
                                    <td>
                                        {new Date(move.date).toLocaleDateString(
                                            "bg-BG"
                                        )}
                                    </td>
                                    <td>{move.partner}</td>
                                    <td>{move.machineBrand}</td>
                                    <td>{move.machineModel}</td>
                                    <td>{move.machineSerial}</td>
                                    <td>{move.contact}</td>
                                    <td>{move.object}</td>
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
                    </tbody> */}
                </table>
            </div>
        </>
    );
}
