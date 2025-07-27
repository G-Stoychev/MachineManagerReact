import classes from "../MainPortal/MainPortal.module.css";

import MenuCard from "./MenuCard.jsx";

export default function PortalMenu({
    toggleCars,
    toggleContainer,
    toggleProtocol,
}) {
    return (
        <>
            <div className={classes.wrapper}>
                <MenuCard
                    text={"Machines"}
                    image={<i className="fa-solid fa-hard-drive"></i>}
                    click={toggleContainer}
                />
                <MenuCard
                    text={"Protocol"}
                    image={<i className="fa-solid fa-file-invoice"></i>}
                    click={toggleProtocol}
                />
                <MenuCard
                    text={"Contract"}
                    image={<i className="fa-solid fa-file-signature"></i>}
                    click={toggleProtocol}
                />
                <MenuCard
                    text={"Cars"}
                    image={<i className="fa-solid fa-car-side"></i>}
                    click={toggleCars}
                />
                <MenuCard
                    text={"Organizer Coming SOON"}
                    image={<i className="fa-solid fa-calendar-days"></i>}
                />
            </div>
        </>
    );
}
