import { useEffect, useRef, useState, lazy } from "react";
import classes from "./Menu.module.css";

const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
const Filter = lazy(() => import("./Filter.jsx"));

export default function Menu({
    openModal,
    onSearch,
    onReset,
    machines,
    onSelect,
    onSearchBulsat,
    toggleProtocol,
}) {
    const searchInput = useRef();
    const inputBulstat = useRef();
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(false);
    const errorModal = useRef();

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    const handleSearchInput = () => {
        const inputSerialNumber = searchInput.current.value;
        if (inputSerialNumber === "") {
            setError(true);
            return;
        }
        setSearching(true);
        onSearch(inputSerialNumber);
    };

    const handleSearchBulstat = () => {
        const inputBulstatValues = inputBulstat.current.value;
        if (inputBulstatValues === "") {
            setError(true);
            return;
        }
        setSearching(true);
        onSearchBulsat(inputBulstatValues);
    };

    const handleResetInput = () => {
        searchInput.current.value = "";
        onReset();
        setSearching(false);
    };

    const handleBulstatInput = () => {
        inputBulstat.current.value = "";
        onReset();
        setSearching(false);
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
            <div className={classes.container}>
                <div className={classes.title}></div>
                <div className={classes.searchContainer}>
                    <input
                        className={classes.searchInput}
                        type="text"
                        placeholder="Въведи сериен номер"
                        ref={searchInput}
                    />
                    <button
                        className={`${classes.searchInput} ${classes.searchButton}`}
                        onClick={handleSearchInput}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    {searching ? (
                        <button
                            className={`${classes.searchInput} ${classes.searchButton} `}
                            onClick={handleResetInput}
                        >
                            <i className="fa-solid fa-arrows-rotate"></i>
                        </button>
                    ) : undefined}
                </div>
                {/* inputBulstat търсени по булстат */}
                <div className={classes.searchContainer}>
                    <input
                        className={classes.searchInput}
                        type="text"
                        placeholder="Търси фирма по булстат"
                        ref={inputBulstat}
                    />
                    <button
                        className={`${classes.searchInput} ${classes.searchButton}`}
                        onClick={handleSearchBulstat}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    {searching ? (
                        <button
                            className={`${classes.searchInput} ${classes.searchButton} `}
                            onClick={handleBulstatInput}
                        >
                            <i className="fa-solid fa-arrows-rotate"></i>
                        </button>
                    ) : undefined}
                </div>
                <nav>
                    <button
                        className={classes.menuButton}
                        onClick={() => {
                            openModal();
                        }}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                        Добави
                    </button>
                    <div>
                        <Filter
                            machines={machines}
                            onSelect={onSelect}
                            onReset={onReset}
                        />
                    </div>
                    {/* <button className={classes.menuButton}>Филтър</button> */}
                </nav>
            </div>
        </>
    );
}
