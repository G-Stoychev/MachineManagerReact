import { useEffect, useState, lazy, useRef } from "react";

const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
import Filter from "../Filter/Filter.jsx";

import classes from "../MainPortal/StickyMenu.module.css";

import { useInput } from "../../store/InputContext.jsx";
import { useMachines } from "../../store/MachineContext.jsx";

export default function ContainerMenu({ toggleProtocol }) {
    const [searching, setSearching] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        serialNumberInput,
        setSerialNumberInput,
        setBulstatNumberInput,
        handleOpenAddItemModal,
    } = useInput();

    const { handleSearchMachine, handleSearchBulstat } = useMachines();
    const [error, setError] = useState(false);
    const errorModal = useRef();

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

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

    const checkForErrors = (input) => {
        if (input === "") {
            setError(true);
            return true;
        }
        return false;
    };

    return (
        <>
            {error && (
                <ErrorModal
                    title="Няма въведен номер !"
                    text={"Моля въвеведете номер в полетоло!"}
                    setError={setError}
                    ref={errorModal}
                />
            )}
            <div className={classes.inputWrapper}>
                <input
                    className={classes.searchInput}
                    name="търсачка"
                    value={serialNumberInput}
                    type="text"
                    title="Въведи сериен номер/булстат"
                    placeholder="Въведи сериен номер/булстат"
                    onChange={(e) => setSerialNumberInput(e.target.value)}
                />
                <div className={classes.dropdown}>
                    {searching ? undefined : (
                        <button
                            className={`  ${classes.searchButton} ${classes.dropOpenBtn}`}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    )}

                    <div className={classes.dropDownMenu}>
                        <button
                            onClick={() => {
                                const hasError =
                                    checkForErrors(serialNumberInput);
                                if (!hasError) {
                                    handleSearchMachine(serialNumberInput);
                                    toggleSearch();
                                }
                            }}
                            className={`${classes.dropSearchBtn}  ${classes.dropDownBtn}`}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            Търси машина
                        </button>

                        <button
                            onClick={() => {
                                const hasError =
                                    checkForErrors(serialNumberInput);
                                if (!hasError) {
                                    handleSearchBulstat(serialNumberInput);
                                    toggleSearch();
                                }
                            }}
                            className={` ${classes.dropSearchBtn} ${classes.dropDownBtn}`}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            Търси фирма
                        </button>
                    </div>
                </div>
                {/* <button
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
                    </button> */}
                {searching && !error ? (
                    <button
                        className={classes.searchButton}
                        onClick={() => {
                            handleSearchMachine(null);
                            toggleSearch();
                        }}
                    >
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                ) : undefined}
            </div>

            <div className={classes.btnWrapper}>
                <button
                    className={classes.hamburgerButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                <div
                    className={`${classes.menuContent} ${
                        isMenuOpen ? classes.showMenu : ""
                    }`}
                >
                    <button
                        className={classes.searchButton}
                        onClick={() => {
                            handleOpenAddItemModal();
                            setIsMenuOpen(false);
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Добави
                    </button>
                    <button
                        className={`${classes.inputsWrapper} ${classes.searchButton}`}
                        onClick={() => {
                            toggleProtocol();
                            setIsMenuOpen(false);
                        }}
                    >
                        <i className="fa-solid fa-pen-to-square"></i> Протокол
                    </button>

                    <div>
                        <Filter />
                    </div>
                </div>
            </div>
        </>
    );
}
