import classes from "./Filter.module.css";

import { useMachines } from "../../store/MachineContext";

export default function Filter({}) {
    const { originalMachineList, handleSelectMachine } = useMachines();

    const groupedByBrand = originalMachineList.reduce((acc, item) => {
        if (!acc[item.brand]) {
            acc[item.brand] = new Set();
        }
        acc[item.brand].add(item.model);
        return acc;
    }, {});

    Object.keys(groupedByBrand).forEach((brand) => {
        groupedByBrand[brand] = Array.from(groupedByBrand[brand]);
    });

    const selectFilterItem = (event) => {
        const item = event.target.value;
        handleSelectMachine(item);
    };

    return (
        <div>
            <select className={classes.select} onChange={selectFilterItem}>
                <option value="">Всички машини</option>

                {Object.entries(groupedByBrand).map(([brand, models]) => (
                    <optgroup key={brand} label={brand}>
                        <option value={brand}>{brand} (Всички модели)</option>
                        {models.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
}
