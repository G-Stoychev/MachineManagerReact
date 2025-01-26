import { useRef } from "react";

import classes from "./Menu.module.css";

export default function Menu({
    userName,
    logout,
    openModal,
    onFilter,
    onReset,
    openCompanyModal,
}) {
    const searchInput = useRef();

    const handleSearchInput = () => {
        const inputSerialNumber = searchInput.current.value;
        onFilter(inputSerialNumber);
    };

    const handleResetInput = () => {
        searchInput.current.value = "";
        onReset();
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <div>
                    <h3>Coffee Service Burgas LTD</h3>
                    <p>
                        Welcome {userName}{" "}
                        <button className={classes.logoutBtn} onClick={logout}>
                            Logout
                        </button>
                    </p>
                </div>
                <button
                    className={` ${classes.searchInput} ${classes.searchButton} `}
                    onClick={openCompanyModal}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
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
                <button
                    className={`${classes.searchInput} ${classes.searchButton} `}
                    onClick={handleResetInput}
                >
                    <i className="fa-solid fa-arrows-rotate"></i>
                </button>
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
                <button className={classes.menuButton}>Филтър</button>
            </nav>
        </div>
    );
}
