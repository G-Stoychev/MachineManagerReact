import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";

export default function TaskInformation({ tasks, index }) {
    const task = tasks[index];
    const { aSideIsOpen, openASide } = useInput();

    return (
        <div className={styles.container}>
            <div>
                <button onClick={openASide}>
                    {aSideIsOpen ? (
                        <i className="fa-solid fa-backward"></i>
                    ) : (
                        <i className="fa-solid fa-forward"></i>
                    )}
                </button>

                <h2>{task.title}</h2>
            </div>

            <div>
                <p>Данни за задачата</p>
                <table className={`${styles.taskTable} `}>
                    <thead>
                        <tr>
                            <th>Дата на създаване </th>
                            <th>Описание на задачата</th>
                            <th>Крайна дата за изпълнение</th>
                            <th>Статус</th>
                            <th>Бутони за действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((repair) => (
                            <tr key={new Date()}>
                                <td className={styles.routeColumn}>
                                    {repair.createDate}
                                </td>
                                <td>{repair.description}</td>
                                <td>{repair.deadline}</td>
                                <td>{repair.status}</td>
                                <td className={styles.btnRow}>
                                    <button>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button>
                                        <i className="fa-solid fa-circle-check"></i>
                                    </button>
                                    <button>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
