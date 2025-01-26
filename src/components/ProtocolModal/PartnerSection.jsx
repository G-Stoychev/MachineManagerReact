import classes from "./ProtocolModal.module.css";

export default function PartnerSection({ machine, lastmove, company }) {
    return (
        <div className={classes.protocolContainer}>
            <h1>Приемо-предавателен Протокол</h1>
            <div className={classes.section}>
                <p>Дата: {new Date().toLocaleDateString("en-GB")}</p>
                <h2>Данни на страните</h2>
                <div className={classes.partyInfo}>
                    <div className={classes.party}>
                        <h3>Предаваща страна</h3>
                        <p>{company.name}</p>
                        <p>Мол:{company.mol}</p>
                        <p>Адрес:{company.adress}</p>
                        <p>Телефон:{company.phone}</p>
                    </div>

                    <div className={classes.party}>
                        <h3>Приемаща страна</h3>
                        <p>{lastmove.partner}</p>
                        <p>Мол: {lastmove.contact}</p>
                        <p>Адрес: {lastmove.location}</p>
                        <p>Телефон: {lastmove.phone}</p>
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
                        <tbody>
                            <tr>
                                <td>${machine.model}</td>
                                <td>${machine.brand}</td>
                                <td>${machine.serialNumber}</td>
                                <td>
                                    <select className={classes.movementInfo}>
                                        <option>Монтаж</option>
                                        <option>Демонтаж</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={classes.signaturesSection}>
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
                            <p>{lastmove.contact}</p>
                            <p>Подпис на приемащата страна:</p>
                            <p>____________________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
