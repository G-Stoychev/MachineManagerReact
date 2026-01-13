import { useRef, useImperativeHandle, useState, useEffect } from "react";
import { addClient } from "../../services/dataService.js";

import ErrorModal from "../ErrorModal/ErrorModal.jsx";

import styles from "./ClientsDashboard.module.css";

export default function NewClientForm({ refNewClientForm }) {
    const newClientForm = useRef();
    const [error, setError] = useState(false);
    const errorModal = useRef();
    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useImperativeHandle(refNewClientForm, () => {
        return {
            open() {
                newClientForm.current.showModal();
            },
        };
    });

    const handleCloseModal = () => {
        newClientForm.current.close();
    };
    const handleAddClient = (formData) => {
        const client = {
            eik: formData.get("eik"),
            name: formData.get("name"),
            mol: formData.get("mol"),
            address: formData.get("address"),
            phone: formData.get("phone"),
            object: formData.get({}),
            info: formData.get("info"),
        };
        if (Object.values(client).some((value) => value.trim() === "")) {
            setError(true);
            return;
        }
        addClient(client);
    };

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
            <dialog className={styles.newClientDialog} ref={newClientForm}>
                <form action={handleAddClient} className={styles.formNewClient}>
                    <div className={styles.navClientForm}>
                        <h2>Добави нов клиент</h2>
                        <button type="button" onClick={handleCloseModal}>
                            X
                        </button>
                    </div>

                    <div className={styles.clientFormWrapper}>
                        <label>ЕИК</label>
                        <input type="text " name="eik" placeholder="ЕИК" />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Фирма/Клиент</label>
                        <input
                            type="text "
                            name="name"
                            placeholder="Фирма/Клиент"
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>М.О.Л</label>
                        <input type="text " name="mol" placeholder="М.О.Л" />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Адрес</label>
                        <input
                            type="text "
                            name="address"
                            placeholder="Адрес"
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Телефон</label>
                        <input
                            type="text "
                            name="phone"
                            placeholder="Телефон"
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Обект</label>
                        <input type="text " name="object" placeholder="Обект" />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Информация</label>
                        <input
                            type="text "
                            name="info"
                            placeholder="Информация"
                        />
                    </div>

                    <button className={styles.clientFormWrapperBtn}>
                        Добави
                    </button>
                </form>
            </dialog>
        </>
    );
}
