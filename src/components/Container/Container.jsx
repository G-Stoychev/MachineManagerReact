import Menu from "../Menu/Menu.jsx";
import MachineTable from "../MachineTable/MachineTable.jsx";

import classes from "./Container.module.css";

export default function Container({ userName, logout }) {
    return (
        <div className={classes.container}>
            <Menu userName={userName} logout={logout} />
            <MachineTable />
        </div>
    );
}
