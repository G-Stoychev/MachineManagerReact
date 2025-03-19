import { useState, useRef, useEffect } from "react";
import classes from "./ExpandedContainer.module.css";

import RepairModal from "../RepairModal/RepairModal.jsx";
import {
    getRepairsByMachineId,
    getMovementsByMachineId,
    getCompany,
    sendRequest,
    fetchtData,
    updateRepairRequest,
} from "../../services/dataService.js";
import ProtocolModal from "../ProtocolModal/ProtocolModal.jsx";
import MachineInformation from "./MachineInformation.jsx";
import RepairsInformation from "./RepairsInformation.jsx";
import MovementsInformation from "./MovementsInformation.jsx";
import ErrorModal from "../ErrorModal/ErrorModal.jsx";

export default function ExpandedContainer({
    machine,
    closeRow,
    onUpdateMovement,
}) {
    const [error, setError] = useState(false);
    const [content, setContent] = useState("repairs");
    const [selectedRepair, setSelectedRepair] = useState();
    const [repairsList, setRepairsList] = useState([]);
    const [movements, setMovements] = useState(
        getMovementsByMachineId(machine.id)
    );
    const company = getCompany();
    const errorModal = useRef();

    const handleSetRepairs = () => {
        setContent("repairs");
        setSelectedRepair(undefined);
    };

    const handleSetInformation = () => setContent("information");
    const handleSetNewRepair = () => setContent("repairModal");
    const handleSetProtocolModal = () => setContent("protocolModal");
    const handleCloseModal = (id) => {
        if (content === "repairModal") {
            setError(true);
            return;
        }
        setSelectedRepair(undefined);
        onUpdateMovement(lastmove);
        closeRow(id);
    };
    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchtData("repairs");

                if (data && typeof data === "object") {
                    const repairsArray = Object.values(data);
                    const currentMachineRepairs = repairsArray.filter(
                        (repair) => repair.machineId === machine.id
                    );
                    setRepairsList(currentMachineRepairs);
                } else {
                    console.error("fetchtData() не върна валидни данни!", data);
                }
            } catch (error) {
                console.error("Грешка при зареждане на данните:", error);
            }
        }
        fetchData();
    }, [repairsList]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchtData("movements");

                if (data && typeof data === "object") {
                    const movementsArray = Object.values(data);
                    const currentMachineMovements = movementsArray.filter(
                        (move) => move.machineId === machine.id
                    );
                    setMovements(currentMachineMovements);
                } else {
                    console.error("fetchtData() не върна валидни данни!", data);
                }
            } catch (error) {
                console.error("Грешка при зареждане на данните:", error);
            }
        }
        fetchData();
    }, [movements]);

    const handleSetUpdateRepair = (repair) => {
        handleSetNewRepair();
        setSelectedRepair(repair);
    };

    const handleOnCreate = (newRepair) => {
        const newRep = {
            ...newRepair,
            id: Date.now().toString(),
            machineId: machine.id,
        };
        newRepair.id = Date.now().toString();

        sendRequest("repairs", newRep);
        handleSetRepairs();
    };
    const handleOnUpdate = (updatedRepair) => {
        // const index = repairsList.findIndex((r) => r.id === updatedRepair.id);
        // const copiedRepairsList = [...repairsList];
        // copiedRepairsList.splice(index, 1, updatedRepair);
        // setRepairsList(copiedRepairsList);
        updateRepairRequest("repairs", updatedRepair);
        handleSetRepairs();
        S;
    };

    const handOnSaveMovement = (lastmove) => {
        const newMove = {
            ...lastmove,
            machineId: machine.id,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString("en-GB"),
        };
        setMovements((m) => [...m, newMove]);
        sendRequest("movements", newMove);
        handleSetInformation();
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
            {content === "protocolModal" ? (
                <ProtocolModal
                    machine={machine}
                    lastmove={lastmove ? lastmove : {}}
                    closeProtocolmodal={handleSetInformation}
                    onSaveMove={handOnSaveMovement}
                />
            ) : (
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
                        <MovementsInformation
                            movements={movements}
                            handleSetProtocolModal={handleSetProtocolModal}
                        />
                    )}
                </div>
            )}
        </>
    );
}
