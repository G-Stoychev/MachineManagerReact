import classes from "../MainPortal/StickyMenu.module.css";

export default function StickyMenu({ logout, handleReturnHome }) {
    return (
        <>
            <div className={classes.menu}>
                <div className={classes.menuContainer}>
                    <div className={classes.topContactBar}>
                        <span onClick={handleReturnHome}>
                            <i classn="fa-solid fa-house"></i>
                            Кофи Сървис Бургас ООД
                        </span>
                    </div>
                    <div className={classes.rightWrapper}>
                        <div>Георги Стойчев</div>
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
