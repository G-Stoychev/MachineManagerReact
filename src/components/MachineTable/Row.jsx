import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import ExpandedContainer from "../ExpandedContainer/ExpandedContainer.jsx";

export default function Row({ machine, setModalIsOpen, modalIsOpen, company }) {
    const [expandedModal, setExpandedModal] = useState(false);
    const [move, setMove] = useState(null);

    function toggleModal() {
        const nextState = !expandedModal;
        setExpandedModal(nextState);
        setModalIsOpen(nextState);
    }

    useEffect(() => {
        const database = getDatabase();
        const movementsRef = ref(database, "movements");
        const unsubscribe = onValue(
            movementsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const movementsArray = Object.values(data);
                    const currentMachineMove = movementsArray.filter(
                        (move) => move.machineId === machine.id
                    );
                    setMove(currentMachineMove[currentMachineMove.length - 1]);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <>
            <tr
                onClick={() => {
                    if (!modalIsOpen) toggleModal();
                }}
            >
                <td>{machine.model}</td>
                <td>{machine.brand}</td>
                <td>{machine.serialNumber}</td>
                <td>{move ? move.date : machine.buyDate}</td>
                <td>{move ? move.location : company.adress}</td>
                <td>{move ? move.partner : company.name}</td>
            </tr>
            {expandedModal &&
                createPortal(
                    <ExpandedContainer
                        company={company}
                        machine={machine}
                        closeRow={toggleModal}
                    />,
                    document.getElementById("portal")
                )}
        </>
    );
}
