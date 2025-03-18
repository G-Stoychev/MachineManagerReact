import { useRef, useState } from "react";

import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import CompanyInfoModal from "../CompanyInfoModal/CompanyInfoModal.jsx";
import { getMachines, getCompany } from "../../services/dataService.js";

import classes from "./Container.module.css";

export default function Container({ userName, logout }) {
    const originalMachineList = getMachines();
    const [listOfMachines, setListOfMachines] = useState([
        ...originalMachineList,
    ]);
    const [companyInfo, setCompanyInfo] = useState(getCompany());
    const dialog = useRef();
    const CompanyDialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();
    const handleOpenCompanyModal = () => CompanyDialog.current.open();

    const sendRequest = async (machineData) => {
        const response = await fetch(
            "https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/machines.json",
            {
                method: "PUT",
                body: JSON.stringify(machineData),
            }
        );
        if (!response.ok) {
            throw new Error("Sending cart data failed");
        }
    };

    const handleAddNewMachine = (newMachineData) => {
        setListOfMachines([...listOfMachines, newMachineData]);
        sendRequest([...listOfMachines, newMachineData]);
    };

    const handleSearchMachine = (filterInput) => {
        const findedMachine = getMachines().filter(
            (m) => m.serialNumber === parseInt(filterInput)
        );
        setListOfMachines(findedMachine);
    };

    const handleSelectMachine = (selectedMachine) => {
        if (selectedMachine !== "") {
            const findedMachineByBrand = getMachines().filter(
                (m) => m.brand === selectedMachine
            );
            if (findedMachineByBrand.length > 0) {
                setListOfMachines(findedMachineByBrand);
            } else {
                const findedMachineByModel = getMachines().filter(
                    (m) => m.model === selectedMachine
                );
                setListOfMachines(findedMachineByModel);
            }
        } else {
            setListOfMachines(getMachines());
        }
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
                onSearch={handleSearchMachine}
                onReset={handleResetTable}
                company={companyInfo}
                machines={originalMachineList}
                onSelect={handleSelectMachine}
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
