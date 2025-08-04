import styles from "./Notifications.module.css";
import { useEffect, useState } from "react";

function RealTimeClock() {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleString("bg-BG")
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString("bg-BG"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <p>{currentTime}</p>;
}

export default function Notifications({ toDayTasks, close }) {
    const toDayDate = new Date().toLocaleString("bg-BG");
    return (
        <div className={styles.notification}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>
                    Имаш {toDayTasks.length} задач
                    {toDayTasks.length > 1 ? "и" : "а"} за днес
                    <RealTimeClock />.
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
