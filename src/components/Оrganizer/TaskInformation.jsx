import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";
import { useEffect, useState } from "react";

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

    const [taskDone, setTaskDone] = useState(false);

    useEffect(() => {
        if (task.status === "Done") {
            setTaskDone(true);
        }
    }, [task]);

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
                            taskDone
                                ? styles.done
                                : task.important
                                ? styles.important
                                : ""
                        }
                    >
                        {task.title}
                        {taskDone
                            ? " ЗАВЪРШЕНА"
                            : task.important
                            ? "ВАЖНО!!!"
                            : ""}
                    </h2>
                    <button className={styles.closeBtn} onClick={close}>
                        x
                    </button>
                </div>
            </div>

            <div>
                <p>Данни за задачата</p>
                <table
                    className={
                        taskDone
                            ? `${styles.taskTable}  ${styles.done} `
                            : `${styles.taskTable}  `
                    }
                >
                    <thead>
                        <tr>
                            <th>Дата на създаване </th>
                            <th>Описание на задачата</th>
                            <th>Крайна дата за изпълнение</th>
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
                            <td>{task.deadline}</td>
                            <td>{task.status}</td>
                            <td>{task.important ? "ВАЖНО!!!" : ""}</td>
                            <td className={styles.btnRow} id="btnRow">
                                <div className={styles.divBtnRow}>
                                    {!taskDone && (
                                        <button
                                            onClick={() => {
                                                handleEditTask(task);
                                            }}
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    )}
                                    {!taskDone && (
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
