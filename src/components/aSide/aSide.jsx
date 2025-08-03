import classes from "./aSide.module.css";

export default function ASide({
    listItems,
    title,
    open,
    handleAddBtn,
    openFunction,
}) {
    return (
        <>
            <div className={classes.wrapper}>
                <h2>{title}</h2>
                <div className={classes.btnWrapper}>
                    <button onClick={handleAddBtn}>Добави</button>
                </div>

                <ul>
                    {listItems.map((item, index) => (
                        <li
                            onClick={() => {
                                open();
                                openFunction(item.title, item.id, index);
                            }}
                            key={item.title}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
