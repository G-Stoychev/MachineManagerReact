import { useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";

import ASide from "../aSide/aSide";
import TaskModal from "./TaskModal";
import TaskInformation from "./TaskInformation";

import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";
import { addTaskData, changeTaskData } from "../../services/dataService.js";

export default function Organizer() {
    const [openTask, setOpenTask] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { aSideIsOpen } = useInput();
    const taskDialog = useRef();

    const [listOfTask, setListOfTask] = useState([]);
    const [selectectTask, setSelectedTask] = useState();

    const handleOpenAddModal = () => taskDialog.current.open();

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

    const openTaskInformation = () => {
        setOpenTask(true);
    };
    const closeTaskInformation = () => {
        setOpenTask(false);
    };

    const selectedTaskFromAside = (index) => {
        const task = listOfTask[index];
        setSelectedTask(task);
    };

    const handleTaskInformation = (title, id, index) => {
        setSelectedIndex(index);
        selectedTaskFromAside(index);
    };

    const handleAddNewTask = async (task) => {
        try {
            const savedTask = await addTaskData(task);
            setListOfTask([...listOfTask, savedTask]);
            setSelectedTask(undefined);
        } catch (error) {
            console.error("Грешка при запис на ремонт:", error);
        }
    };

    const handleOnUpdate = (task) => {
        changeTaskData(task.id, task);
        selectectTask(undefined);
    };

    const deleteTask = async (taskId) => {
        try {
            const database = getDatabase();
            const taskRef = ref(database, `tasks/${taskId}`);
            await remove(taskRef);

            setListOfTask((prev) => prev.filter((task) => task.id !== taskId));
            setSelectedTask(undefined);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        handleOpenAddModal();
    };

    return (
        <div className={`${styles.wrapper} `}>
            <TaskModal
                ref={taskDialog}
                handleAddNewTask={handleAddNewTask}
                handleOnUpdate={handleOnUpdate}
                {...(selectectTask && { selectectTask })}
            />

            {aSideIsOpen && (
                <ASide
                    listItems={listOfTask}
                    title={"Задачи"}
                    open={openTaskInformation}
                    handleAddBtn={handleOpenAddModal}
                    openFunction={handleTaskInformation}
                />
            )}
            {openTask && (
                <TaskInformation
                    task={selectectTask}
                    index={selectedIndex}
                    deleteTask={deleteTask}
                    handleEditTask={handleEditTask}
                    close={closeTaskInformation}
                />
            )}
        </div>
    );
}
