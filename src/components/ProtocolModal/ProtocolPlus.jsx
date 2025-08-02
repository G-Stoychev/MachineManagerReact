import { useState, useEffect, lazy, useRef } from "react";

import SignatureCanvas from "react-signature-canvas";
import html2pdf from "html2pdf.js";

import styles from "../ContractForm/ContractForm.module.css";

import { addMoveData } from "../../services/dataService.js";

const PartnerModal = lazy(() => import("./PartnerModal.jsx"));
const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
const Menu = lazy(() => import("./ProtocolMenu.jsx"));

import classes from "./ProtocolPlus.module.css";
import { useMachines } from "../../store/MachineContext.jsx";

export default function ProtocolPlus({ company, toggleProtocol, user }) {
    const [selectedMachines, setSelectedMachines] = useState([]);
    const inputRef = useRef(null);
    const [addingMachine, setAddingMachine] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState([]);
    const errorModal = useRef();
    const dialog = useRef();
    const [partner, setPartner] = useState([]);
    const [isReturn, setIsReturn] = useState(false);
    const { listOfMachines } = useMachines();

    // singatures
    const sigPadA = useRef();
    const sigPadB = useRef();

    const [signatureAUrl, setSignatureAUrl] = useState(null);
    const [signatureBUrl, setSignatureBUrl] = useState(null);

    const clearSignature = (pad) => {
        pad.current.clear();
    };

    // signatures end

    const handleOpenPratnerModal = () => {
        dialog.current.open();
    };

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    const handleSearchMachine = () => {
        const inputRefNumber = inputRef.current.value.trim();
        if (inputRefNumber === "") {
            setError(true);
            setErrorText({
                title: "Грешка",
                text: "Моля попълнете полето за сериен номер",
            });
            return;
        }

        const foundMachine = listOfMachines.find(
            (m) => m.serialNumber === inputRefNumber.trim()
        );
        if (!foundMachine) {
            setError(true);
            setErrorText({
                title: "Грешка",
                text: "Машина с този сериен номер не съществува",
            });
            return;
        }
        const isSelected = selectedMachines.some(
            (m) => m.serialNumber === foundMachine.serialNumber
        );
        if (isSelected) {
            setError(true);
            setErrorText({
                title: "Грешка",
                text: "Машина с този сериен номер вече е добавена към протокола.",
            });
            return;
        }
        setSelectedMachines((selectedMachines) => [
            ...selectedMachines,
            foundMachine,
        ]);
        inputRef.current.value = null;
    };
    const machinesIds = selectedMachines.map((m) => m.id);

    const handleCreateMove = (newMoveInput) => {
        setPartner(newMoveInput);
    };

    const prepareTableForPDF = () => {
        const table = document.querySelector("#protocol-table");

        if (table) {
            table.style.borderSpacing = "10px 5px";

            table.querySelectorAll("td, th").forEach((cell) => {
                cell.style.padding = "10px";
            });
        }
    };

    function downloadPDF(moveInfo) {
        const element = document.getElementById("contract-content");
        prepareTableForPDF();

        document.body.classList.add("exportMode");

        const opt = {
            margin: 0,
            filename: `Протокол - с ${moveInfo.partner || "Клиент"}.pdf`,
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

    const handOnSaveMovement = async () => {
        if (selectedMachines.length === 0 || partner.length === 0) {
            setError(true);
            setErrorText({
                title: "Грешка",
                text: "Не може да запазите протокол без да въведете данни за машини и клиент",
            });
            return;
        }
        if (isReturn) {
            const newMove = {
                id: Date.now().toString(),
                partner: company.name,
                contact: company.mol,
                bulstat: company.bulstat,
                location: company.adress,
                phone: company.phone,
                object: company.object,
                machineId: machinesIds,
                date: new Date().toISOString().split("T")[0],
            };
            try {
                const savedMove = await addMoveData(newMove);
                downloadPDF();
                toggleProtocol();
            } catch (error) {
                console.error("Грешка при запис на движение:", error);
            }
        } else {
            const newMove = {
                ...partner,
                machineId: machinesIds,
                date: new Date().toISOString().split("T")[0],
            };

            try {
                const savedMove = await addMoveData(newMove);
                downloadPDF(newMove);
                toggleProtocol();
            } catch (error) {
                console.error("Грешка при запис на движение:", error);
            }
        }
    };

    const deleteMachineFromList = (machineID) => {
        setSelectedMachines((prev) => prev.filter((id) => id !== machineID));
    };

    return (
        <>
            <Menu
                closeProtocolmodal={toggleProtocol}
                handleOpenPratnerModal={handleOpenPratnerModal}
                handleSaveNewMove={handOnSaveMovement}
            />
            {error && (
                <ErrorModal
                    title={errorText.title}
                    text={errorText.text}
                    setError={setError}
                    ref={errorModal}
                />
            )}

            <div className={classes.protocolModal}>
                <PartnerModal
                    lastmove={partner}
                    ref={dialog}
                    onCreate={handleCreateMove}
                />
                <div id="contract-content" className={classes.a4}>
                    <h1>Приемо-предавателен Протокол</h1>
                    <div className={classes.section}>
                        <p>Дата: {new Date().toLocaleDateString("en-GB")}</p>
                        <h2>Данни на страните</h2>
                        <div className={classes.partyInfo}>
                            <div className={classes.party}>
                                <h3>Предаваща страна</h3>
                                <p>{company.name}</p>
                                <p>Мол:{company.mol}</p>
                                <p>Адрес:{company.adress}</p>
                                <p>Телефон:{company.phone}</p>
                            </div>

                            <div className={classes.party}>
                                <h3>Приемаща страна</h3>
                                <p>{partner.partner}</p>
                                <p>Мол: {partner.contact}</p>
                                <p>Адрес: {partner.location}</p>
                                <p>Телефон: {partner.phone}</p>
                            </div>
                        </div>

                        <div>
                            <div className={classes.headerWrapper}>
                                <h2>Данни за предадената машина</h2>
                                <button
                                    onClick={() => {
                                        setIsReturn(!isReturn);
                                    }}
                                >
                                    {isReturn ? "Демонтаж" : " Mонтаж"}
                                </button>
                            </div>

                            <table id={"protocol-table"}>
                                <thead>
                                    <tr>
                                        <th>Модел</th>
                                        <th>Марка</th>
                                        <th>Сериен номер</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedMachines.map((machine) => (
                                        <tr key={machine.id}>
                                            <td>{machine.model}</td>
                                            <td>{machine.brand}</td>
                                            <td>{machine.serialNumber}</td>
                                            <td>
                                                <p>
                                                    {isReturn
                                                        ? "Демонтаж"
                                                        : " Mонтаж"}
                                                </p>
                                                <button
                                                    title="Изтрий машината"
                                                    className={
                                                        classes.machineDelBtn
                                                    }
                                                    onClick={() => {
                                                        deleteMachineFromList(
                                                            machine
                                                        );
                                                    }}
                                                >
                                                    x
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={classes.addingContainer}>
                                <button
                                    onClick={() => {
                                        setAddingMachine(!addingMachine);
                                    }}
                                >
                                    +
                                </button>
                                {addingMachine && (
                                    <div className={classes.inputWrapper}>
                                        <input
                                            type="number"
                                            placeholder="Въведете сериен номер"
                                            ref={inputRef}
                                        ></input>
                                        <button onClick={handleSearchMachine}>
                                            Добави
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={classes.signaturesSection}>
                            <h2>Подписи</h2>
                            <div className={classes.signatures}>
                                <div>
                                    <p>Подпис на приемащата страна:</p>
                                    {user.name === "Freakx" ? (
                                        <p>Георги Стойчев</p>
                                    ) : (
                                        <p>{user.name}</p>
                                    )}

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
                                                    id: "signatureBox",
                                                    className:
                                                        styles.signatureBox,
                                                }}
                                                ref={sigPadA}
                                            />
                                            <button
                                                className={`     exportHide`}
                                                onClick={() =>
                                                    clearSignature(sigPadA)
                                                }
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
                                    <p>Подпис на приемащата страна:</p>
                                    <p>{partner.contact}</p>

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
                                                    id: "signatureBox",
                                                    className:
                                                        styles.signatureBox,
                                                }}
                                                ref={sigPadB}
                                            />
                                            <button
                                                className={` exportHide`}
                                                onClick={() =>
                                                    clearSignature(sigPadB)
                                                }
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
                            <button
                                className={classes.printButton}
                                onClick={() => window.print()}
                            >
                                Принтирай протокола
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
