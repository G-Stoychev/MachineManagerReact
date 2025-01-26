import { getCompany } from "../../services/dataService.js";

import classes from "./ProtocolModal.module.css";
export default function ProtocolModal({ machine, lastmove }) {
    const company = getCompany();
    return (
        <div className={classes.protocolModal}>
            <div className={classes.protocolNav}>
                <button className="partner-ifno-btn protocol-menu-button">
                    <i className="fa-solid fa-pen-to-square"></i> Попълни данни
                    за протокол
                </button>
                <button className="protocol-menu-button save-protocol-button">
                    <i className="fa-solid fa-floppy-disk"></i> Запази
                </button>
                <button className={classes.closeBtn}>Х</button>
            </div>
            <div className={classes.wrapper}>
                <div className={classes.protocolContainer}>
                    <h1>Приемо-предавателен Протокол</h1>
                    <div className={classes.section}>
                        <p>Дата:${new Date().toLocaleDateString("en-GB")}</p>
                        <h2>Данни на страните</h2>
                        <div className={classes.partyInfo}>
                            <div className={classes.party}>
                                <h3>Предаваща страна</h3>
                                <p>${company.name}</p>
                                <p>Мол:${company.mol}</p>
                                <p>Адрес:${company.adress}</p>
                                <p>Телефон:${company.phone}</p>
                            </div>

                            <div className={classes.party}>
                                <h3>Приемаща страна</h3>
                                <p>{lastmove.partner}</p>
                                <p>Мол:{lastmove.contact}</p>
                                <p>Адрес:{lastmove.location}</p>
                                <p>Телефон:{lastmove.phone}</p>
                                <p>Обект:{lastmove.object}</p>
                            </div>
                        </div>

                        <div className={classes.section}>
                            <h2>Данни за предадената машина</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Модел</th>
                                        <th>Марка</th>
                                        <th>Сериен номер</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody className="protocol-table-body">
                                    <tr>
                                        <td>${machine.model}</td>
                                        <td>${machine.brand}</td>
                                        <td>${machine.serialNumber}</td>
                                        <td>
                                            <select
                                                className={classes.movementInfo}
                                            >
                                                <option>Монтаж</option>
                                                <option>Демонтаж</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={classes.section}>
                            <h2>Подписи</h2>
                            <div className={classes.signatures}>
                                <div>
                                    <select className={classes.employee}>
                                        <option>Георги Стойчев</option>
                                        <option>Красимир Тюлиев</option>
                                    </select>
                                    <p>Подпис на предаващата страна:</p>
                                    <p>____________________________</p>
                                </div>
                                <div>
                                    <p>${lastmove.contact}</p>
                                    <p>Подпис на приемащата страна:</p>
                                    <p>____________________________</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="protocol-container"></div>
            </div>

            <button
                className={classes.printButton}
                onClick={() => window.print()}
            >
                Принтирай протокола
            </button>
        </div>
    );
}
