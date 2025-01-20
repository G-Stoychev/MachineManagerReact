import { useState } from "react";

export default function ExpapandedContainer({ item, closeRow }) {
    const [content, setContent] = useState("repairs");

    function handleSetRepairs() {
        setContent("repairs");
    }

    function handleSetInformation() {
        setContent("information");
    }

    return (
        <td colSpan="7" className="expanded-row">
            <div className="row-menu">
                <div>
                    <button onClick={handleSetRepairs}> Repairs</button>
                    <button onClick={handleSetInformation}>Infomation</button>
                </div>
                <button
                    className="close-btn close-repair-modal"
                    onClick={() => {
                        closeRow(item.id);
                    }}
                >
                    X
                </button>
            </div>
            {content === "repairs" && (
                <div className="repair-modal modal">
                    <div className="header-container">
                        <h2>Информация за ремонти:</h2>
                        <div>
                            <button className="save-changes">
                                <i className="fa-solid fa-floppy-disk"></i>
                                Запази
                            </button>
                            <button className="add-new-repair">
                                <i className="fa-solid fa-pen-to-square"></i>
                                Добави ремонт
                            </button>
                        </div>
                    </div>
                    <div className="render-repair-modal">
                        <div className="info-container repair-info-container">
                            <div>
                                <div>{item.brand}</div>
                                <div>{item.model}</div>
                            </div>
                            <div>
                                <div>Сериен Номер:</div>
                                <div>{item.serialNumber}</div>
                            </div>
                            <div>
                                <div>Последна профилактика:</div>
                                <div>{item.movevment}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Информация за предишни ремонти и сменени части</h3>
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
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {content === "information" && (
                <div className="information-modal modal">
                    <div className="header-container">
                        <h2>Текущо местоположение:</h2>
                        <div className="history-nav">
                            <button className="item-button create-protocol-button">
                                <i className="fa-solid fa-pen-to-square"></i>
                                Създай протокол
                            </button>
                            <button className="item-button create-protocol-and-contract-button">
                                <i className="fa-solid fa-pen-to-square"></i>
                                Създай протокол и договор
                            </button>
                        </div>
                    </div>
                    <div className="info-container information-info-container">
                        <div>
                            <div>
                                ${item.brand} ${item.model}
                            </div>
                        </div>
                        <div>
                            <div>Сериен Номер: ${item.serialNumber}</div>
                        </div>
                        <div>
                            <div>Дата на закупуване:</div>
                            <div>$data.buyDate</div>
                        </div>
                        <div>
                            <div>Местоположение:</div>
                            <div>$partner.address</div>
                        </div>
                        <div>
                            <div>Дата на монтаж:</div>
                            <div>$partner.lastMovementDate</div>
                        </div>

                        <div>
                            <div>Парньор:</div>
                            <div>$partner.company</div>
                        </div>
                        <div>
                            <div>Обект:</div>
                            <div>$partner.object</div>
                        </div>
                        <div>
                            <div>Лице за контакт:</div>
                            <div>$partner.name</div>
                        </div>
                        <div>
                            <div>Телефон:</div>
                            <div>$partner.phone</div>
                        </div>
                    </div>
                    <h2>История на последни движения:</h2>
                    <div className="last-movements-container">
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
                            <tbody className="info-table-rows"></tbody>
                        </table>
                    </div>
                </div>
            )}
        </td>
    );
}
