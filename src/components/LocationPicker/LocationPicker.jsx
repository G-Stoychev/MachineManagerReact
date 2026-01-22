import { useEffect, useState, lazy } from "react";

import styles from "./Map.module.css";

const Map = lazy(() => import("./Map.jsx"));
import { updateMachineCoords } from "../../services/dataService";

export default function LocationPicker({ machine }) {
    const [previewCoords, setPreviewCoords] = useState(null);
    const [savedCoords, setSavedCoords] = useState(machine?.coords || null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Геолокацията не се поддържа");
            return;
        }
        if (machine?.coords && !previewCoords) {
            setPreviewCoords(machine.coords);
        }
    }, [machine, previewCoords]);

    const handleResetToMyLocation = () => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const myCoords = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setPreviewCoords(myCoords);
            },
            () => setError("Неуспешно взимане на локация"),
            { enableHighAccuracy: true },
        );
    };

    const handleSave = () => {
        setSavedCoords(previewCoords);
        updateMachineCoords(machine.id, previewCoords);
    };

    const isDirty =
        JSON.stringify(previewCoords) !== JSON.stringify(savedCoords);

    return (
        <div>
            <h3 className={styles.h}>Локация на обекта</h3>
            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button
                    onClick={handleResetToMyLocation}
                    className={styles.btn}
                >
                    Моята локация
                </button>

                <button
                    className={styles.btn}
                    onClick={handleSave}
                    disabled={!isDirty}
                >
                    Запази
                </button>
            </div>

            {error ? (
                <p className={styles.errorP}>{error}</p>
            ) : (
                <Map value={previewCoords} onChange={setPreviewCoords} />
            )}
        </div>
    );
}
