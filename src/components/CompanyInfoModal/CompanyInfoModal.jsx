import { useRef, useImperativeHandle } from "react";

import classes from "./CompanyInfoModal.module.css";

export default function CompanyInfoModal({ ref }) {
    const CompanyDialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                CompanyDialog.current.showModal();
            },
        };
    });

    const handleCloseDialog = () => CompanyDialog.current.close();

    return (
        <dialog ref={CompanyDialog} className={classes.dialog}>
            <form>
                <div className={classes.dialogMenu}>
                    <h2>Добави фирма:</h2>
                    <button type="button" onClick={handleCloseDialog}>
                        X
                    </button>
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Име:</label>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Въведи име на фирмата"
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Булстат:</label>
                    <input
                        type="text"
                        placeholder="Булстат ако е по ДДС с BG"
                        name="bulstat"
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>МОЛ:</label>
                    <input
                        type="text"
                        placeholder="Материално отговорно лице"
                        name="mol"
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        placeholder="Адрес на регистрация"
                        name="companyAdress"
                    ></input>
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Телефон:</label>
                    <input
                        type="text"
                        placeholder="Телефон за контакт"
                        name="ContactPhone"
                    ></input>
                </div>

                <div className={classes.btnSection}>
                    <button>Добави</button>
                </div>
            </form>
        </dialog>
    );
}
