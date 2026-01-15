import { useRef, useImperativeHandle, useState, useEffect } from "react";
import { addClient, onUpdateClient } from "../../services/dataService.js";

import ErrorModal from "../ErrorModal/ErrorModal.jsx";

import styles from "./ClientsDashboard.module.css";

export default function NewClientForm({ refNewClientForm, selectedClient }) {
    const newClientForm = useRef();
    const [error, setError] = useState(false);
    const errorModal = useRef();
    const isEdit = selectedClient !== null;
    const [clientInput, setClientInput] = useState({
        eik: "",
        name: "",
        mol: "",
        address: "",
        phone: "",
        object: "",
        info: "",
    });

    useEffect(() => {
        if (selectedClient) {
            setClientInput(selectedClient);
        } else {
            setClientInput({
                eik: "",
                name: "",
                mol: "",
                address: "",
                phone: "",
                object: "",
                info: "",
            });
        }
    }, [selectedClient]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddClient = (e) => {
        e.preventDefault();

        if (Object.values(clientInput).some((v) => v.trim() === "")) {
            setError(true);
            return;
        }

        if (isEdit) {
            onUpdateClient(clientInput.id, clientInput);
            handleCloseModal();
            return;
        }

        addClient(clientInput);
        handleCloseModal();
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
                <form
                    onSubmit={handleAddClient}
                    className={styles.formNewClient}
                >
                    <div className={styles.navClientForm}>
                        <h2>
                            {isEdit
                                ? `Промени данни за фирма - ${clientInput.name}`
                                : "Добави нов клиент"}
                        </h2>
                        <button type="button" onClick={handleCloseModal}>
                            X
                        </button>
                    </div>

                    <div className={styles.clientFormWrapper}>
                        <label>ЕИК</label>
                        <input
                            type="text"
                            name="eik"
                            placeholder="ЕИК"
                            value={clientInput.eik}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Фирма/Клиент</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Фирма/Клиент"
                            value={clientInput.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>М.О.Л</label>
                        <input
                            type="text"
                            name="mol"
                            placeholder="М.О.Л"
                            value={clientInput.mol}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Адрес</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Адрес"
                            value={clientInput.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Телефон</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Телефон"
                            value={clientInput.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Обект</label>
                        <input
                            type="text"
                            name="object"
                            placeholder="Обект"
                            value={clientInput.object}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Информация</label>
                        <input
                            type="text"
                            name="info"
                            placeholder="Информация"
                            value={clientInput.info}
                            onChange={handleChange}
                        />
                    </div>

                    <button className={styles.clientFormWrapperBtn}>
                        {isEdit ? "Запази " : "Добави"}
                    </button>
                </form>
            </dialog>
        </>
    );
}
