import { useState } from "react";
import "../ExpandedContainer/ExpandedContainer.css";

import RepairModal from "../RepairModal/RepairModal.jsx";
import REPAIRS from "../../util/repairsByMachine.js";

export default function ExpapandedContainer({ item, closeRow }) {
    const currentMachineRepair = REPAIRS.filter(
        (repair) => repair.machineId === item.id
    );
    const [content, setContent] = useState("repairs");

    function handleSetRepairs() {
        setContent("repairs");
    }

    function handleSetInformation() {
        setContent("information");
    }

    function handleSetNewRepair() {
        setContent("newRepair");
    }

    function handleCloseModal(id) {
        if (content === "newRepair") {
            alert("Добавете нов ремонт или затворете секцията за нови ремонти");
            return;
        }
        closeRow(id);
    }

    return (
        <div className="modal">
            <div className="information-modal">
                <div className="modal-menu">
                    <h2>Инфорамция за машина :</h2>
                    <button
                        className="close-btn"
                        onClick={() => {
                            handleCloseModal(item.id);
                        }}
                    >
                        X
                    </button>
                </div>

                <div className="machine-information-table">
                    <div className="left-section-wrapper">
                        <div className="section-wrapper">
                            {item.brand} {item.model}
                        </div>
                        <div className="section-wrapper">
                            <div>Сериен Номер: {item.serialNumber}</div>
                        </div>
                        <div className="section-wrapper">
                            <div>Дата на закупуване:</div>
                            <div>$data.buyDate</div>
                        </div>

                        <div className="section-wrapper">
                            <div>Местоположение:</div>
                            <div>$partner.address</div>
                        </div>
                    </div>

                    <div>
                        <div className="section-wrapper">
                            <div>Дата на монтаж:</div>
                            <div>$partner.lastMovementDate</div>
                        </div>

                        <div className="section-wrapper">
                            <div>Парньор:</div>
                            <div>$partner.company</div>
                        </div>
                        <div className="section-wrapper">
                            <div>Обект:</div>
                            <div>$partner.object</div>
                        </div>
                        <div className="section-wrapper">
                            <div>Лице за контакт:</div>
                            <div>$partner.name</div>
                        </div>
                        <div className="section-wrapper">
                            <div>Телефон:</div>
                            <div>$partner.phone</div>
                        </div>
                    </div>
                </div>
            </div>
            {content === "newRepair" ? (
                <RepairModal closeRepairModal={handleSetRepairs} />
            ) : (
                <div className="row-menu">
                    <div>
                        <button
                            className={
                                content === "repairs"
                                    ? "selected-btn"
                                    : undefined
                            }
                            onClick={handleSetRepairs}
                        >
                            Ремонти
                        </button>
                        <button
                            className={
                                content === "information"
                                    ? "selected-btn"
                                    : undefined
                            }
                            onClick={handleSetInformation}
                        >
                            Движения
                        </button>
                    </div>
                </div>
            )}

            {content === "repairs" && (
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
                                {currentMachineRepair.map((repair) => (
                                    <tr key={repair.repairId}>
                                        <td className="date-of-repair">
                                            {repair.dateOfRepair}
                                        </td>
                                        <td className="person">
                                            {repair.repairByPerson}
                                        </td>
                                        <td className="previous-replaced-parts">
                                            {repair.replacedParts}
                                        </td>
                                        <td className="date-of-repair">
                                            {repair.prevention ? "Yes" : "No"}
                                        </td>
                                        <td>
                                            <button className="edit-repair-item">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {content === "information" && (
                <div className="responsive-modal">
                    <div className="modal-menu">
                        <h3>История на последни движения:</h3>
                        <div>
                            <button>
                                <i className="fa-solid fa-pen-to-square"></i>
                                Създай протокол
                            </button>
                            <button>
                                <i className="fa-solid fa-pen-to-square"></i>
                                Създай протокол и договор
                            </button>
                        </div>
                    </div>

                    <div>
                        <table>
                            <thead>
                                <tr className="info-row">
                                    <th>Дата</th>
                                    <th>Местоположение</th>
                                    <th>Парньор</th>
                                    <th>Обект</th>
                                    <th>Лице за контакт</th>
                                    <th>Телефон</th>
                                </tr>
                            </thead>
                            <tbody className="info-table-rows">
                                <tr className="info-row">
                                    <th>15.01.2025</th>
                                    <th>Бургас Янко Комитов 8</th>
                                    <th>КСБ ООД</th>
                                    <th>СКЛАД</th>
                                    <th>Дария Тюлиева</th>
                                    <th>08666 444 666</th>
                                </tr>
                                <tr className="info-row">
                                    <th>18.01.2025</th>
                                    <th>Бургас ул ОДрин 5</th>
                                    <th>М фокс ООД</th>
                                    <th>СКЛАД</th>
                                    <th>Таня Петрова</th>
                                    <th>08566 765 687</th>
                                </tr>
                                <tr className="info-row">
                                    <th>21.01.2025</th>
                                    <th>Бургас опера</th>
                                    <th>Тришър ЕООД</th>
                                    <th>Магазин</th>
                                    <th>Илия Илиев</th>
                                    <th>0893 6123 097</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
