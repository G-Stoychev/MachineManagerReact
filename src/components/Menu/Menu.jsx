import { useRef } from "react";

import AddItemModal from "../AddItemModal/AddItemModal.jsx";

import classes from "./Menu.module.css";

export default function Menu({ userName, logout }) {
    const dialog = useRef();

    function handleOpenAddItemModal() {
        dialog.current.open();
    }
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
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
            <div className={classes.searchContainer}>
                <input
                    className={classes.searchInput}
                    type="text"
                    placeholder="Въведи сериен номер"
                />
                <button
                    className={`${classes.searchInput} ${classes.searchButton}`}
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <button
                    className={`${classes.searchInput} ${classes.searchButton} `}
                >
                    <i className="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
            <nav>
                <button
                    className={classes.menuButton}
                    onClick={handleOpenAddItemModal}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                    Добави
                </button>
                <button className={classes.menuButton}>Филтър</button>
            </nav>
            <AddItemModal ref={dialog} />
        </div>
    );
}
