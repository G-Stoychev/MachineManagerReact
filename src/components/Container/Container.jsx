import { useRef, useState } from "react";

import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import CompanyInfoModal from "../CompanyInfoModal/CompanyInfoModal.jsx";
import { getMachines, getCompany } from "../../services/dataService.js";

import classes from "./Container.module.css";

export default function Container({ userName, logout }) {
    const [listOfMachines, setListOfMachines] = useState(getMachines());
    const [companyInfo, setCompanyInfo] = useState(getCompany());
    const dialog = useRef();
    const CompanyDialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();
    const handleOpenCompanyModal = () => CompanyDialog.current.open();

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

    const handleCompanyChange = (newCompanyInfo) => {
        setCompanyInfo(newCompanyInfo);
    };

    return (
        <div className={classes.container}>
            <Menu
                userName={userName}
                logout={logout}
                openModal={handleOpenAddItemModal}
                openCompanyModal={handleOpenCompanyModal}
                onFilter={handleSearchMachine}
                onReset={handleResetTable}
                company={companyInfo}
            />
            <AddItemModal
                ref={dialog}
                onAddNewMachine={handleAddNewMachine}
                company={companyInfo}
            />
            <CompanyInfoModal
                ref={CompanyDialog}
                company={companyInfo}
                onCompanyEdit={handleCompanyChange}
            />
            <MachineTable machines={listOfMachines} />
        </div>
    );
}
