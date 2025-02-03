import classes from "./Filter.module.css";

export default function Filter({ machines }) {
    const groupedByBrand = machines.reduce((acc, item) => {
        if (!acc[item.brand]) {
            acc[item.brand] = new Set();
        }
        acc[item.brand].add(item.model);
        return acc;
    }, {});

    Object.keys(groupedByBrand).forEach((brand) => {
        groupedByBrand[brand] = Array.from(groupedByBrand[brand]);
    });

    console.log(groupedByBrand);

    return (
        <div className={classes.dropDownFilter}>
            <button className={`${classes.menuButton} `}>
                <i className="fa-solid fa-filter"></i>Филтър
            </button>
            <div>
                <div className={classes.listMenu}>
                    <ul>
                        {Object.entries(groupedByBrand).map(
                            ([brand, models]) => (
                                <li key={brand}>
                                    {brand}
                                    <ul className={classes.modelList}>
                                        {models.map((model) => (
                                            <li key={model}> - {model}</li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
