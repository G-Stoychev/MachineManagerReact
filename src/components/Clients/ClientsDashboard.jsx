import { useImperativeHandle, useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import styles from "./ClientsDashboard.module.css";

import { deleteClient } from "../../services/dataService.js";
import NewClientForm from "./NewClientForm.jsx";

export function ClientsDashboard({ refClientDashbord }) {
    const clientDashboardModal = useRef();
    const newClientForm = useRef();

    useImperativeHandle(refClientDashbord, () => {
        return {
            open() {
                clientDashboardModal.current.showModal();
            },
        };
    });
    const handleCloseModal = () => {
        clientDashboardModal.current.close();
    };

    const [clientData, setClientData] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const clientRef = ref(database, "clients");
        const unsubscribe = onValue(
            clientRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setClientData(Object.values(data));
                } else {
                    setClientData([]);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleremoveClient = (clientID) => {
        deleteClient(clientID);
    };

    return (
        <>
            <NewClientForm refNewClientForm={newClientForm} />

            <dialog ref={clientDashboardModal} className={styles.wrapper}>
                <div className={styles.clientNav}>
                    <h2>Клиенти</h2>
                    <div>
                        <button
                            onClick={() => {
                                newClientForm.current.open();
                            }}
                        >
                            Добави
                        </button>
                        <button onClick={handleCloseModal}> Затвори</button>
                    </div>
                </div>

                <table className={styles.tableClients}>
                    <thead>
                        <tr>
                            <th>ЕИК</th>
                            <th>Фирма/Клиент</th>
                            <th>М.О.Л</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th>Обекти</th>
                            <th>Информация</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientData.length !== 0 ? (
                            clientData.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.eik}</td>
                                    <td>{client.name}</td>
                                    <td>{client.mol}</td>
                                    <td>{client.address}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        {client.objects.map((obj, index) => (
                                            <p key={index}>{obj}</p>
                                        ))}
                                    </td>
                                    <td>{client.info}</td>
                                    <td>
                                        <div>
                                            <button>edit</button>
                                            <button
                                                onClick={() => {
                                                    const isConfirmed = confirm(
                                                        "Сигурен ли си, че искаш да изтриеш този клиент?"
                                                    );

                                                    if (!isConfirmed) return;

                                                    handleremoveClient(
                                                        client.id
                                                    );
                                                }}
                                            >
                                                delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "8px",
                                    }}
                                >
                                    Няма клиенти или няма връзка със базата
                                    данни
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </dialog>
        </>
    );
}
