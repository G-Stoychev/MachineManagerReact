import {
    useRef,
    useImperativeHandle,
    useActionState,
    useEffect,
    useState,
    lazy,
} from "react";
// import ErrorModal from "../ErrorModal/ErrorModal.jsx";
const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
import classes from "./CompanyInfoModal.module.css";

export default function CompanyInfoModal({ ref, onCompanyEdit, company }) {
    const CompanyDialog = useRef();
    const [error, setError] = useState(false);

    const errorModal = useRef();
    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useImperativeHandle(ref, () => {
        return {
            open() {
                CompanyDialog.current.showModal();
            },
        };
    });

    const handleCloseDialog = () => CompanyDialog.current.close();
    const handleChange = (e) => {
        formState[e.target.name] = e.target.value;
    };

    const handleSubmit = (prevState, formData) => {
        const inputCompanyValues = {
            name: formData.get("name"),
            bulstat: formData.get("bulstat"),
            mol: formData.get("mol"),
            adress: formData.get("adress"),
            phone: formData.get("phone"),
        };
        if (
            Object.values(inputCompanyValues).some(
                (value) => value.trim() === ""
            )
        ) {
            setError(true);
            return;
        }

        handleCloseDialog();

        onCompanyEdit(inputCompanyValues);
    };
    const [formState, formAction] = useActionState(handleSubmit, company);
    return (
        <>
            {error && (
                <ErrorModal
                    title="Не попълнени полета!"
                    text={"Моля попълнете всичките полета!"}
                    setError={setError}
                    ref={errorModal}
                />
            )}
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
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Булстат:</label>
                        <input
                            type="text"
                            placeholder="Булстат ако е по ДДС с BG"
                            name="bulstat"
                            defaultValue={formState?.bulstat}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>МОЛ:</label>
                        <input
                            type="text"
                            placeholder="Материално отговорно лице"
                            name="mol"
                            defaultValue={formState?.mol}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Адрес:</label>
                        <input
                            type="text"
                            placeholder="Адрес на регистрация"
                            name="adress"
                            defaultValue={formState?.adress}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Телефон:</label>
                        <input
                            type="text"
                            placeholder="Телефон за контакт"
                            name="phone"
                            defaultValue={formState?.phone}
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div className={classes.btnSection}>
                        <button>Добави</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
