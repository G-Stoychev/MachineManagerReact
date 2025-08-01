import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../RepairList/RepairList.module.css";

export default function RepairList({ company, user }) {
    const sigPadA = useRef();
    const sigPadB = useRef();

    const [signatureAUrl, setSignatureAUrl] = useState(null);
    const [signatureBUrl, setSignatureBUrl] = useState(null);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        sideBName: "",
        sideBInfo: "",
    });

    const [locked, setLocked] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const clearSignature = (pad) => {
        pad.current.clear();
    };

    const handleSaveSignatures = () => {
        const sigA = sigPadA.current.isEmpty()
            ? null
            : sigPadA.current.toDataURL();
        const sigB = sigPadB.current.isEmpty()
            ? null
            : sigPadB.current.toDataURL();
        setSignatureAUrl(sigA);
        setSignatureBUrl(sigB);
        setLocked(true);

        setTimeout(() => {
            const content =
                document.getElementById("contract-content").innerHTML;
            const blob = new Blob([content], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "contract.html";
            link.click();
            setSaved(true);
        }, 100);
    };

    const printPage = () => {
        const sigA = sigPadA.current.isEmpty()
            ? null
            : sigPadA.current.toDataURL();
        const sigB = sigPadB.current.isEmpty()
            ? null
            : sigPadB.current.toDataURL();
        setSignatureAUrl(sigA);
        setSignatureBUrl(sigB);
        setLocked(true);

        setTimeout(() => {
            window.print();
        }, 100);
    };

    const resetSignatures = () => {
        setSignatureAUrl(null);
        setSignatureBUrl(null);
        setLocked(false);
        setSaved(false);
    };

    const { sideBName, sideBInfo } = formData;

    return (
        <div className={styles.container}>
            <div id="contract-content" className={styles.a4}>
                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "20pt",
                        marginBottom: "1rem",
                    }}
                >
                    РЕМОНТЕН ЛИСТ
                </h1>

                <p>
                    Днес,&nbsp;
                    {locked ? (
                        formData.contractDate ? (
                            new Date(formData.contractDate).toLocaleDateString(
                                "bg-BG"
                            )
                        ) : (
                            "___ / ___ / 20__"
                        )
                    ) : (
                        <input
                            type="date"
                            name="contractDate"
                            value={formData.contractDate}
                            onChange={handleChange}
                            style={{
                                border: "1px solid #ccc",
                                padding: "2px 4px",
                            }}
                        />
                    )}
                    , се състави настоящият ремонтен протокол във връзка с
                    възникнала авария на автоматична кафе машина, инсталирана в
                    обект: [име на обекта], в град: [име на града]. Сигналът за
                    аварията е подаден от: [име на лицето].
                </p>

                <hr style={{ margin: "0.5rem 0" }} />
                <div className="repair-container">
                    <h2 className="repair-title">Ремонтен лист</h2>
                    <form className="repair-form">
                        <div className="repair-field">
                            <label htmlFor="issue" className="repair-label">
                                Постъпена авария:
                            </label>
                            <textarea
                                id="issue"
                                placeholder="Опиши постъпилата авария..."
                                className="repair-textarea"
                                required
                            />
                        </div>
                        <div className="repair-field">
                            <label htmlFor="repairs" className="repair-label">
                                Извършени ремонтни дейности:
                            </label>
                            <textarea
                                id="repairs"
                                placeholder="Опиши извършените ремонти дейности..."
                                className="repair-textarea"
                                required
                            />
                        </div>
                        <button type="submit" className="repair-button">
                            Запази
                        </button>
                    </form>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                    }}
                >
                    <div>
                        <p>
                            <strong>За Продавача</strong>
                        </p>
                        <p>
                            <strong>
                                {user.name === "Freakx"
                                    ? "Георги Стойчев"
                                    : user.name}
                            </strong>
                        </p>
                        <p>
                            <strong>Подпис:</strong>
                        </p>
                        {signatureAUrl ? (
                            <img
                                src={signatureAUrl}
                                alt="Подпис А"
                                className={styles.signatureBox}
                            />
                        ) : (
                            <>
                                <SignatureCanvas
                                    penColor="black"
                                    canvasProps={{
                                        width: 300,
                                        height: 100,
                                        className: styles.signatureBox,
                                    }}
                                    ref={sigPadA}
                                />
                                <button
                                    onClick={() => clearSignature(sigPadA)}
                                    style={{
                                        marginTop: "0.5rem",
                                        fontSize: "12px",
                                    }}
                                >
                                    Изчисти подпис
                                </button>
                            </>
                        )}
                    </div>

                    <div>
                        <p>
                            <strong>За Купувача</strong>
                        </p>

                        {locked ? (
                            <p>
                                <strong>{sideBInfo}</strong>
                            </p>
                        ) : (
                            <input
                                type="text"
                                name="sideBInfo"
                                placeholder="Име и Фамилия"
                                value={sideBInfo}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    marginBottom: "0.5rem",
                                }}
                            />
                        )}
                        <p>
                            <strong>Подпис:</strong>
                        </p>
                        {signatureBUrl ? (
                            <img
                                src={signatureBUrl}
                                alt="Подпис Б"
                                className={styles.signatureBox}
                            />
                        ) : (
                            <>
                                <SignatureCanvas
                                    penColor="black"
                                    canvasProps={{
                                        width: 300,
                                        height: 100,
                                        className: styles.signatureBox,
                                    }}
                                    ref={sigPadB}
                                />
                                <button
                                    onClick={() => clearSignature(sigPadB)}
                                    style={{
                                        marginTop: "0.5rem",
                                        fontSize: "12px",
                                    }}
                                >
                                    Изчисти подпис
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button
                        onClick={handleSaveSignatures}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        💾 Запази на устройството
                    </button>
                    <button
                        onClick={printPage}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        🖨️ Разпечатай
                    </button>
                    {(signatureAUrl || signatureBUrl || locked) && (
                        <button
                            onClick={resetSignatures}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                        >
                            ✏️ Редактирай данни и подписи
                        </button>
                    )}
                </div>
                {saved && (
                    <div className={styles.status}>✅ Записан успешно!</div>
                )}
            </div>
        </div>
    );
}
