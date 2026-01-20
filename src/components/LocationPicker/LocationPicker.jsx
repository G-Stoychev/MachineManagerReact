import { useEffect, useState, lazy } from "react";

const Map = lazy(() => import("./Map.jsx"));
import { updateMachineCoords } from "../../services/dataService";

export default function LocationPicker({ machine }) {
    const [previewCoords, setPreviewCoords] = useState(null);
    const [savedCoords, setSavedCoords] = useState(machine?.coords || null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!machine?.coords && !previewCoords) {
            if (!navigator.geolocation) {
                setError("Геолокацията не се поддържа");
                return;
            }

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
        } else if (machine?.coords && !previewCoords) {
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

    // 3. Save (commit)
    const handleSave = () => {
        setSavedCoords(previewCoords);
        updateMachineCoords(machine.id, previewCoords);
    };

    // Проверка за промяна (dirty state)
    const isDirty =
        JSON.stringify(previewCoords) !== JSON.stringify(savedCoords);

    return (
        <div>
            <h3>Локация на обекта</h3>

            <Map value={previewCoords} onChange={setPreviewCoords} />

            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button onClick={handleResetToMyLocation}>
                    🔄 Моята локация
                </button>

                <button onClick={handleSave} disabled={!isDirty}>
                    💾 Запази
                </button>
            </div>

            {savedCoords && (
                <div style={{ marginTop: 10 }}>
                    <strong>Запазени координати:</strong>
                    <div>Lat: {savedCoords.lat}</div>
                    <div>Lng: {savedCoords.lng}</div>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
