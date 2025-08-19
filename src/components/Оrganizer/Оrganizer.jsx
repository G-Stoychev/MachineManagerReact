import { useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";

import ASide from "../aSide/aSide";
import TaskModal from "./TaskModal";
import TaskInformation from "./TaskInformation";

import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";
import { useTasks } from "../../store/TaskContext.jsx";
import { addTaskData, changeTaskData } from "../../services/dataService.js";

export default function Organizer({
    selectectTaskIndex,
    setSelectectTaskIndex,
}) {
    const [openTask, setOpenTask] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { aSideIsOpen } = useInput();
    const taskDialog = useRef();

    // const [listOfTask, setListOfTask] = useState([]);
    const { listOfTask, setListOfTask } = useTasks();
    const [selectectTask, setSelectedTask] = useState();
    const [taskDone, setTaskDone] = useState(false);

    const handleOpenAddModal = () => {
        setSelectedTask(undefined);
        taskDialog.current.open();
    };

    const closeTaskInformation = () => {
        setOpenTask(false);
        setSelectedTask(undefined);
    };

    const selectedTaskFromAside = (index) => {
        const task = listOfTask[index];
        setSelectedTask(task);
    };

    const handleTaskInformation = (title, id, index) => {
        setSelectedIndex(index);
        selectedTaskFromAside(index);
        setOpenTask(true);
        setSelectectTaskIndex(undefined);
    };

    const handleAddNewTask = async (task) => {
        try {
            const savedTask = await addTaskData(task);
            // setListOfTask([...listOfTask, savedTask]);
            setSelectedTask(undefined);
        } catch (error) {
            console.error("Грешка при запис на ремонт:", error);
        }
    };

    const handleOnUpdate = (task) => {
        changeTaskData(task.id, task);
        setSelectedTask(task);
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
        taskDialog.current.open();
    };

    const handleChangeStatus = (task) => {
        if (!task?.id) {
            console.error("Task ID is missing!");
            return;
        }

        changeTaskData(task.id, { status: "Done" });
        setSelectedTask({ ...task, status: "Done" });
        setTaskDone(true);
    };

    useEffect(() => {
        if (selectectTaskIndex !== undefined) {
            setSelectedIndex(selectectTaskIndex);
            const task = listOfTask[selectectTaskIndex];
            setSelectedTask(task);
            setOpenTask(true);
        }
    }, [selectectTaskIndex]);

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
                    handleChangeStatus={handleChangeStatus}
                    taskDone={taskDone}
                />
            )}
        </div>
    );
}
