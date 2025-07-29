import { useEffect, useRef, useState } from "react";

import classes from "../MainPortal/StickyMenu.module.css";

import { useInput } from "../../store/InputContext.jsx";
import { useMachines } from "../../store/MachineContext.jsx";

export default function ContainerMenu({ toggleProtocol }) {
    const [searching, setSearching] = useState(false);

    const {
        serialNumberInput,
        setSerialNumberInput,
        bulstatNumberInput,
        setBulstatNumberInput,
    } = useInput();

    const { handleSearchMachine, handleSearchBulstat } = useMachines();

    // const toggleSearch = () => {
    //     setSearching((prev) => (prev === true ? false : true));
    // };
    const toggleSearch = () => {
        setSearching((prev) => !prev);
    };

    useEffect(() => {
        if (!searching) {
            setSerialNumberInput("");
            setBulstatNumberInput("");
        }
    }, [searching]);

    return (
        <>
            <div className={classes.inputsWrapper}>
                <div className={classes.inputWrapper}>
                    <input
                        value={serialNumberInput}
                        type="text"
                        placeholder="Въведи сериен номер/булстат на фирма"
                        onChange={(e) => setSerialNumberInput(e.target.value)}
                    />
                    <button
                        className={classes.searchButton}
                        onClick={() => {
                            handleSearchMachine(serialNumberInput);
                            toggleSearch();
                        }}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <button
                        className={classes.searchButton}
                        onClick={() => {
                            handleSearchBulstat(serialNumberInput);
                            toggleSearch();
                        }}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    {searching ? (
                        <button
                            onClick={() => {
                                handleSearchMachine(null);
                                toggleSearch();
                            }}
                        >
                            <i className="fa-solid fa-arrows-rotate"></i>
                        </button>
                    ) : undefined}
                </div>
            </div>

            <div onClick={toggleProtocol}>
                <i className="fa-solid fa-pen-to-square"></i> Протокол
            </div>
            <button
                className={classes.searchButton}
                onClick={() => {
                    openModal();
                }}
            >
                <i className="fa-solid fa-pen-to-square"></i>
                Добави
            </button>
            <div>
                {/* <Filter
                    machines={machines}
                    onSelect={onSelect}
                    onReset={onReset}
                /> */}
            </div>
        </>
    );
}
