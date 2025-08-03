import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";

export default function TaskInformation({
    task,
    index,
    deleteTask,
    handleEditTask,
    close,
}) {
    if (!task) {
        return (
            <div className={styles.container}>
                <p>Няма избрана задача или всички са изтрити.</p>
            </div>
        );
    }

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
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <h2>{task.title}</h2>
                    <button className={styles.closeBtn} onClick={close}>
                        x
                    </button>
                </div>
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
                        <tr key={task.title}>
                            <td className={styles.routeColumn}>
                                {task.createDate}
                            </td>
                            <td>{task.description}</td>
                            <td>{task.deadline}</td>
                            <td>{task.status}</td>
                            <td className={styles.btnRow}>
                                <button
                                    onClick={() => {
                                        handleEditTask(task);
                                    }}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                                <button>
                                    <i className="fa-solid fa-circle-check"></i>
                                </button>
                                <button
                                    onClick={() => {
                                        deleteTask(task.id);
                                    }}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
