import { useRef, useState, useEffect, lazy } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

// import Menu from "../Menu/Menu.jsx";
// import MachineTable from "../MachineTable/MachineTable.jsx";
// import AddItemModal from "../AddItemModal/AddItemModal.jsx";
// import CompanyInfoModal from "../CompanyInfoModal/CompanyInfoModal.jsx";
import {
    addMachineData,
    changeCompanyData,
} from "../../services/dataService.js";

const Menu = lazy(() => import("../Menu/Menu.jsx"));
const MachineTable = lazy(() => import("../MachineTable/MachineTable.jsx"));
const AddItemModal = lazy(() => import("../AddItemModal/AddItemModal.jsx"));
const CompanyInfoModal = lazy(() =>
    import("../CompanyInfoModal/CompanyInfoModal.jsx")
);

import classes from "./Container.module.css";

export default function Container({ userInfo, logout }) {
    const [originalMachineList, setOriginalMachineList] = useState([]);
    const [listOfMachines, setListOfMachines] = useState([]);
    const [companyInfo, setCompanyInfo] = useState({});
    const dialog = useRef();
    const CompanyDialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();
    const handleOpenCompanyModal = () => CompanyDialog.current.open();

    useEffect(() => {
        const database = getDatabase();
        const machinesRef = ref(database, "machines");
        const unsubscribe = onValue(
            machinesRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const machinesArray = Object.values(data);
                    setOriginalMachineList(machinesArray);
                    setListOfMachines(machinesArray);
                }
            },
            {
                onlyOnce: true,
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const database = getDatabase();
        const companyRef = ref(database, "company");
        const unsubscribe = onValue(
            companyRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCompanyInfo(data);
                }
            },
            {
                onlyOnce: true,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleAddNewMachine = (newMachineData) => {
        addMachineData(newMachineData);
        setListOfMachines([...listOfMachines, newMachineData]);
    };

    const handleSearchMachine = (filterInput) => {
        console.log(originalMachineList[4].serialNumber);
        const findedMachine = originalMachineList.filter(
            (m) => m.serialNumber === filterInput
        );
        console.log(typeof filterInput);
        setListOfMachines(findedMachine);
    };

    const handleSelectMachine = (selectedMachine) => {
        if (selectedMachine !== "") {
            const findedMachineByBrand = originalMachineList.filter(
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
            setListOfMachines(originalMachineList);
        }
    };

    const handleResetTable = () => {
        setListOfMachines(originalMachineList);
    };

    const handleCompanyChange = (newCompanyInfo) => {
        changeCompanyData(newCompanyInfo);
        setCompanyInfo(newCompanyInfo);
    };

    return (
        <div className={classes.container}>
            <Menu
                userInfo={userInfo}
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
            <MachineTable machines={listOfMachines} company={companyInfo} />
        </div>
    );
}
