import { useRef, useState, useEffect } from "react";

import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import CompanyInfoModal from "../CompanyInfoModal/CompanyInfoModal.jsx";
import {
    getMachines,
    getCompany,
    fetchtData,
    sendRequest,
} from "../../services/dataService.js";

import classes from "./Container.module.css";

export default function Container({ userName, logout }) {
    const [originalMachineList, setOriginalMachineList] = useState([]);
    const [listOfMachines, setListOfMachines] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(getCompany());
    const dialog = useRef();
    const CompanyDialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();
    const handleOpenCompanyModal = () => CompanyDialog.current.open();
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchtData("machines");

                if (data && typeof data === "object") {
                    const machinesArray = Object.values(data); // ✅ Преобразуваме обект в масив
                    setOriginalMachineList(machinesArray);
                    setListOfMachines(machinesArray);
                } else {
                    console.error("fetchtData() не върна валидни данни!", data);
                }
            } catch (error) {
                console.error("Грешка при зареждане на данните:", error);
            }
        }
        fetchData();
    }, [listOfMachines]);

    const handleAddNewMachine = (newMachineData) => {
        sendRequest("machines", newMachineData);
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
