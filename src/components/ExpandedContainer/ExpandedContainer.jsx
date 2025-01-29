import { useState, useRef, useEffect } from "react";
import classes from "./ExpandedContainer.module.css";

import RepairModal from "../RepairModal/RepairModal.jsx";
import {
    getRepairsByMachineId,
    getMovementsByMachineId,
    getCompany,
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
    const [repairsList, setRepairsList] = useState(
        getRepairsByMachineId(machine.id)
    );
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
        setRepairsList([...repairsList, newRep]);
        handleSetRepairs();
    };
    const handleOnUpdate = (updatedRepair) => {
        const index = repairsList.findIndex((r) => r.id === updatedRepair.id);
        const copiedRepairsList = [...repairsList];
        copiedRepairsList.splice(index, 1, updatedRepair);
        setRepairsList(copiedRepairsList);
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
        handleSetInformation();
    };

    const lastmove = movements[movements.length - 1];

    return (
        <>
            {error && (
                <ErrorModal
                    title="Не позволено затваряне на модал!"
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
