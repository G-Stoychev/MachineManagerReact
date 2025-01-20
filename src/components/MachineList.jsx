import { useState, Fragment } from "react";
import ExpapandedContainer from "./ExpandedContainer";
import MACHINESDATA from "../util/machineData";

const machines = MACHINESDATA;

export default function MachineList() {
    const [expandedRow, setExpandedRow] = useState(null);

    function toggleRow(id) {
        setExpandedRow(expandedRow === id ? null : id);
    }

    return (
        <table className="main-table">
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
                        {expandedRow === machine.id && (
                            <tr>
                                <ExpapandedContainer
                                    item={machine}
                                    closeRow={toggleRow}
                                />
                            </tr>
                        )}
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
}
