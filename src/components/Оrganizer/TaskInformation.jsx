import styles from "./Organizer.module.css";

export default function TaskInformation({ tasks, index }) {
    const task = tasks[index];
    console.log(tasks, index);

    return (
        <div className={styles.container}>
            <h2>{task.title}</h2>
            <div>
                <p>Данни за задачата</p>
                <table className={`${styles.taskTable} `}>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Серивиз</th>
                            <th>Километри</th>
                            <th>Ремонт</th>
                            <th>Следваща смяна</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((repair) => (
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
        </div>
    );
}
