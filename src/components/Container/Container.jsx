import { useRef, useState, useEffect, lazy } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { addMachineData } from "../../services/dataService.js";

const Menu = lazy(() => import("../Menu/Menu.jsx"));
const MachineTable = lazy(() => import("../MachineTable/MachineTable.jsx"));
const AddItemModal = lazy(() => import("../AddItemModal/AddItemModal.jsx"));
const ProtocolPlus = lazy(() => import("../ProtocolModal/ProtocolPlus.jsx"));

import classes from "./Container.module.css";

import { useInput } from "../../store/InputContext.jsx";

export default function Container() {
    const [companyInfo, setCompanyInfo] = useState({});
    const dialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();

    const [error, setError] = useState(false);
    const errorModal = useRef();

    const { listOfMachines } = useInput();

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    //Company Data
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

    const handleAddNewMachine = async (newMachineData) => {
        try {
            const savedMachine = await addMachineData(newMachineData);
        } catch (error) {
            console.error("Грешка при запис на новата машина:", error);
        }
    };

    return (
        <div className={classes.container}>
            {/* <Menu
                userInfo={userInfo}
                logout={close}
                openModal={handleOpenAddItemModal}
                company={companyInfo}
            /> */}
            <AddItemModal
                ref={dialog}
                onAddNewMachine={handleAddNewMachine}
                company={companyInfo}
            />
            <MachineTable machines={listOfMachines} company={companyInfo} />
        </div>
    );
}
