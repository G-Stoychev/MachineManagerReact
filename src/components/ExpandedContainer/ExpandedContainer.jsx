import { useState } from "react";
import "./ExpandedContainer.css";

import RepairModal from "../RepairModal/RepairModal.jsx";
import {
    getRepairsByMachineId,
    getMovementsByMachineId,
    getCompany,
} from "../../services/dataService.js";
import ProtocolModal from "../ProtocolModal/ProtocolModal.jsx";

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
<<<<<<< HEAD
        onUpdateMovement(currentMove);
=======
        onUpdateMovement(lastmove);
>>>>>>> 8943b10 (spread machineTable components and move states i row component)
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

<<<<<<< HEAD
    const handOnSaveMovement = (currentMove) => {
        currentMove.machineId = machine.id;
        currentMove.id = Date.now().toString();
        currentMove.date = new Date().toLocaleDateString("en-GB");
        setMovements(...movemetns, currentMove);
=======
    const handOnSaveMovement = (lastmove) => {
        lastmove.machineId = machine.id;
        lastmove.id = Date.now().toString();
        lastmove.date = new Date().toLocaleDateString("en-GB");
        setMovements((m) => [...m, lastmove]);
>>>>>>> 8943b10 (spread machineTable components and move states i row component)
        handleSetInformation();
        console.log(movemetns);
    };

<<<<<<< HEAD
    console.log(movemetns);
    const currentMove = movemetns[movemetns.length - 1];
=======
    const lastmove = movemetns[movemetns.length - 1];
>>>>>>> 8943b10 (spread machineTable components and move states i row component)

    return (
        <>
            {content === "protocolModal" ? (
                <ProtocolModal
                    machine={machine}
                    currentMove={currentMove ? currentMove : {}}
                    closeProtocolmodal={handleSetInformation}
                    onSaveMove={handOnSaveMovement}
                />
            ) : (
                <div className="modal">
                    <div className="information-modal">
                        <div className="modal-menu">
                            <h2>Инфорамция за машина :</h2>
                            <button
                                className="close-btn"
                                onClick={() => handleCloseModal(machine.id)}
                            >
                                X
                            </button>
                        </div>

                        <div className="machine-information-table">
                            <div className="left-section-wrapper">
                                <div className="section-wrapper">
                                    {machine.brand} {machine.model}
                                </div>
                                <div className="section-wrapper">
                                    <div>
                                        Сериен Номер: {machine.serialNumber}
                                    </div>
                                </div>
                                <div className="section-wrapper">
                                    <div>Дата на закупуване:</div>
                                    <div>{machine.buyDate}</div>
                                </div>

                                <div className="section-wrapper">
                                    <div>Местоположение:</div>
                                    <div>
                                        {currentMove
                                            ? currentMove.location
                                            : company.adress}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="section-wrapper">
                                    <div>Дата на монтаж:</div>
                                    <div>
                                        {currentMove
                                            ? currentMove.date
                                            : machine.buyDate}
                                    </div>
                                </div>

                                <div className="section-wrapper">
                                    <div>Парньор:</div>
                                    <div>
                                        {currentMove
                                            ? currentMove.partner
                                            : company.name}
                                    </div>
                                </div>
                                <div className="section-wrapper">
                                    <div>Обект:</div>
                                    <div>
                                        {currentMove
                                            ? currentMove.object
                                            : company.object}
                                    </div>
                                </div>
                                <div className="section-wrapper">
                                    <div>Лице за контакт:</div>
                                    <div>
                                        {" "}
                                        {currentMove
                                            ? currentMove.contact
                                            : company.mol}
                                    </div>
                                </div>
                                <div className="section-wrapper">
                                    <div>Телефон:</div>
                                    <div>
                                        {" "}
                                        {currentMove
                                            ? currentMove.phone
                                            : company.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <div className="responsive-modal">
                            <div className="modal-menu">
                                <h3>Информация за ремонти:</h3>
                                <div>
                                    <button
                                        className="add-new-repair"
                                        onClick={handleSetNewRepair}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        Добави ремонт
                                    </button>
                                </div>
                            </div>
                            <div className="previous-repairs">
                                <table className="repair-table">
                                    <thead>
                                        <tr className="info-row-repairs">
                                            <th>Дата</th>
                                            <th>Извършил</th>
                                            <th>Сменени части</th>
                                            <th>Профилактика</th>
                                            <th>Промени</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-rows">
                                        {repairsList.map((repair) => (
                                            <tr key={repair.id}>
                                                <td className="date-of-repair">
                                                    {repair.date}
                                                </td>
                                                <td className="person">
                                                    {repair.person}
                                                </td>
                                                <td className="previous-replaced-parts">
                                                    {repair.parts}
                                                </td>
                                                <td className="date-of-repair">
                                                    {repair.prevention
                                                        ? "Yes"
                                                        : "No"}
                                                </td>
                                                <td>
                                                    <button
                                                        className="edit-repair-machine"
                                                        onClick={() =>
                                                            handleSetUpdateRepair(
                                                                repair
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {content === "information" && (
                        <div className="responsive-modal">
                            <div className="modal-menu">
                                <h3>История на последни движения:</h3>
                                <div>
                                    <button onClick={handleSetProtocolModal}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        Създай протокол
                                    </button>
                                    <button>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        Създай протокол и договор
                                    </button>
                                </div>
                            </div>

                            <div>
                                <table>
                                    <thead>
                                        <tr className="info-row">
                                            <th>Дата</th>
                                            <th>Местоположение</th>
                                            <th>Парньор</th>
                                            <th>Обект</th>
                                            <th>Лице за контакт</th>
                                            <th>Телефон</th>
                                        </tr>
                                    </thead>
                                    <tbody className="info-table-rows">
                                        {movemetns.map((move) => (
                                            <tr
                                                key={move.id}
                                                className="info-row"
                                            >
                                                <th>{move.date}</th>
                                                <th>{move.location}</th>
                                                <th>{move.partner}</th>
                                                <th>{move.object}</th>
                                                <th>{move.contact}</th>
                                                <th>{move.phone}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
