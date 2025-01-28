import classes from "./MachineTable.module.css";

import Row from "./Row.jsx";
export default function MachineTable({ machines }) {
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
                        <Row key={machine.id} machine={machine} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
