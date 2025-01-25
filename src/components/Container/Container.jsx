import { useRef, useState } from "react";

import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getMachines } from "../../services/dataService.js";

import classes from "./Container.module.css";

export default function Container({ userName, logout }) {
    const [listOfMachines, setListOfMachines] = useState(getMachines());
    const dialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();

    const handleAddNewMachine = (newMachineData) => {
        setListOfMachines([...listOfMachines, newMachineData]);
        console.log(newMachineData);
    };

    return (
        <div className={classes.container}>
            <Menu
                userName={userName}
                logout={logout}
                openModal={handleOpenAddItemModal}
            />
            <AddItemModal ref={dialog} onAddNewMachine={handleAddNewMachine} />
            <MachineTable machines={listOfMachines} />
        </div>
    );
}
