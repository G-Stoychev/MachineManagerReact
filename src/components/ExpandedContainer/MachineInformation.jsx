import classes from "./ExpandedContainer.module.css";

export default function MachineInformation({
    onClose,
    machine,
    lastmove,
    company,
}) {
    return (
        <div className={classes.informationModal}>
            <div className={classes.modalMenu}>
                <h2>Инфорамция за машина :</h2>
                <button
                    className={classes.closeBtn}
                    onClick={() => onClose(machine.id)}
                >
                    X
                </button>
            </div>

            <div className={classes.machineInformationTable}>
                <div className="left-section-wrapper">
                    <div className={classes.sectionWrapper}>
                        {machine.brand} {machine.model}
                    </div>
                    <div className={classes.sectionWrapper}>
                        <div>Сериен Номер: {machine.serialNumber}</div>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <div>Дата на закупуване:</div>
                        <div>{machine.buyDate}</div>
                    </div>

                    <div className={classes.sectionWrapper}>
                        <div>Местоположение:</div>
                        <div>
                            {lastmove ? lastmove.location : company.adress}
                        </div>
                    </div>
                </div>

                <div>
                    <div className={classes.sectionWrapper}>
                        <div>Дата на монтаж:</div>
                        <div>{lastmove ? lastmove.date : machine.buyDate}</div>
                    </div>

                    <div className={classes.sectionWrapper}>
                        <div>Парньор:</div>
                        <div>{lastmove ? lastmove.partner : company.name}</div>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <div>Обект:</div>
                        <div>{lastmove ? lastmove.object : company.object}</div>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <div>Лице за контакт:</div>
                        <div> {lastmove ? lastmove.contact : company.mol}</div>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <div>Телефон:</div>
                        <div> {lastmove ? lastmove.phone : company.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
