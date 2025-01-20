import Menu from "../components/Menu.jsx";
import MachineList from "./MachineList.jsx";
import Table from "./Table.jsx";

export default function Container() {
    return (
        <div className="container">
            <Menu />
            <MachineList />
        </div>
    );
}
