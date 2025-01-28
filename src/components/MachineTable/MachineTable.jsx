import { useState } from "react";

import classes from "./MachineTable.module.css";

import Row from "./Row.jsx";
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
                        <Row
                            key={machine.id}
                            openModal={toggleModal}
                            machine={machine}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}
