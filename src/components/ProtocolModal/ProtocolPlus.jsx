import { useState, useEffect, lazy, useRef } from "react";

import { getDatabase, ref, onValue } from "firebase/database";

const PartnerSection = lazy(() => import("./PartnerSection.jsx"));
const PartnerModal = lazy(() => import("./PartnerModal.jsx"));
const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
const Menu = lazy(() => import("./ProtocolMenu.jsx"));
import classes from "./ProtocolPlus.module.css";

export default function ProtocolPlus({ company, toggleProtocol }) {
    const [listOfMachines, setListOfMachines] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [inputSerialNumber, setInputSerialNumber] = useState();
    const [addingMachine, setAddingMachine] = useState(false);
    const [error, setError] = useState(false);
    const errorModal = useRef();

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
        if (inputSerialNumber.trim() === "") {
            setError(true);
            return;
        }

        const findedMachine = listOfMachines.filter(
            (m) => m.serialNumber === inputSerialNumber.trim()
        );
        if (findedMachine.length === 0) {
            setError(true);
        }
        setSelectedMachines(findedMachine);
    };

    return (
        <>
            {error && (
                <ErrorModal
                    title="Няма такава машина!"
                    text={
                        "Въведиения сериен номер е грешен или машина с този номер не съществува"
                    }
                    setError={setError}
                    ref={errorModal}
                />
            )}

            <div className={classes.protocolModal}>
                <Menu closeProtocolmodal={toggleProtocol} />
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
                                <p>Ime</p>
                                <p>Мол: </p>
                                <p>Адрес: </p>
                                <p>Телефон: </p>
                            </div>
                        </div>

                        <div className={classes.section}>
                            <h2>Данни за предадената машина</h2>
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
                                                <select
                                                    className={
                                                        classes.movementInfo
                                                    }
                                                >
                                                    <option>Монтаж</option>
                                                    <option>Демонтаж</option>
                                                </select>
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
                                            onChange={(e) =>
                                                setInputSerialNumber(
                                                    e.target.value
                                                )
                                            }
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
                                    <p>Ime i familia</p>
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
