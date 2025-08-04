import styles from "./Notifications.module.css";

export default function Notifications({ toDayTasks, close }) {
    return (
        <div className={styles.notification}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>
                    Имаш {toDayTasks.length} задач
                    {toDayTasks.length > 1 ? "и" : "а"} за днес.
                </h2>
                <button className={styles.closeBtn} onClick={close}>
                    X
                </button>
            </div>

            {toDayTasks.map((task) => (
                <div key={task.id}>
                    <h3 className={task.important ? styles.important : ""}>
                        {task.title} {task.important ? "ВАЖНО!!!" : ""}
                    </h3>
                    <p className={task.important ? styles.important : ""}>
                        {task.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
