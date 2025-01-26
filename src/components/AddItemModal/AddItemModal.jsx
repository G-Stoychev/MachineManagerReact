import { useRef, useImperativeHandle } from "react";

import classes from "./AddItemModal.module.css";

export default function AddItemModal({ onAddNewMachine, ref, company }) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    const handleCloseDialog = () => dialog.current.close();

    const handleSubmit = (formData) => {
        const newMachineData = {
            id: Date.now().toString(),
            model: formData.get("model"),
            brand: formData.get("brand"),
            serialNumber: formData.get("serialNumber"),
            buyDate: formData.get("buyDate"),
            movement: new Date().toISOString().split("T")[0],
            location: company.adress,
            partner: company.name,
        };
        onAddNewMachine(newMachineData);
        handleCloseDialog();
    };

    return (
        <dialog ref={dialog} className={classes.dialog}>
            <form action={handleSubmit}>
                <div className={classes.dialogMenu}>
                    <h2>Добави машина:</h2>
                    <button type="button" onClick={handleCloseDialog}>
                        X
                    </button>
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Дата на покупка:</label>
                    <input type="date" name="buyDate" />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Модел:</label>
                    <input
                        type="text"
                        placeholder="Въведи модел"
                        name="model"
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Марка:</label>
                    <input
                        type="text"
                        placeholder="Въведи марка"
                        name="brand"
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Сериен номер:</label>
                    <input
                        type="text"
                        placeholder="Сериен номер"
                        name="serialNumber"
                    ></input>
                </div>

                <div className={classes.btnSection}>
                    <button>Добави</button>
                </div>
            </form>
        </dialog>
    );
}
