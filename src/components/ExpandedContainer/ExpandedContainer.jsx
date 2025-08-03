import { useState, useRef, useEffect, lazy } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import classes from "./ExpandedContainer.module.css";

import RepairModal from "../RepairModal/RepairModal.jsx";
import {
    addRepairData,
    addMoveData,
    changeRepairData,
} from "../../services/dataService.js";

const MachineInformation = lazy(() => import("./MachineInformation.jsx"));
const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
const RepairsInformation = lazy(() => import("./RepairsInformation.jsx"));
const MovementsInformation = lazy(() => import("./MovementsInformation.jsx"));

export default function ExpandedContainer({ machine, closeRow, company }) {
    const [error, setError] = useState(false);
    const [content, setContent] = useState("repairs");
    const [selectedRepair, setSelectedRepair] = useState();
    const [repairsList, setRepairsList] = useState([]);
    const [movements, setMovements] = useState([]);

    const errorModal = useRef();

    const handleSetRepairs = () => {
        setContent("repairs");
        setSelectedRepair(undefined);
    };

    const handleSetInformation = () => setContent("information");
    const handleSetNewRepair = () => setContent("repairModal");
    const handleCloseModal = (id) => {
        if (content === "repairModal") {
            setError(true);
            return;
        }
        setSelectedRepair(undefined);
        closeRow(id);
    };
    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useEffect(() => {
        const database = getDatabase();
        const repairsRef = ref(database, "repairs");
        const unsubscribe = onValue(
            repairsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const repairsArray = Object.values(data);
                    const currentMachineRepairs = repairsArray.filter(
                        (repair) => repair.machineId === machine.id
                    );
                    setRepairsList(currentMachineRepairs);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const database = getDatabase();
        const movementsRef = ref(database, "movements");
        const unsubscribe = onValue(
            movementsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const movementsArray = Object.values(data);
                    const currentMachineMove = movementsArray.filter((move) =>
                        Array.isArray(move.machineId)
                            ? move.machineId.includes(machine.id)
                            : move.machineId === machine.id
                    );
                    setMovements(currentMachineMove);
                }
            },
            {
                onlyOnce: true,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleSetUpdateRepair = (repair) => {
        handleSetNewRepair();
        setSelectedRepair(repair);
    };

    const handleOnCreate = async (newRepair) => {
        const newRep = {
            ...newRepair,
            machineId: machine.id,
        };

        try {
            const savedRepair = await addRepairData(newRep);
            setRepairsList([...repairsList, savedRepair]);
            handleSetRepairs();
        } catch (error) {
            console.error("Грешка при запис на ремонт:", error);
        }
    };

    const handleOnUpdate = (updatedRepair) => {
        changeRepairData(updatedRepair.id, updatedRepair);
        handleSetRepairs();
    };

    const lastmove = movements[movements.length - 1];

    return (
        <>
            {error && (
                <ErrorModal
                    title="Не позволено затваряне на секцията!"
                    text={
                        "Добавете нов ремонт или затворете секцията за нови ремонти, преди да продължите!"
                    }
                    setError={setError}
                    ref={errorModal}
                />
            )}

            <div className={classes.modal}>
                <MachineInformation
                    onClose={handleCloseModal}
                    company={company}
                    lastmove={lastmove}
                    machine={machine}
                />
                {content === "repairModal" ? (
                    <RepairModal
                        closeRepairModal={handleSetRepairs}
                        repair={selectedRepair}
                        onCreate={handleOnCreate}
                        onUpdate={handleOnUpdate}
                        setError={setError}
                    />
                ) : (
                    <div className={classes.rowMenu}>
                        <div>
                            <button
                                className={
                                    content === "repairs"
                                        ? classes.selectedBtn
                                        : undefined
                                }
                                onClick={handleSetRepairs}
                            >
                                Ремонти
                            </button>
                            <button
                                className={
                                    content === "information"
                                        ? classes.selectedBtn
                                        : undefined
                                }
                                onClick={handleSetInformation}
                            >
                                Движения
                            </button>
                        </div>
                    </div>
                )}

                {content === "repairs" && (
                    <RepairsInformation
                        repairsList={repairsList}
                        handleSetUpdateRepair={handleSetUpdateRepair}
                        handleSetNewRepair={handleSetNewRepair}
                    />
                )}

                {content === "information" && (
                    <MovementsInformation movements={movements} />
                )}
            </div>
        </>
    );
}
