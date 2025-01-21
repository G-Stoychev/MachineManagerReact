import { useState, Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./MachineTable.module.css";

import ExpapandedContainer from "../ExpandedContainer/ExpandedContainer.jsx";
import MACHINESDATA from "../../util/machineData";

const machines = MACHINESDATA;

export default function MachineTable() {
    const [expandedRow, setExpandedRow] = useState(null);

    function toggleRow(id) {
        setExpandedRow(expandedRow === id ? null : id);
        return id;
    }

    return (
        <>
            <table className={classes.table}>
                <thead>
                    <tr className="info-row">
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Serial number</th>
                        <th>Movments</th>
                        <th>Location</th>
                        <th>Partner</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {machines.map((machine) => (
                        <Fragment key={machine.id}>
                            <tr
                                onClick={() => {
                                    toggleRow(machine.id);
                                }}
                            >
                                <td>{machine.model}</td>
                                <td>{machine.brand}</td>
                                <td>{machine.serialNumber}</td>
                                <td>{machine.movement}</td>
                                <td>{machine.location}</td>
                                <td>{machine.partner}</td>
                            </tr>
                            {expandedRow === machine.id &&
                                createPortal(
                                    <ExpapandedContainer
                                        item={machine}
                                        closeRow={toggleRow}
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
