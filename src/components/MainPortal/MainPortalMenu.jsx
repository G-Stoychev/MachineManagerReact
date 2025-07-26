import classes from "../MainPortal/MainPortal.module.css";

import MenuCard from "./MenuCard.jsx";

export default function PortalMenu({ openCars, openContainer, logout }) {
    return (
        <>
            <div className={classes.wrapper}>
                <MenuCard
                    text={"Cars"}
                    image={<i class="fa-solid fa-car-side"></i>}
                    click={openCars}
                />

                <MenuCard
                    text={"Machines"}
                    image={<i class="fa-solid fa-hard-drive"></i>}
                    click={openContainer}
                />
                <MenuCard
                    text={"Logout"}
                    image={<i class="fa-solid fa-arrow-right-from-bracket"></i>}
                    click={logout}
                />
            </div>
        </>
    );
}
