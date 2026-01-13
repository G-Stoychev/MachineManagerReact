import { useInput } from "../../store/InputContext.jsx";

import ComponentCard from "./ComponentCard.jsx";

export default function PortalMenu({
    toggleCars,
    toggleContainer,
    toggleProtocol,
    handleToggleContract,
    handleToggleRepairList,
    handleToggleOrganizer,
    toggleSales,
    toggleDocuments,
}) {
    const openOrganizer = () => {
        handleToggleOrganizer();
        setASideIsOpen(true);
    };

    return (
        <>
            <div>
                <button onClick={toggleSales}>Продажба</button>
                <button onClick={toggleProtocol}>Протокол</button>
                <button onClick={toggleSales}>Продажба</button>
                <button onClick={toggleSales}>Продажба</button>
            </div>
        </>
    );
}
