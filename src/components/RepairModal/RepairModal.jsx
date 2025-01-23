import classes from "./RepairModal.module.css";

export default function RepairModal({ closeRepairModal }) {
    return (
        <div>
            <h2>Добави ремонт:</h2>
            <div className={classes.sectionWrapper}>
                <div>Дана на ремонта:</div>
                <input type="date" />
            </div>
            <div className={classes.sectionWrapper}>
                <div>Профилактика:</div>
                <input type="checkbox" />
            </div>
            <div className={classes.sectionWrapper}>
                <div>Ремонтирана oт:</div>
                <input type="text" placeholder="Въведи име" />
            </div>
            <div className={classes.sectionWrapper}>
                <h3>Сменени части и други ремонти:</h3>
            </div>
            <textarea></textarea>

            <div>
                <button>Запази</button>
                <button onClick={closeRepairModal}>Излез</button>
            </div>
        </div>
    );
}
