import { useRef, useImperativeHandle, useActionState } from "react";

import classes from "./CompanyInfoModal.module.css";

export default function CompanyInfoModal({ ref, onCompanyEdit, company }) {
    const CompanyDialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                CompanyDialog.current.showModal();
            },
        };
    });

    const handleCloseDialog = () => CompanyDialog.current.close();

    const handleSubmit = (prevState, formData) => {
        const inputCompanyValues = {
            name: formData.get("name"),
            bulstat: formData.get("bulstat"),
            mol: formData.get("mol"),
            adress: formData.get("adress"),
            phone: formData.get("phone"),
        };
        if (
            inputCompanyValues.name === "" ||
            inputCompanyValues.bulstat === "" ||
            inputCompanyValues.mol === "" ||
            inputCompanyValues.adress === "" ||
            inputCompanyValues.phone === ""
        ) {
            alert("Моля попълнете всички поледата");
            return;
        }
        console.log(inputCompanyValues);
        handleCloseDialog();
        onCompanyEdit(inputCompanyValues);
    };
    const [formState, formAction] = useActionState(handleSubmit, company);
    return (
        <dialog ref={CompanyDialog} className={classes.dialog}>
            <form action={formAction}>
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
                        name="name"
                        placeholder="Въведи име на фирмата"
                        defaultValue={formState?.name}
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Булстат:</label>
                    <input
                        type="text"
                        placeholder="Булстат ако е по ДДС с BG"
                        name="bulstat"
                        defaultValue={formState?.bulstat}
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>МОЛ:</label>
                    <input
                        type="text"
                        placeholder="Материално отговорно лице"
                        name="mol"
                        defaultValue={formState?.mol}
                    />
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        placeholder="Адрес на регистрация"
                        name="adress"
                        defaultValue={formState?.adress}
                    ></input>
                </div>
                <div className={classes.sectionWrapper}>
                    <label>Телефон:</label>
                    <input
                        type="text"
                        placeholder="Телефон за контакт"
                        name="phone"
                        defaultValue={formState?.phone}
                    ></input>
                </div>

                <div className={classes.btnSection}>
                    <button>Добави</button>
                </div>
            </form>
        </dialog>
    );
}
