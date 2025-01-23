import classes from "./Menu.module.css";

export default function Menu() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h3>Coffee Service Burgas LTD</h3>
                <button
                    className={` ${classes.searchInput} ${classes.searchButton} `}
                >
                    <i class="fa-solid fa-pen-to-square"></i>
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
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <button
                    className={`${classes.searchInput} ${classes.searchButton} `}
                >
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
            <nav>
                <button className={classes.menuButton}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    Добави
                </button>
                <button className={classes.menuButton}>Филтър</button>
            </nav>
        </div>
    );
}
