import classes from "./ExpandedContainer.module.css";

export default function RepairsInformation({
    handleSetNewRepair,
    repairsList,
    handleSetUpdateRepair,
}) {
    return (
        <div className={classes.responsiveModal}>
            <div className={classes.modalMenu}>
                <h3>Информация за ремонти:</h3>
                <div>
                    <button onClick={handleSetNewRepair}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        Добави ремонт
                    </button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Извършил</th>
                        <th>Сменени части</th>
                        <th>Профилактика</th>
                        <th>Промени</th>
                    </tr>
                </thead>
                <tbody>
                    {repairsList.map((repair) => (
                        <tr key={repair.id}>
                            <td> {repair.date}</td>
                            <td>{repair.person}</td>
                            <td>{repair.parts}</td>
                            <td>{repair.prevention ? "Да" : "Не"}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleSetUpdateRepair(repair)
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
    );
}
