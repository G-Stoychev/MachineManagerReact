import { useEffect, useRef, useState } from "react";
import Filter from "./Filter.jsx";
import Test from "./Test.jsx";
import classes from "./Menu.module.css";

export default function Menu({
    userName,
    logout,
    openModal,
    onSearch,
    onReset,
    openCompanyModal,
    company,
    machines,
}) {
    const searchInput = useRef();
    const [searching, setSearching] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const themeSets = [
        {
            name: "Winter",
            hoverColor: "--winterColor",
            bgImg: " url(/src/assets/winter-bg.jpg)",
        },
        {
            name: "Spring",
            hoverColor: "--springColor",
            bgImg: " url(/src/assets/spring-bg.jpg)",
        },
        {
            name: "Summer",
            hoverColor: "--summerColor",
            bgImg: " url(/src/assets/summer-bg.jpg)",
        },
        {
            name: "Autumn",
            hoverColor: "--autumnColor",
            bgImg: " url(/src/assets/autumn-bg.jpg)",
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
            alert("Няма въведен номер");
            return;
        }
        setSearching(true);
        onSearch(inputSerialNumber);
    };

    const handleResetInput = () => {
        searchInput.current.value = "";
        onReset();
        setSearching(false);
    };

    const handleChangeTheme = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % themeSets.length);
    };

    const handleFilterSelect = (selectedItem) => {};

    return (
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
                                    Смени тема ({themeSets[currentIndex].name})
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
                    <p>Welcome {userName}</p>
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
                    <Filter machines={machines} onSelect={handleFilterSelect} />
                </div>
                {/* <button className={classes.menuButton}>Филтър</button> */}
            </nav>
        </div>
    );
}
