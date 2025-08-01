import classes from "./ExpandedContainer.module.css";

export default function MovementsInformation({ movements }) {
    return (
        <div className={classes.responsiveModal}>
            <div className={classes.modalMenu}>
                <h3>История на последни движения:</h3>
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
                        {movements.map((move) => (
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
