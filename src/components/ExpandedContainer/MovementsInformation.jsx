import classes from "./ExpandedContainer.module.css";

export default function MovementsInformation({
    movemetns,
    handleSetProtocolModal,
}) {
    return (
        <div className={classes.responsiveModal}>
            <div className={classes.modalMenu}>
                <h3>История на последни движения:</h3>
                <div>
                    <button onClick={handleSetProtocolModal}>
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
                        <tr>
                            <th>Дата</th>
                            <th>Местоположение</th>
                            <th>Парньор</th>
                            <th>Обект</th>
                            <th>Лице за контакт</th>
                            <th>Телефон</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movemetns.map((move) => (
                            <tr key={move.id}>
                                <th>{move.date}</th>
                                <th>{move.location}</th>
                                <th>{move.partner}</th>
                                <th>{move.object}</th>
                                <th>{move.contact}</th>
                                <th>{move.phone}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
