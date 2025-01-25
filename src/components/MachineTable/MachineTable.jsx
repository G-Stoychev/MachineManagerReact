import { useState, Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./MachineTable.module.css";

import ExpandedContainer from "../ExpandedContainer/ExpandedContainer.jsx";
export default function MachineTable({ machines }) {
    const [expandedModal, setExpandedModal] = useState(null);

    function toggleModal(id) {
        setExpandedModal(expandedModal === id ? null : id);
        return id;
    }

    return (
        <>
            <table className={classes.table}>
                <thead>
                    <tr className="info-row">
                        <th>Модел</th>
                        <th>Марка</th>
                        <th>Сериен номер</th>
                        <th>Движение</th>
                        <th>Местоположение</th>
                        <th>Фирма</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {machines.map((machine) => (
                        <Fragment key={machine.id}>
                            <tr
                                onClick={() => {
                                    toggleModal(machine.id);
                                }}
                            >
                                <td>{machine.model}</td>
                                <td>{machine.brand}</td>
                                <td>{machine.serialNumber}</td>
                                <td>{machine.movement}</td>
                                <td>{machine.location}</td>
                                <td>{machine.partner}</td>
                            </tr>
                            {expandedModal === machine.id &&
                                createPortal(
                                    <ExpandedContainer
                                        machine={machine}
                                        closeRow={toggleModal}
                                    />,
                                    document.getElementById("portal")
                                )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
}
