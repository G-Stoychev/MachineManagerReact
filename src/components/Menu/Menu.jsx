import classes from "./Menu.module.css";

export default function Menu() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h3>Coffee Service Burgas LTD</h3>
                <button
                    className={` ${classes.searchInput} ${classes.searchButton} `}
                >
                    edit
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
                    Намери
                </button>
                <button
                    className={`${classes.searchInput} ${classes.searchButton} `}
                >
                    reset
                </button>
            </div>
            <nav>
                <button className={classes.menuButton}>Добави</button>
                <button className={classes.menuButton}>Филтър</button>
            </nav>
        </div>
    );
}
