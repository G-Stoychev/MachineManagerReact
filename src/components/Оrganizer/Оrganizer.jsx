import { useState } from "react";

import ASide from "../aSide/aSide";
import TaskInformation from "./TaskInformation";

import styles from "./Organizer.module.css";
import { useInput } from "../../store/InputContext";

export default function Organizer() {
    const [openTask, setOpenTask] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [listOfTask, setListOfTask] = useState([
        {
            title: "Ремонт Дюни",
            createDate: "08.08.2025",
            deadline: "28.08.2025",
            description: "Смяна накладки и  ремонт климатик",
            status: "В прогрес",
        },
    ]);

    const { aSideIsOpen } = useInput();

    const openTaskInformation = () => {
        setOpenTask(true);
    };
    const closeTaskInformation = () => {
        setOpenTask(false);
    };

    const handleTaskInformation = (title, index) => {
        setSelectedIndex(index);
    };

    const handleAddNewTask = () => {
        ///
    };

    return (
        <div className={`${styles.wrapper} `}>
            {aSideIsOpen && (
                <ASide
                    listItems={listOfTask}
                    title={"Задачи"}
                    open={openTaskInformation}
                    handleAddBtn={handleAddNewTask}
                    openFunction={handleTaskInformation}
                />
            )}
            {openTask && (
                <TaskInformation tasks={listOfTask} index={selectedIndex} />
            )}
        </div>
    );
}
