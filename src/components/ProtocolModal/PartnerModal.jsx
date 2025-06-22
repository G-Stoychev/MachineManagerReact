import {
    useRef,
    useState,
    useEffect,
    useImperativeHandle,
    useActionState,
} from "react";

import classes from "../CompanyInfoModal/CompanyInfoModal.module.css";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function PartnerModal({ lastmove, ref, onCreate }) {
    const dialog = useRef();
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
                dialog.current.showModal();
            },
        };
    });
    const handleCloseModal = () => {
        dialog.current.close();
    };

    const handleSubmit = (prevState, formData) => {
        const inputPartnerIfno = {
            id: Date.now().toString(),
            partner: formData.get("partner"),
            contact: formData.get("contact"),
            bulstat: formData.get("bulstat"),
            location: formData.get("location"),
            phone: formData.get("phone"),
            object: formData.get("object"),
        };
        if (
            Object.values(inputPartnerIfno).some((value) => value.trim() === "")
        ) {
            setError(true);
            return;
        }

        onCreate(inputPartnerIfno);
        handleCloseModal();
    };

    const [formState, formAction] = useActionState(handleSubmit, lastmove);
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
            <dialog ref={dialog} className={classes.dialog}>
                <form action={formAction}>
                    <div className={classes.dialogMenu}>
                        <h2>Промени партьор:</h2>
                        <button type="button" onClick={handleCloseModal}>
                            X
                        </button>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Име:</label>
                        <input
                            type="text"
                            name="partner"
                            placeholder="Въведи име на фирмата"
                            defaultValue={formState?.partner}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Булстат:</label>
                        <input
                            type="text"
                            name="bulstat"
                            placeholder="Въведи булстат"
                            defaultValue={formState?.bulstat}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>МОЛ:</label>
                        <input
                            type="text"
                            placeholder="МОЛ"
                            name="contact"
                            defaultValue={formState?.contact}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Адрес:</label>
                        <input
                            type="text"
                            placeholder="Адрес на регистрация"
                            name="location"
                            defaultValue={formState?.location}
                        ></input>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Обект:</label>
                        <input
                            type="text"
                            placeholder="Тип обект"
                            name="object"
                            defaultValue={formState?.object}
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
        </>
    );
}
