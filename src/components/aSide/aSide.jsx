import classes from "./aSide.module.css";

export default function ASide({ cars, title, toggle, handleAddCar }) {
    return (
        <>
            <div className={classes.wrapper}>
                <h2>{title}</h2>
                <div className={classes.btnWrapper}>
                    <button onClick={handleAddCar}>Добави</button>
                </div>

                <ul>
                    {cars.map((car, index) => (
                        <li
                            onClick={() => {
                                toggle(index);
                            }}
                            key={car.plate}
                        >
                            {car.plate}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
