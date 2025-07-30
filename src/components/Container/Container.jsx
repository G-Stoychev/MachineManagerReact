import { useRef, useState, useEffect, lazy } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { addMachineData } from "../../services/dataService.js";

const MachineTable = lazy(() => import("../MachineTable/MachineTable.jsx"));
const AddItemModal = lazy(() => import("../AddItemModal/AddItemModal.jsx"));

import classes from "./Container.module.css";

import { useMachines } from "../../store/MachineContext.jsx";
import { useInput } from "../../store/InputContext.jsx";

export default function Container() {
    const [companyInfo, setCompanyInfo] = useState({});

    const { listOfMachines } = useMachines();
    const { handleAddNewMachine, dialog } = useInput();

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

    return (
        <div className={classes.container}>
            <AddItemModal
                ref={dialog}
                onAddNewMachine={handleAddNewMachine}
                company={companyInfo}
            />
            <MachineTable machines={listOfMachines} company={companyInfo} />
        </div>
    );
}
