import styles from "./Notifications.module.css";

export default function Notifications({
    toDayTasks,
    close,
    handleToggleOrganizer,
}) {
    const toDayDate = new Date().toLocaleDateString("bg-BG");
    return (
        <div
            onClick={() => {
                close();
                handleToggleOrganizer();
            }}
            className={styles.notification}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>
                    Имаш {toDayTasks.length} задач
                    {toDayTasks.length > 1 ? "и" : "а"} за днес {toDayDate}
                </h2>
                <button className={styles.closeBtn} onClick={close}>
                    X
                </button>
            </div>

            {toDayTasks.map((task) => (
                <div key={task.id}>
                    <h3
                        className={
                            task.status === "Done"
                                ? styles.done
                                : task.important
                                ? styles.important
                                : ""
                        }
                    >
                        {task.title}{" "}
                        {task.status === "Done"
                            ? " ЗАВЪРШЕНА"
                            : task.important
                            ? "ВАЖНО!!!"
                            : ""}
                    </h3>
                    <p
                        className={
                            task.status === "Done"
                                ? styles.done
                                : task.important
                                ? styles.important
                                : ""
                        }
                    >
                        {task.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
