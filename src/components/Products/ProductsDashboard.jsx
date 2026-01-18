import { useImperativeHandle, useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { deleteProduct } from "../../services/dataService.js"

import styles from "../Clients/ClientsDashboard.module.css";

import NewProductForm from "./NewProductsForm.jsx"

export default function ClientsDashboard({ refProductsDashbord }) {
    const refGoodDashbordModal = useRef();
    const refProductForm = useRef();
    const [choosenProduct, setChoosenProducts] = useState(null);

    useImperativeHandle(refProductsDashbord, () => {
        return {
            open() {
                refGoodDashbordModal.current.showModal();
            },
        };
    });
    const handleCloseModal = () => {
        refGoodDashbordModal.current.close();
    };

    const [productsData, setproductsData] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const productsRef = ref(database, "products");
        const unsubscribe = onValue(
            productsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setproductsData(Object.values(data));
                } else {
                    setproductsData([]);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleRemoveProduct = (productId) => {
        deleteProduct(productId);
    };

    return (
        <>
            <NewProductForm refNewProductModal={refProductForm} selectedProduct={choosenProduct}/>

            <dialog ref={refGoodDashbordModal} className={styles.wrapper}>
                <div className={styles.clientNav}>
                    <h2>Стоки (ТОЗИ МОДУЛ Е ТЕСТОВИ )</h2>
                    <div>
                        <button
                            className={styles.addBtn}
                            onClick={() => {
                                setChoosenProducts(null);
                                refProductForm.current.open();
                            }}
                        >
                            Добави
                        </button>
                        <button
                            className={styles.tableBtn}
                            onClick={handleCloseModal}
                        >
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
                        {productsData.length !== 0 ? (
                            productsData.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.measure}</td>
                                    <td>Є {product.incomingPrice}</td>
                                    <td>Є {product.sellPrice}</td>
                                    <td>{product.lot}</td>
                                    <td>{product.info}</td>
                                    <td>
                                        <div>
                                            <button
                                                className={styles.tableBtn}
                                                onClick={() => {
                                                    const isConfirmed = confirm(
                                                        "Сигурен ли си, че искаш да редактираш стока?"
                                                    );

                                                    if (!isConfirmed) return;
                                                    setChoosenProducts(product);
                                                    refProductForm.current.open();
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

                                                    handleRemoveProduct(
                                                        product.id
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
