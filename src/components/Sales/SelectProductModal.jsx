import { useRef, useImperativeHandle, useState } from "react";

export default function SelectProductModal({
    refSelectProductModal,
    products,
    handleAddProduct,
}) {
    const dialogRef = useRef();
    const [selectedId, setSelectedId] = useState("");

    useImperativeHandle(refSelectProductModal, () => ({
        open() {
            dialogRef.current.showModal();
        },
        close() {
            dialogRef.current.close();
        },
    }));

    const handleSelect = (e) => {
        setSelectedId(e.target.value);
    };

    const handleConfirm = () => {
        const selected = products.find((p) => p.id === String(selectedId));

        if (selected) {
            handleAddProduct({
                ...selected,
                price: selected.sellPrice,
                quantity: 1,
            });
            dialogRef.current.close();
            setSelectedId("");
        }
    };

    return (
        <dialog ref={dialogRef}>
            <h3>Избери продукт</h3>

            <select value={selectedId} onChange={handleSelect}>
                <option value="" disabled>
                    -- Избери продукт --
                </option>

                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name} – {p.sellPrice} €.
                    </option>
                ))}
            </select>

            <div style={{ marginTop: "12px" }}>
                <button type="button" onClick={() => dialogRef.current.close()}>
                    Отказ
                </button>

                <button
                    type="button"
                    disabled={!selectedId}
                    onClick={handleConfirm}
                >
                    Добави
                </button>
            </div>
        </dialog>
    );
}
