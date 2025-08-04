import styles from "./Notifications.module.css";

import { useTasks } from "../../store/TaskContext";

export default function Notifications({ toDayTasks }) {
    return (
        <div className={styles.notification}>
            <p>
                Имаш {toDayTasks.length} задача
                {toDayTasks.length > 1 ? "и" : ""} за днес.
            </p>
        </div>
    );
}
