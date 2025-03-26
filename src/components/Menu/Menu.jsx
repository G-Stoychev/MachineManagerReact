import { useEffect, useRef, useState, lazy } from "react";
// import Filter from "./Filter.jsx";
// import ErrorModal from "../ErrorModal/ErrorModal.jsx";
import classes from "./Menu.module.css";

const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));
const Filter = lazy(() => import("./Filter.jsx"));

export default function Menu({
    userInfo,
    logout,
    openModal,
    onSearch,
    onReset,
    openCompanyModal,
    company,
    machines,
    onSelect,
    onSearchBulsat,
}) {
    const searchInput = useRef();
    const inputBulstat = useRef();
    const [searching, setSearching] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(false);
    const errorModal = useRef();
    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    const themeSets = [
        {
            name: "Зима",
            hoverColor: "--winterColor",
            bgImg: " url(/images/winter-bg.jpg)",
        },
        {
            name: "Пролет",
            hoverColor: "--springColor",
            bgImg: " url(/images/spring-bg.jpg)",
        },
        {
            name: "Лято",
            hoverColor: "--summerColor",
            bgImg: " url(/images/summer-bg.jpg)",
        },
        {
            name: "Есен",
            hoverColor: "--autumnColor",
            bgImg: " url(/images/autumn-bg.jpg)",
        },
    ];

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--seasonColor",
            `var(${themeSets[currentIndex].hoverColor})`
        );
        document.body.style.backgroundImage = themeSets[currentIndex].bgImg;
    }, [currentIndex]);

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

    const handleChangeTheme = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % themeSets.length);
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
                <div className={classes.title}>
                    <div>
                        <div className={classes.title}>
                            <h3>{company.name}</h3>
                            <div className={classes.dropdown}>
                                <button
                                    className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropOpenBtn}`}
                                >
                                    <i className="fa-solid fa-gear"></i>
                                </button>
                                <div className={classes.dropDownMenu}>
                                    <button
                                        className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropDownBtn}`}
                                        onClick={openCompanyModal}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        Промени данни за фирма
                                    </button>
                                    <button
                                        className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropDownBtn}`}
                                        onClick={handleChangeTheme}
                                    >
                                        <i className="fa-solid fa-palette"></i>
                                        Смени тема (
                                        {themeSets[currentIndex].name})
                                    </button>
                                    <button
                                        className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropDownBtn}`}
                                        onClick={logout}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        Излез
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p>Здравейте {userInfo.name}</p>
                    </div>
                </div>
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
                        placeholder="Търси партньор по булстат"
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
