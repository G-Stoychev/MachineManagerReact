export default function RepairsInformation({
    handleSetNewRepair,
    repairsList,
    handleSetUpdateRepair,
}) {
    return (
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
                                <td className="person">{repair.person}</td>
                                <td className="previous-replaced-parts">
                                    {repair.parts}
                                </td>
                                <td className="date-of-repair">
                                    {repair.prevention ? "Yes" : "No"}
                                </td>
                                <td>
                                    <button
                                        className="edit-repair-machine"
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
        </div>
    );
}
