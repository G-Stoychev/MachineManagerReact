import { useInput } from "../../store/InputContext.jsx";
import classes from "../MainPortal/MainPortal.module.css";

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
    const { setASideIsOpen } = useInput();
    const openOrganizer = () => {
        handleToggleOrganizer();
        setASideIsOpen(true);
    };

    return (
        <>
            <div className={classes.wrapper}>
                <ComponentCard
                    text={"Продажби"}
                    image={<i className="fa-solid fa-sack-dollar"></i>}
                    click={toggleSales}
                />
                <ComponentCard
                    text={"Машини"}
                    image={<i className="fa-solid fa-hard-drive"></i>}
                    click={toggleContainer}
                />
                <ComponentCard
                    text={"Коли"}
                    image={<i className="fa-solid fa-car-side"></i>}
                    click={toggleCars}
                />
                <ComponentCard
                    text={"Органайзер"}
                    image={<i className="fa-solid fa-calendar-days"></i>}
                    click={openOrganizer}
                />
                <ComponentCard
                    text={"Протокол"}
                    image={<i className="fa-solid fa-file-invoice"></i>}
                    click={toggleProtocol}
                />
                <ComponentCard
                    text={"Ремонтен лист"}
                    image={<i className="fa-solid fa-sheet-plastic"></i>}
                    click={handleToggleRepairList}
                />
                <ComponentCard
                    text={"Договор"}
                    image={<i className="fa-solid fa-file-signature"></i>}
                    click={handleToggleContract}
                />

                <ComponentCard
                    text={"Последни документи"}
                    image={<i className="fa-solid fa-folder"></i>}
                    click={toggleDocuments}
                />
            </div>
        </>
    );
}
