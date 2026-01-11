import { useState, useEffect } from "react";

import { getDatabase, ref, onValue } from "firebase/database";
import { changeThema, themeSets } from "../../services/dataService.js";

import ContainerMenu from "./ContainerMenu.jsx";

import classes from "../MainPortal/StickyMenu.module.css";

export default function StickyMenu({
    logout,
    handleReturnHome,
    userInfo,
    company,
    activeComponent,
    closeContainer,
    handleOpenCompanyModal,
    toggleProtocol,
    setActiveDocsContent,
}) {
    const [thema, setTheme] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itsHover, setItsHover] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleChangeTheme = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % themeSets.length;
            const newTheme = themeSets[newIndex];

            setTheme(newTheme);
            changeThema(newTheme, userInfo.name);

            return newIndex;
        });
    };

    return (
        <>
            <div className={classes.menu}>
                <div className={classes.menuContainer}>
                    <div
                        className={
                            isMobile && activeComponent === "container"
                                ? ` ${classes.companyInfo} ${classes.hidden}`
                                : classes.companyInfo
                        }
                    >
                        <span onClick={handleReturnHome}>
                            <i className="fa-solid fa-house"></i>
                            {company.name}
                        </span>
                        <div className={classes.dropdown}>
                            <button
                                className={` ${classes.searchButton} ${classes.dropOpenBtn}`}
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

                    {activeComponent !== "menu" &&
                        activeComponent !== "container" && (
                            <button
                                className={` ${classes.inputsWrapper} ${classes.searchButton}`}
                                onClick={handleReturnHome}
                                onMouseEnter={() => {
                                    setItsHover(true);
                                }}
                                onMouseLeave={() => {
                                    setItsHover(false);
                                }}
                            >
                                {itsHover ? (
                                    <i className="fa-solid fa-house"></i>
                                ) : (
                                    <i className="fa-solid fa-backward"></i>
                                )}
                                Назад
                            </button>
                        )}

                    {activeComponent === "container" && (
                        <>
                            <button
                                className={` ${classes.inputsWrapper} ${classes.searchButton}`}
                                onClick={closeContainer}
                                onMouseEnter={() => {
                                    setItsHover(true);
                                }}
                                onMouseLeave={() => {
                                    setItsHover(false);
                                }}
                            >
                                {itsHover ? (
                                    <i className="fa-solid fa-house"></i>
                                ) : (
                                    <i className="fa-solid fa-backward"></i>
                                )}
                                Назад
                            </button>
                            <ContainerMenu
                                closeContainer={closeContainer}
                                toggleProtocol={toggleProtocol}
                            />
                        </>
                    )}

                    {activeComponent === "documents" && (
                        <>
                            <div className={classes.docsMenu}>
                                <button
                                    className={` ${classes.inputsWrapper} ${classes.searchButton}`}
                                    onClick={() => {
                                        setActiveDocsContent("repairs");
                                    }}
                                >
                                    Ремонти
                                </button>
                                <button
                                    className={` ${classes.inputsWrapper} ${classes.searchButton}`}
                                    onClick={() => {
                                        setActiveDocsContent("movements");
                                    }}
                                >
                                    Движения
                                </button>
                            </div>
                        </>
                    )}

                    <div className={classes.rightWrapper}>
                        <div>
                            <i className="fa-solid fa-user"></i>
                            {userInfo.name}
                        </div>
                        <button
                            onClick={logout}
                            className={` ${classes.inputsWrapper} ${classes.searchButton} ${classes.logoutBtn}`}
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                            Изход
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
