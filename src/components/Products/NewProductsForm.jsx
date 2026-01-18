import { useRef, useImperativeHandle, useState, useEffect } from "react";
import { addProduct, onUpdateProduct } from "../../services/dataService.js";

import ErrorModal from "../ErrorModal/ErrorModal.jsx";

import styles from "../Clients/ClientsDashboard.module.css";

export default function NewProductForm({
    refNewProductModal,
    selectedProduct,
}) {
    const refNewProductForm = useRef();
    const [error, setError] = useState(false);
    const errorModal = useRef();
    const isEdit = selectedProduct !== null;
    const [productInput, setProductInput] = useState({
        code: "",
        name: "",
        measure: "",
        incomingPrice: "",
        sellPrice: "",
        lot: "",
        info: "",
    });

    useEffect(() => {
        if (selectedProduct) {
            setProductInput(selectedProduct);
        } else {
            setProductInput({
                code: "",
                name: "",
                measure: "",
                incomingPrice: "",
                sellPrice: "",
                lot: "",
                info: "",
            });
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useImperativeHandle(refNewProductModal, () => {
        return {
            open() {
                refNewProductForm.current.showModal();
            },
        };
    });

    const handleCloseModal = () => {
        refNewProductForm.current.close();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setProductInput({
            code: "",
            name: "",
            measure: "",
            incomingPrice: "",
            sellPrice: "",
            lot: "",
            info: "",
        });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        if (Object.values(productInput).some((v) => v.trim() === "")) {
            setError(true);
            return;
        }

        if (isEdit) {
            onUpdateProduct(productInput.id, productInput);
            handleCloseModal();
            return;
        }

        addProduct(productInput);
        resetForm();
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
            <dialog className={styles.newClientDialog} ref={refNewProductForm}>
                <form
                    onSubmit={handleAddProduct}
                    className={styles.formNewClient}
                >
                    <div className={styles.navClientForm}>
                        <h2>
                            {isEdit
                                ? `Промени информация за продук  - ${productInput.name}`
                                : "Добави нов продукт"}
                        </h2>
                        <button type="button" onClick={handleCloseModal}>
                            X
                        </button>
                    </div>

                    <div className={styles.clientFormWrapper}>
                        <label>Код</label>
                        <input
                            type="text"
                            name="code"
                            placeholder="Код"
                            value={productInput.code}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Наименование</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Наименование"
                            value={productInput.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Мярка</label>
                        <input
                            type="text"
                            name="measure"
                            placeholder="Мярка"
                            value={productInput.measure}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Доставна Цена</label>
                        <input
                            type="number"
                            name="incomingPrice"
                            placeholder="Доставна Цена"
                            value={productInput.incomingPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Продажна Цена</label>
                        <input
                            type="number"
                            name="sellPrice"
                            placeholder="Продажна Цена"
                            value={productInput.sellPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Доставчик</label>
                        <input
                            type="text"
                            name="lot"
                            placeholder="Доставчик"
                            value={productInput.lot}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.clientFormWrapper}>
                        <label>Информация</label>
                        <input
                            type="text"
                            name="info"
                            placeholder="Информация"
                            value={productInput.info}
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
