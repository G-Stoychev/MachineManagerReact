import { useState, useImperativeHandle } from "react";
import "../ExpandedContainer/ExpandedContainer.css";

export default function ExpapandedContainer({ item, closeRow }) {
    const [content, setContent] = useState("repairs");

    function handleSetRepairs() {
        setContent("repairs");
    }

    function handleSetInformation() {
        setContent("information");
    }

    return (
        <div className="modal">
            <div className="information-modal">
                <div className="modal-menu">
                    <h2>Инфорамция за машина :</h2>
                    <button
                        className="close-btn"
                        onClick={() => {
                            closeRow(item.id);
                        }}
                    >
                        X
                    </button>
                </div>

                <div className="machine-information-table">
                    <div>
                        <div className="section">
                            {item.brand} {item.model}
                        </div>
                        <div className="section">
                            <div>Сериен Номер: {item.serialNumber}</div>
                        </div>
                        <div className="section">
                            <div>Дата на закупуване:</div>
                            <div>$data.buyDate</div>
                        </div>

                        <div className="section">
                            <div>Местоположение:</div>
                            <div>$partner.address</div>
                        </div>
                    </div>

                    <div>
                        <div className="section">
                            <div>Дата на монтаж:</div>
                            <div>$partner.lastMovementDate</div>
                        </div>

                        <div className="section">
                            <div>Парньор:</div>
                            <div>$partner.company</div>
                        </div>
                        <div className="section">
                            <div>Обект:</div>
                            <div>$partner.object</div>
                        </div>
                        <div className="section">
                            <div>Лице за контакт:</div>
                            <div>$partner.name</div>
                        </div>
                        <div className="section">
                            <div>Телефон:</div>
                            <div>$partner.phone</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row-menu">
                <div>
                    <button
                        className={
                            content === "repairs" ? "selected-btn" : undefined
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

            {content === "repairs" && (
                <div className="responsive-modal">
                    <div className="modal-menu">
                        <h3>Информация за ремонти:</h3>
                        <div>
                            <button className="add-new-repair">
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
                                <tr>
                                    <td className="date-of-repair">
                                        repair date
                                    </td>
                                    <td className="person">Name</td>
                                    <td className="previous-replaced-parts">
                                        parts
                                    </td>
                                    <td className="date-of-repair">
                                        prevention
                                    </td>
                                    <td>
                                        <button
                                            className="edit-repair-item"
                                            data-repair-id="${item.repairId}"
                                        >
                                            edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="date-of-repair">
                                        repair date
                                    </td>
                                    <td className="person">Name</td>
                                    <td className="previous-replaced-parts">
                                        parts
                                    </td>
                                    <td className="date-of-repair">
                                        prevention
                                    </td>
                                    <td>
                                        <button
                                            className="edit-repair-item"
                                            data-repair-id="${item.repairId}"
                                        >
                                            edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="date-of-repair">
                                        repair date
                                    </td>
                                    <td className="person">Name</td>
                                    <td className="previous-replaced-parts">
                                        parts
                                    </td>
                                    <td className="date-of-repair">
                                        prevention
                                    </td>
                                    <td>
                                        <button
                                            className="edit-repair-item"
                                            data-repair-id="${item.repairId}"
                                        >
                                            edit
                                        </button>
                                    </td>
                                </tr>
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
                            <button>Създай протокол</button>
                            <button>Създай протокол и договор</button>
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
