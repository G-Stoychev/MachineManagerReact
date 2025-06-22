import { useState, lazy } from "react";
import classes from "./MachineTable.module.css";

// import Row from "./Row.jsx";

const Row = lazy(() => import("./Row.jsx"));
export default function MachineTable({ machines, company }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <table className={classes.table}>
                <thead>
                    <tr className="info-row">
                        <th>Модел</th>
                        <th>Марка</th>
                        <th>Профилактика</th>
                        <th>Сериен номер</th>
                        <th>Движение</th>
                        <th>Местоположение</th>
                        <th>Обект</th>
                        <th>Фирма</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {machines.map((machine) => (
                        <Row
                            company={company}
                            key={machine.id}
                            machine={machine}
                            modalIsOpen={modalIsOpen}
                            setModalIsOpen={setModalIsOpen}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}
