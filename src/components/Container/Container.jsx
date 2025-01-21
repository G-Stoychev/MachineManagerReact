import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";

import classes from "./Container.module.css";

export default function Container() {
    return (
        <div className={classes.container}>
            <Menu />
            <MachineTable />
        </div>
    );
}
