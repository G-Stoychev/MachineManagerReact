import { useState } from "react";

import ASide from "../aSide/aSide";
import CarData from "./CarData";

export default function CarsComponent({ cars }) {
    const [openCarInfo, setOpenCarInfo] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openCarInformation = (index) => {
        setOpenCarInfo(!openCarInfo);
        setSelectedIndex(index);
    };
    return (
        <div>
            <ASide
                toggle={openCarInformation}
                cars={cars}
                title={"Aвтомобили"}
            />
            {openCarInfo && (
                <CarData
                    cars={cars}
                    index={selectedIndex}
                    toggle={openCarInformation}
                />
            )}
        </div>
    );
}
