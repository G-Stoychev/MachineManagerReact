import { useImperativeHandle, useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import styles from "../Clients/ClientsDashboard.module.css";

export default function ClientsDashboard({ refGoodDashbord }) {
    const refGoodDashbordModal = useRef();
    const refGoodsForm = useRef();
    const [choosenGoods, setChoosenGoods] = useState(null);

    useImperativeHandle(refGoodDashbord, () => {
        return {
            open() {
                refGoodDashbordModal.current.showModal();
            },
        };
    });
    const handleCloseModal = () => {
        refGoodDashbordModal.current.close();
    };

    const [goodsData, setGoodsData] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const clientRef = ref(database, "goods");
        const unsubscribe = onValue(
            clientRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setGoodsData(Object.values(data));
                } else {
                    setGoodsData([]);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleremoveClient = (goodsId) => {
        deleteClient(goodsId);
    };

    return (
        <>
            <dialog ref={refGoodDashbordModal} className={styles.wrapper}>
                <div className={styles.clientNav}>
                    <h2>Стоки (ТОЗИ МОДУЛ Е ТЕСТОВИ )</h2>
                    <div>
                        <button
                            className={styles.addBtn}
                            onClick={() => {
                                setChoosenGoods(null);
                                newClientForm.current.open();
                            }}
                        >
                            Добави
                        </button>
                        <button
                            className={styles.tableBtn}
                            onClick={handleCloseModal}
                        >
                            {" "}
                            ❌
                        </button>
                    </div>
                </div>

                <table className={styles.tableClients}>
                    <thead>
                        <tr>
                            <th>Код</th>
                            <th>Наименование</th>
                            <th>Мярка</th>
                            <th>Доставна цена</th>
                            <th>Продажна Цена </th>
                            <th>Партиден номер</th>
                            <th>Информация</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goodsData.length !== 0 ? (
                            goodsData.map((goods) => (
                                <tr key={goods.id}>
                                    <td>{goods.eik}</td>
                                    <td>{goods.name}</td>
                                    <td>{goods.mol}</td>
                                    <td>{goods.address}</td>
                                    <td>{goods.phone}</td>
                                    <td>{goods.object}</td>
                                    <td>{goods.info}</td>
                                    <td>
                                        <div>
                                            <button
                                                className={styles.tableBtn}
                                                onClick={() => {
                                                    const isConfirmed = confirm(
                                                        "Сигурен ли си, че искаш да редактираш стока?"
                                                    );

                                                    if (!isConfirmed) return;
                                                    setChoosenGoods(goods);
                                                }}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                className={styles.tableBtn}
                                                onClick={() => {
                                                    const isConfirmed = confirm(
                                                        "Сигурен ли си, че искаш да изтриеш тази стока?"
                                                    );

                                                    if (!isConfirmed) return;

                                                    handleremoveClient(
                                                        goods.id
                                                    );
                                                }}
                                            >
                                                <i className="fa-solid fa-trash"></i>
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
                                    Няма добавена стока или грешка с база данни!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </dialog>
        </>
    );
}
