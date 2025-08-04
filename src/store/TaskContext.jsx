import { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
    const [listOfTask, setListOfTask] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const tasksRef = ref(database, "tasks");
        const unsubscribe = onValue(
            tasksRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const tasksArray = Object.values(data);

                    setListOfTask(tasksArray);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);
    return (
        <TaskContext.Provider value={{ listOfTask, setListOfTask }}>
            {children}
        </TaskContext.Provider>
    );
}
