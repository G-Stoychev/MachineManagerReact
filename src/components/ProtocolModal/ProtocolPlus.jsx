import { useState, useEffect, lazy, useRef } from "react";

import { getDatabase, ref, onValue } from "firebase/database";
import { addMoveData } from "../../services/dataService.js";

const PartnerSection = lazy(() => import("./PartnerSection.jsx"));
const PartnerModal = lazy(() => import("./PartnerModal.jsx"));
const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
const Menu = lazy(() => import("./ProtocolMenu.jsx"));
import classes from "./ProtocolPlus.module.css";

export default function ProtocolPlus({ company, toggleProtocol }) {
    const [listOfMachines, setListOfMachines] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const inputRef = useRef(null);
    const [addingMachine, setAddingMachine] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState([]);
    const errorModal = useRef();
    const dialog = useRef();
    const [partner, setPartner] = useState([]);
    const [isReturn, setIsReturn] = useState(false);

    const handleOpenPratnerModal = () => {
        dialog.current.open();
    };

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useEffect(() => {
        const database = getDatabase();
        const machinesRef = ref(database, "machines");
        const unsubscribe = onValue(
            machinesRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const machinesArray = Object.values(data);
                    setListOfMachines(machinesArray);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

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
            {error && (
                <ErrorModal
                    title={errorText.title}
                    text={errorText.text}
                    setError={setError}
                    ref={errorModal}
                />
            )}

            <div className={classes.protocolModal}>
                <Menu
                    closeProtocolmodal={toggleProtocol}
                    handleOpenPratnerModal={handleOpenPratnerModal}
                    handleSaveNewMove={handOnSaveMovement}
                />
                <PartnerModal
                    lastmove={partner}
                    ref={dialog}
                    onCreate={handleCreateMove}
                />
                <div>
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
                                        console.log(partner);
                                        console.log(company);
                                    }}
                                >
                                    {isReturn ? "Демонтаж" : " Mонтаж"}
                                </button>
                            </div>

                            <table>
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
                                    <select className={classes.employee}>
                                        <option>Георги Стойчев</option>
                                        <option>Красимир Тюлиев</option>
                                    </select>
                                    <p>Подпис на предаващата страна:</p>
                                    <p>____________________________</p>
                                </div>
                                <div>
                                    <p>{partner.contact}</p>
                                    <p>Подпис на приемащата страна:</p>
                                    <p>____________________________</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className={classes.printButton}
                    onClick={() => window.print()}
                >
                    Принтирай протокола
                </button>
            </div>
        </>
    );
}
