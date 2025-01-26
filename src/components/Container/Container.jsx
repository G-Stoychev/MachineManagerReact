import { useRef, useState } from "react";

import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import CompanyInfoModal from "../CompanyInfoModal/CompanyInfoModal.jsx";
import { getMachines } from "../../services/dataService.js";

import classes from "./Container.module.css";

export default function Container({ userName, logout }) {
    const [listOfMachines, setListOfMachines] = useState(getMachines());
    const dialog = useRef();
    const CompanyDialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();
    const handleOpenComapnyModal = () => CompanyDialog.current.open();

    const handleAddNewMachine = (newMachineData) => {
        setListOfMachines([...listOfMachines, newMachineData]);
    };

    const handleSearchMachine = (filterInput) => {
        const findedMachine = listOfMachines.filter(
            (m) => m.serialNumber === parseInt(filterInput)
        );
        setListOfMachines(findedMachine);
    };

    const handleResetTable = () => {
        setListOfMachines(getMachines());
    };

    return (
        <div className={classes.container}>
            <Menu
                userName={userName}
                logout={logout}
                openModal={handleOpenAddItemModal}
                openCompanyModal={handleOpenComapnyModal}
                onFilter={handleSearchMachine}
                onReset={handleResetTable}
            />
            <AddItemModal ref={dialog} onAddNewMachine={handleAddNewMachine} />
            <CompanyInfoModal ref={CompanyDialog} />
            <MachineTable machines={listOfMachines} />
        </div>
    );
}
