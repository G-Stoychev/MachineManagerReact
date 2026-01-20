import { useRef, useImperativeHandle, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { addNewSale } from "../../services/dataService.js";

import SelectProductModal from "./SelectProductModal.jsx";
import SelectFirmModal from "./SelecFirmModal.jsx";

import styles from "./Sales.module.css";

export default function SaleForm({ refSeleForm }) {
    const refSaleModal = useRef();
    const refSelectFirmModal = useRef();
    const refSelectProductModal = useRef();

    const [chosenProducts, setChosenProducts] = useState([]);
    const [chosenFirm, setChosenFirm] = useState(null);

    useImperativeHandle(refSeleForm, () => ({
        open() {
            refSaleModal.current.showModal();
        },
    }));

    const [productsData, setproductsData] = useState([]);
    const [firmData, setFirmData] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const clientRef = ref(database, "clients");
        const unsubscribe = onValue(
            clientRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setFirmData(Object.values(data));
                } else {
                    setFirmData([]);
                }
            },
            {
                onlyOnce: false,
            },
        );

        return () => unsubscribe();
    }, []);

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
            },
        );

        return () => unsubscribe();
    }, []);

    const closeAndResetForm = () => {
        setChosenProducts([]);
        setChosenFirm(null);
        refSaleModal.current.close();
    };

    const handleAddProduct = (selectedProduct) => {
        if (!selectedProduct) return;

        setChosenProducts((prev) => {
            const existing = prev.find((p) => p.id === selectedProduct.id);

            if (existing) {
                return prev.map((p) =>
                    p.id === selectedProduct.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p,
                );
            } else {
                return [...prev, { ...selectedProduct, quantity: 1 }];
            }
        });
    };

    const handleProductChange = (id, field, value) => {
        setChosenProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, [field]: Number(value) } : p,
            ),
        );
    };

    const handleRemoveProduct = (id) => {
        setChosenProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const totalSum = chosenProducts.reduce(
        (sum, p) => sum + p.quantity * p.price,
        0,
    );

    const handleAddFirm = (firm) => {
        setChosenFirm(firm);
    };

    const handleSaveSale = () => {
        if (!chosenFirm) {
            alert("Моля, изберете фирма");
            return;
        }

        if (chosenProducts.length === 0) {
            alert("Добавете поне един продукт");
            return;
        }

        const newSale = {
            firmName: chosenFirm.name,
            firmEik: chosenFirm.eik,
            firmObject: chosenFirm.object,
            firmPhone: chosenFirm.phone,

            products: chosenProducts.map((p) => ({
                productId: p.id,
                name: p.name,
                quantity: p.quantity,
                price: p.price,
                total: p.quantity * p.price,
            })),

            totalSum: totalSum,
            createdAt: new Date().toLocaleDateString("bg-BG"),
        };

        addNewSale(newSale);
        setChosenProducts([]);
        setChosenFirm(null);
        closeAndResetForm();
    };

    return (
        <>
            <SelectProductModal
                refSelectProductModal={refSelectProductModal}
                products={productsData}
                handleAddProduct={handleAddProduct}
            />

            <SelectFirmModal
                refSelectFirmModal={refSelectFirmModal}
                firms={firmData}
                handleAddFirm={handleAddFirm}
            />
            <dialog ref={refSaleModal} className={styles.wrapperSalesForm}>
                <div className={styles.saleNav}>
                    <h2>Нова продажба</h2>
                    {chosenFirm !== null ? (
                        <div>
                            към клиент - {chosenFirm.name}
                            <button
                                className={styles.tableBtn}
                                onClick={() => {
                                    setChosenFirm(null);
                                }}
                            >
                                <i className="fa-solid fa-circle-minus"></i>
                            </button>
                        </div>
                    ) : (
                        <button
                            className={styles.tableBtn}
                            onClick={() => {
                                refSelectFirmModal.current.open();
                            }}
                        >
                            Добави клиент
                        </button>
                    )}

                    <div>
                        <button type="button" onClick={handleSaveSale}>
                            Запази
                        </button>
                        <button
                            type="button"
                            className={styles.tableBtn}
                            onClick={() => {
                                if (
                                    chosenFirm !== null ||
                                    chosenProducts.length > 0
                                ) {
                                    const isConfirmed = confirm(
                                        "При напускане, иформацията за продажбата ще бъде загубена, продължаваш ли  ?",
                                    );
                                    if (!isConfirmed) return;
                                    closeAndResetForm();
                                }
                                closeAndResetForm();
                            }}
                        >
                            ❌
                        </button>
                    </div>
                </div>

                <form className={styles.form}>
                    <ul className={styles.productList}>
                        {chosenProducts.map((p) => (
                            <li key={p.id} className={styles.productItem}>
                                <p>{p.name}</p>

                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    value={p.quantity}
                                    onChange={(e) =>
                                        handleProductChange(
                                            p.id,
                                            "quantity",
                                            e.target.value,
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={p.price}
                                    onChange={(e) =>
                                        handleProductChange(
                                            p.id,
                                            "price",
                                            e.target.value,
                                        )
                                    }
                                />

                                <span className={styles.total}>
                                    {(p.quantity * p.price).toFixed(2)} €.
                                </span>

                                <button
                                    className={styles.tableBtn}
                                    type="button"
                                    onClick={() => handleRemoveProduct(p.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={() => {
                            refSelectProductModal.current.open();
                        }}
                        className={styles.addProductBtn}
                    >
                        ➕ Добави продукт
                    </button>

                    <hr />

                    <h3>Общо: {totalSum.toFixed(2)} €.</h3>
                </form>
            </dialog>
        </>
    );
}
