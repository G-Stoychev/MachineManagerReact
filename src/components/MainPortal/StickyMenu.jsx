import { useRef, useState, useEffect } from "react";

import { getDatabase, ref, onValue } from "firebase/database";
import { changeThema, themeSets } from "../../services/dataService.js";

import classes from "../MainPortal/StickyMenu.module.css";

export default function StickyMenu({
    logout,
    handleReturnHome,
    userInfo,
    company,
    activeComponent,
    setSelectedComponent,
    closeContainer,
    handleOpenCompanyModal,
    toggleProtocol,
}) {
    const [thema, setTheme] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const database = getDatabase();
        const userRef = ref(database, `thema/` + userInfo.name);

        const unsubscribe = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setTheme((prevTheme) => {
                    return JSON.stringify(prevTheme) === JSON.stringify(data)
                        ? prevTheme
                        : data;
                });
            }
        });

        return () => unsubscribe();
    }, [userInfo.name]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--seasonColor",
            `var(${thema.hoverColor})`
        );
        document.body.style.backgroundImage = thema.bgImg;
    }, [thema]);

    const handleChangeTheme = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % themeSets.length;
            const newTheme = themeSets[newIndex];

            setTheme(newTheme);
            changeThema(newTheme, userInfo.name);

            return newIndex;
        });
    };

    const handleToogleProtocol = () => {
        setSelectedComponent((prev) =>
            prev === "protocol" ? "container" : "protocol"
        );
    };

    return (
        <>
            <div className={classes.menu}>
                <div className={classes.menuContainer}>
                    <div className={classes.topContactBar}>
                        <span onClick={handleReturnHome}>
                            <i className="fa-solid fa-house"></i>
                            {company.name}
                        </span>
                        <div className={classes.dropdown}>
                            <button
                                className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropOpenBtn}`}
                            >
                                <i className="fa-solid fa-gear"></i>
                            </button>
                            <div className={classes.dropDownMenu}>
                                <button
                                    className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropDownBtn}`}
                                    onClick={handleOpenCompanyModal}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Промени данни за фирма
                                </button>

                                <button
                                    className={` ${classes.searchInput} ${classes.searchButton} ${classes.dropDownBtn}`}
                                    onClick={handleChangeTheme}
                                >
                                    <i className="fa-solid fa-palette"></i>
                                    Смени тема ({thema.name})
                                </button>
                            </div>
                        </div>
                    </div>

                    {activeComponent === "container" && (
                        <>
                            {" "}
                            <span onClick={closeContainer}>
                                <i className="fa-solid fa-backward"></i> Back
                            </span>
                            <div>Machines MENU</div>
                            <div onClick={toggleProtocol}>
                                <i className="fa-solid fa-pen-to-square"></i>{" "}
                                Протокол
                            </div>
                        </>
                    )}

                    <div className={classes.rightWrapper}>
                        <div>
                            <i className="fa-solid fa-user"></i>
                            {userInfo.name}
                        </div>
                        <button onClick={logout} className={classes.logoutBtn}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
