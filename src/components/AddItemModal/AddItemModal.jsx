import { useRef, useImperativeHandle } from "react";

import classes from "./AddItemModal.module.css";

export default function AddItemModal({ ref }) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    function handleCloseDialog() {
        dialog.current.close();
    }
    return (
        <dialog ref={dialog} className={classes.dialog}>
            <form>
                <div className={classes.dialogMenu}>
                    <h2>Добави машина:</h2>
                    <button type="button" onClick={handleCloseDialog}>
                        X
                    </button>
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Дата на покупка:</label>
                    <input type="date" />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Модел:</label>
                    <input type="text" placeholder="Въведи модел" />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Марка:</label>
                    <input type="text" placeholder="Въведи марка" />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Сериен номер:</label>
                    <input type="text" placeholder="Сериен номер"></input>
                </div>

                <div className={classes.btnSection}>
                    <button type="button">Добави</button>
                </div>
            </form>
        </dialog>
    );
}
