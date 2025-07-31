import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import SignatureCanvas from "react-signature-canvas";
import styles from "./ContractForm.module.css";

export default function ContractForm({ company, user }) {
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

    // const handleSaveSignatures = async () => {
    //     const sigA = sigPadA.current.isEmpty()
    //         ? null
    //         : sigPadA.current.toDataURL();
    //     const sigB = sigPadB.current.isEmpty()
    //         ? null
    //         : sigPadB.current.toDataURL();
    //     setSignatureAUrl(sigA);
    //     setSignatureBUrl(sigB);
    //     setLocked(true);
    //     setPreservation(true);

    //     await new Promise((resolve) => setTimeout(resolve, 300));

    //     const content = document.getElementById("contract-content").innerHTML;
    //     const blob = new Blob([content], { type: "text/html" });
    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(blob);
    //     link.download = `Договор - ${formData.sideBName || "без_име"}.html`;
    //     link.click();

    //     setPreservation(false);
    //     setSaved(true);
    // };

    function downloadPDF() {
        const element = document.getElementById("contract-content");

        // Махаме бутоните временно
        document.body.classList.add("exportMode");

        const opt = {
            margin: 0,
            filename: `Договор - ${formData.sideBName || "Клиент"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Изчакваме 100ms, за да се обновят стиловете
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

    const { sideAName, sideBName, sideAInfo, sideBInfo } = formData;

    return (
        <div className={styles.container}>
            <div id="contract-content" className={`${styles.a4} `}>
                <h1>ДОГОВОР ЗА ПОКУПКО-ПРОДАЖБА</h1>

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
                    &nbsp;г., между:
                </p>
                <>
                    <p style={{ margin: "1rem 0" }}>
                        <strong>
                            {company.name} с ЕИК : {company.bulstat} наричан
                            накратко Продавач , от една страна
                        </strong>
                    </p>
                </>
                <p style={{ margin: "0.5rem 0" }}>
                    <strong> и </strong>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                    <strong> от друга страна </strong>
                </p>

                {locked ? (
                    <>
                        <p>
                            <strong> {sideBName}</strong>
                        </p>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="sideBName"
                            placeholder="Информация за фирмата "
                            value={sideBName}
                            onChange={handleChange}
                            style={{ width: "100%", marginBottom: "0.5rem" }}
                        />

                        <p>
                            <strong>наричан накратко Купувач</strong>
                        </p>
                    </>
                )}

                <hr style={{ margin: "0.5rem 0" }} />

                <h3 style={{ margin: "1rem 0" }}>Чл. 1. Предмет на договора</h3>
                <p>
                    1.1. {sideAName || "Продавачът"} предоставя на{" "}
                    {sideBName || "Купувача"} автоматична кафе машина за
                    временно ползване безвъзмездно.
                </p>
                <p>
                    1.2. {sideBName || "Купувачът"} се задължава да закупува
                    **изключително и само от {sideAName || "Продавача"}**
                    следните стоки:
                    <ul style={{ paddingLeft: "2rem" }}>
                        <li>
                            кафе (на зърна или капсули зависи от предоставената
                            машина)
                        </li>{" "}
                        <li>
                            кафе продукти (Лате , Шоколад или 3в1 зависи от
                            предоставената машина)
                        </li>
                        <li>консумативи. (чаши, бъркалки , захар )</li>
                    </ul>
                </p>

                <h3>Чл. 2. Срок на договора</h3>
                <p>
                    Настоящият договор се сключва за срок от{" "}
                    <select
                        name="contractOption"
                        id="contractOption"
                        value={formData.contractOption}
                        onChange={handleChange}
                    >
                        <option value="eдна (1) година">eдна (1) година</option>
                        <option value="две (2) година">две (2) година</option>
                        <option value="три (3) година">три (3) година</option>
                        <option value="шест (6) месеца">шест (6) месеца</option>
                    </select>{" "}
                    година, считано от датата на подписването му.
                </p>

                <h3>Чл. 3. Задължения на Купувача</h3>
                <ul>
                    <li>
                        Да използва машината само с продукти, закупени от{" "}
                        {sideAName || "Продавача"}.
                    </li>
                    <li>Да не преотстъпва или прехвърля машината.</li>
                    <li>Да се грижи за правилната експлоатация.</li>
                </ul>

                <h3>Чл. 4. Задължения на Продавача</h3>
                <ul>
                    <li>Да доставя кафе и консумативи при заявка.</li>
                    <li>Да поддържа и обслужва машината.</li>
                </ul>

                <h3>Чл. 5. Други условия</h3>
                <ul>
                    <li>Промени се правят само в писмен вид.</li>
                    <li>
                        Договорът може да бъде прекратен с 30-дневно
                        предизвестие.
                    </li>
                    <li>
                        При неспазване на условията от страна на Купувача,
                        Продавачът си запазва правото да прекрати договора
                        едностранно и да изземе предоставената кафе машина без
                        необходимост от съдебно решение.
                    </li>
                    <li>
                        Неуредените въпроси се уреждат от българското
                        законодателство.
                    </li>
                </ul>

                <br />
                <p>
                    Договорът се състави в два еднакви екземпляра – по един за
                    всяка страна.
                </p>

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
                                    className={`     exportHide`}
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
                        <i className="fa-solid fa-floppy-disk"></i> Запази на
                        устройството
                    </button>
                    <button
                        onClick={printPage}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        <i className="fa-solid fa-print"></i> Разпечатай
                    </button>
                    {(signatureAUrl || signatureBUrl || locked) && (
                        <button
                            onClick={resetSignatures}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                        >
                            <i className="fa-solid fa-pencil"></i> Редактирай
                            данни и подписи
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
