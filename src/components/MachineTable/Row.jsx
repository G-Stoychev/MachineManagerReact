import { createPortal } from "react-dom";
import { useState } from "react";

import ExpandedContainer from "../ExpandedContainer/ExpandedContainer.jsx";

import { getCompany } from "../../services/dataService.js";

export default function Row({ machine }) {
    const [expandedModal, setExpandedModal] = useState(null);
    const [move, setMove] = useState(null);
    const company = getCompany();

    function toggleModal(id) {
        setExpandedModal(expandedModal === id ? null : id);
        return id;
    }

    const updateMovements = (lastmove) => {
        setMove(lastmove);
    };
    return (
        <>
            <tr
                onClick={() => {
                    toggleModal(machine.id);
                }}
            >
                <td>{machine.model}</td>
                <td>{machine.brand}</td>
                <td>{machine.serialNumber}</td>
                <td>{move ? move.date : machine.buyDate}</td>
                <td>{move ? move.location : company.adress}</td>
                <td>{move ? move.partner : company.name}</td>
            </tr>
            {expandedModal === machine.id &&
                createPortal(
                    <ExpandedContainer
                        machine={machine}
                        closeRow={toggleModal}
                        onUpdateMovement={updateMovements}
                    />,
                    document.getElementById("portal")
                )}
        </>
    );
}
