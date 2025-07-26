import classes from "../MainPortal/MainPortal.module.css";

export default function MenuCard({ click, text, image }) {
    return (
        <>
            <div className={classes.card} onClick={click}>
                <div className={classes.cardImg}>{image}</div>
                <p className={classes.cardText}>{text}</p>
            </div>
        </>
    );
}
