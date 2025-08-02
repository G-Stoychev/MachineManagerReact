import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import SignatureCanvas from "react-signature-canvas";
import styles from "../RepairList/RepairList.module.css";

export default function RepairList({ company, user }) {
    const sigPadA = useRef();
    const sigPadB = useRef();

    const [signatureAUrl, setSignatureAUrl] = useState(null);
    const [signatureBUrl, setSignatureBUrl] = useState(null);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        names: "",
        obeject: "",
        partner: "",
        repairDate: "",
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

    // const handleSaveSignatures = () => {
    //     const sigA = sigPadA.current.isEmpty()
    //         ? null
    //         : sigPadA.current.toDataURL();
    //     const sigB = sigPadB.current.isEmpty()
    //         ? null
    //         : sigPadB.current.toDataURL();
    //     setSignatureAUrl(sigA);
    //     setSignatureBUrl(sigB);
    //     setLocked(true);

    //     setTimeout(() => {
    //         const content =
    //             document.getElementById("contract-content").innerHTML;
    //         const blob = new Blob([content], { type: "text/html" });
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         link.download = "contract.html";
    //         link.click();
    //         setSaved(true);
    //     }, 100);
    // };

    function downloadPDF() {
        const element = document.getElementById("contract-content");

        document.body.classList.add("exportMode");

        const opt = {
            margin: 0,
            filename: `Договор - ${formData.sideBName || "Клиент"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        setTimeout(() => {
            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {
                    document.body.classList.remove("exportMode");
                });
        }, 100);
    }

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
                        formData.repairDate ? (
                            new Date(formData.repairDate).toLocaleDateString(
                                "bg-BG"
                            )
                        ) : (
                            "___ / ___ / 20__"
                        )
                    ) : (
                        <input
                            type="date"
                            name="repairDate"
                            value={formData.repairDate}
                            onChange={handleChange}
                        />
                    )}
                    ,
                </p>
                <p>
                    се състави настоящият ремонтен протокол във връзка с
                    възникнала авария на кафе машина, инсталирана при:
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Име на Фирма"
                        name="partner"
                        value={formData.partner}
                        onChange={handleChange}
                        className={styles.reapairInputs}
                    />
                    ,
                </p>
                <p>
                    на обект
                    <input
                        type="text"
                        placeholder="Име на обект"
                        name="obeject"
                        value={formData.obeject}
                        onChange={handleChange}
                        className={styles.reapairInputs}
                    />
                    .
                </p>
                <p>
                    Сигналът за аварията е подаден от:
                    <input
                        type="text"
                        placeholder="Име и Фамилия"
                        name="names"
                        value={formData.names}
                        onChange={handleChange}
                        className={styles.reapairInputs}
                    />
                    .
                </p>

                <hr style={{ margin: "0.5rem 0" }} />
                <div className={styles.repairContainer}>
                    <form className={styles.repairForm}>
                        <div className={styles.repairField}>
                            <label
                                htmlFor="issue"
                                className={styles.repairLabel}
                            >
                                Постъпена авария:
                            </label>
                            <textarea
                                id="issue"
                                placeholder="Опиши постъпилата авария..."
                                className={styles.repairTextarea}
                                required
                            />
                        </div>
                        <div className={styles.repairField}>
                            <label
                                htmlFor="repairs"
                                className={styles.repairLabel}
                            >
                                Извършени ремонтни дейности:
                            </label>
                            <textarea
                                id="repairs"
                                placeholder="Опиши извършените ремонти дейности..."
                                className={styles.repairTextarea}
                                required
                            />
                        </div>
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
                            <strong>За {company.name}</strong>
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
                                    className={` exportHide`}
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
                            <strong>
                                За{" "}
                                {formData.partner ? formData.partner : "Клиент"}
                            </strong>
                        </p>

                        <p>
                            {formData.names ? (
                                <strong>{formData.names}</strong>
                            ) : (
                                <strong> Име и Фамилия</strong>
                            )}
                        </p>

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
                                    className={` exportHide`}
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

                <div className={`${styles.buttons} exportHide`}>
                    <button
                        onClick={downloadPDF}
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
