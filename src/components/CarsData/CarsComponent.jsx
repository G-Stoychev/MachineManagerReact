import { useState } from "react";

import ASide from "../aSide/aSide";
import CarData from "./CarData";

export default function CarsComponent({ cars, handleAddCar }) {
    const [openCarInfo, setOpenCarInfo] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [carsRepairs, setCarsRepairs] = useState([
        {
            carPlate: "А4831НТ",
            repairDate: "08.08.2025",
            service: "Д Авто",
            kmOnRepair: "156000",
            repairInfo: "Смяна накладки и  ремонт климатик",
            kmOnNextRepair: "166000",
        },
    ]);
    const [carRepairs, setCarRepairs] = useState();

    const openCarInformation = () => {
        setOpenCarInfo(!openCarInfo);
    };

    const handleCarInformation = (carPlate, index) => {
        setSelectedIndex(index);
        const filtredCarRepairs = carsRepairs.filter(
            (repair) => repair.carPlate === carPlate
        );
        setCarRepairs(filtredCarRepairs);
    };
    return (
        <div>
            <ASide
                handleAddCar={handleAddCar}
                toggle={openCarInformation}
                carInformation={handleCarInformation}
                cars={cars}
                title={"Aвтомобили"}
            />
            {openCarInfo && (
                <CarData
                    cars={cars}
                    index={selectedIndex}
                    toggle={openCarInformation}
                    carRepairs={carRepairs}
                />
            )}
        </div>
    );
}
