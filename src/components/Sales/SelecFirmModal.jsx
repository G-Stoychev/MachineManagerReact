import { useRef, useImperativeHandle, useState } from "react";

import styles from "./Sales.module.css";

export default function SelectFirmModal({
    refSelectFirmModal,
    firms,
    handleAddFirm,
}) {
    const dialogRef = useRef();
    const [selectedId, setSelectedId] = useState("");

    useImperativeHandle(refSelectFirmModal, () => ({
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
        const selected = firms.find((p) => p.id === String(selectedId));

        if (selected) {
            handleAddFirm(selected);
            dialogRef.current.close();
            setSelectedId("");
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.productModal}>
            <h3>Избери фирма</h3>

            <select
                value={selectedId}
                size={15}
                onChange={handleSelect}
                className={styles.selected}
            >
                <option> </option>
                {firms.map((f) => (
                    <option
                        key={f.id}
                        value={f.id}
                        className={styles.optSelectF}
                    >
                        {f.eik} - {f.name} – tel: {f.phone}.
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
