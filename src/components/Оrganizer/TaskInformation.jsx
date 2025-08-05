import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";

export default function TaskInformation({
    task,
    index,
    deleteTask,
    handleEditTask,
    close,
    handleChangeStatus,
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
                <div className={styles.headerContainer}>
                    <h2
                        className={
                            task.status === "Done"
                                ? styles.done
                                : task.important
                                ? styles.important
                                : ""
                        }
                    >
                        {task.title}
                        {task.status === "Done"
                            ? " ЗАВЪРШЕНА"
                            : task.important
                            ? "ВАЖНО!!!"
                            : ""}
                    </h2>
                    <button
                        className={styles.closeBtn}
                        onClick={() => {
                            {
                                !aSideIsOpen && openASide();
                                close();
                            }
                        }}
                    >
                        x
                    </button>
                </div>
            </div>

            <div>
                <p>Данни за задачата</p>
                <table
                    className={
                        task.status === "Done"
                            ? `${styles.taskTable}  ${styles.done} `
                            : `${styles.taskTable}  `
                    }
                >
                    <thead>
                        <tr>
                            <th>От дата </th>
                            <th>Описание на задачата</th>
                            <th>Дата за изпълнение</th>
                            <th>Статус</th>
                            <th>Важно </th>
                            <th>Бутони за действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={task.title}>
                            <td className={styles.routeColumn}>
                                {task.createDate}
                            </td>
                            <td>{task.description}</td>
                            <td>
                                {new Date(task.deadline).toLocaleDateString(
                                    "bg-BG"
                                )}
                            </td>
                            <td>{task.status}</td>
                            <td>{task.important ? "ВАЖНО!!!" : "Не"}</td>
                            <td className={styles.btnRow} id="btnRow">
                                <div className={styles.divBtnRow}>
                                    {task.status !== "Done" && (
                                        <button
                                            onClick={() => {
                                                handleEditTask(task);
                                            }}
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    )}
                                    {task.status !== "Done" && (
                                        <button
                                            onClick={() => {
                                                handleChangeStatus(task);
                                            }}
                                        >
                                            <i className="fa-solid fa-circle-check"></i>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            deleteTask(task.id);
                                            !aSideIsOpen && openASide();
                                        }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
