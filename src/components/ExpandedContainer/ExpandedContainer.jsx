import { useState } from "react";
import "./ExpandedContainer.css";

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

export default function ExpandedContainer({
    machine,
    closeRow,
    onUpdateMovement,
}) {
    const [content, setContent] = useState("repairs");
    const [selectedRepair, setSelectedRepair] = useState();
    const [repairsList, setRepairsList] = useState(
        getRepairsByMachineId(machine.id)
    );
    const [movemetns, setMovements] = useState(
        getMovementsByMachineId(machine.id)
    );
    const company = getCompany();

    const handleSetRepairs = () => {
        setContent("repairs");
        setSelectedRepair(undefined);
    };
    const handleSetInformation = () => setContent("information");
    const handleSetNewRepair = () => setContent("repairModal");
    const handleSetProtocolModal = () => setContent("protocolModal");
    const handleCloseModal = (id) => {
        if (content === "repairModal") {
            alert("Добавете нов ремонт или затворете секцията за нови ремонти");
            return;
        }
        setSelectedRepair(undefined);
        onUpdateMovement(lastmove);
        closeRow(id);
    };

    const handleSetUpdateRepair = (repair) => {
        handleSetNewRepair();
        setSelectedRepair(repair);
    };

    const handleOnCreate = (newRepair) => {
        newRepair.id = Date.now().toString();
        newRepair.machineId = machine.id;
        setRepairsList([...repairsList, newRepair]);
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
        lastmove.machineId = machine.id;
        lastmove.id = Date.now().toString();
        lastmove.date = new Date().toLocaleDateString("en-GB");
        setMovements((m) => [...m, lastmove]);
        handleSetInformation();
        console.log(movemetns);
    };

    const lastmove = movemetns[movemetns.length - 1];

    return (
        <>
            {content === "protocolModal" ? (
                <ProtocolModal
                    machine={machine}
                    lastmove={lastmove ? lastmove : {}}
                    closeProtocolmodal={handleSetInformation}
                    onSaveMove={handOnSaveMovement}
                />
            ) : (
                <div className="modal">
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
                        <div className="row-menu">
                            <div>
                                <button
                                    className={
                                        content === "repairs"
                                            ? "selected-btn"
                                            : undefined
                                    }
                                    onClick={handleSetRepairs}
                                >
                                    Ремонти
                                </button>
                                <button
                                    className={
                                        content === "information"
                                            ? "selected-btn"
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
                            movemetns={movemetns}
                            handleSetProtocolModal={handleSetProtocolModal}
                        />
                    )}
                </div>
            )}
        </>
    );
}
