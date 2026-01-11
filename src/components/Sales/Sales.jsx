import styles from "../Sales/Sales.module.css";

export default function Sales({ user, toggleSales }) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.nav}>
                    <button>Добави клиент</button>
                    <button>Продажба</button>
                    <h1>Последни Продажби</h1>
                </div>

                <table className={styles.tableDocs}>
                    <thead>
                        <tr>
                            <th>Дата </th>
                            <th>Фирма</th>
                            <th>Oбект</th>
                            <th>Стока</th>
                            <th>Обща стойност</th>
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
