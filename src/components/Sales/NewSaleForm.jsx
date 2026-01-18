import { useRef, useImperativeHandle, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import SelectProductModal from "../Sales/SelectProductModal.jsx";

import styles from "./Sales.module.css";

export default function SaleForm({ refSeleForm }) {
    const refSaleModal = useRef();
    const refSelectProductModal = useRef();

    const [chosenProducts, setChosenProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useImperativeHandle(refSeleForm, () => ({
        open() {
            refSaleModal.current.showModal();
        },
    }));

    const handleCloseModal = () => {
        refSaleModal.current.close();
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
            },
        );

        return () => unsubscribe();
    }, []);

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

    return (
        <>
            <SelectProductModal
                refSelectProductModal={refSelectProductModal}
                products={productsData}
                handleAddProduct={handleAddProduct}
            />
            <dialog ref={refSaleModal} className={styles.wrapperSalesForm}>
                <div className={styles.saleNav}>
                    <h2>Нова продажба</h2>
                    <div>
                        <button type="button">Запази</button>
                        <button
                            type="button"
                            className={styles.tableBtn}
                            onClick={handleCloseModal}
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
