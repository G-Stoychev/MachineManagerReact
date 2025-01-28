export default function MachineInformation({
    onClose,
    machine,
    lastmove,
    company,
}) {
    return (
        <div className="information-modal">
            <div className="modal-menu">
                <h2>Инфорамция за машина :</h2>
                <button
                    className="close-btn"
                    onClick={() => onClose(machine.id)}
                >
                    X
                </button>
            </div>

            <div className="machine-information-table">
                <div className="left-section-wrapper">
                    <div className="section-wrapper">
                        {machine.brand} {machine.model}
                    </div>
                    <div className="section-wrapper">
                        <div>Сериен Номер: {machine.serialNumber}</div>
                    </div>
                    <div className="section-wrapper">
                        <div>Дата на закупуване:</div>
                        <div>{machine.buyDate}</div>
                    </div>

                    <div className="section-wrapper">
                        <div>Местоположение:</div>
                        <div>
                            {lastmove ? lastmove.location : company.adress}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="section-wrapper">
                        <div>Дата на монтаж:</div>
                        <div>{lastmove ? lastmove.date : machine.buyDate}</div>
                    </div>

                    <div className="section-wrapper">
                        <div>Парньор:</div>
                        <div>{lastmove ? lastmove.partner : company.name}</div>
                    </div>
                    <div className="section-wrapper">
                        <div>Обект:</div>
                        <div>{lastmove ? lastmove.object : company.object}</div>
                    </div>
                    <div className="section-wrapper">
                        <div>Лице за контакт:</div>
                        <div> {lastmove ? lastmove.contact : company.mol}</div>
                    </div>
                    <div className="section-wrapper">
                        <div>Телефон:</div>
                        <div> {lastmove ? lastmove.phone : company.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
