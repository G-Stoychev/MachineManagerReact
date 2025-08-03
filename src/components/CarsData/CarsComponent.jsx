import { useState } from "react";

import ASide from "../aSide/aSide";
import CarData from "./CarData";
import styles from "./CarsData.module.css";

import { useInput } from "../../store/InputContext";

export default function CarsComponent({ cars, handleAddCar }) {
    const [openCarInfo, setOpenCarInfo] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [carsRepairs, setCarsRepairs] = useState([
        {
            carPlate: "А4831НТ НИСАН",
            repairDate: "08.08.2025",
            service: "Д Авто",
            kmOnRepair: "156000",
            repairInfo: "Смяна накладки и  ремонт климатик",
            kmOnNextRepair: "166000",
        },
    ]);
    const [carRepairs, setCarRepairs] = useState();

    const { aSideIsOpen } = useInput();

    const openCarInformation = () => {
        setOpenCarInfo(true);
    };
    const closeCarInformation = () => {
        setOpenCarInfo(false);
    };

    const handleCarInformation = (carPlate, id, index) => {
        setSelectedIndex(index);
        const filtredCarRepairs = carsRepairs.filter(
            (repair) => repair.carPlate === carPlate
        );
        setCarRepairs(filtredCarRepairs);
    };
    return (
        <div className={`${styles.wrapper}  `}>
            {aSideIsOpen && (
                <ASide
                    handleAddBtn={handleAddCar}
                    open={openCarInformation}
                    openFunction={handleCarInformation}
                    listItems={cars}
                    title={"Aвтомобили"}
                />
            )}
            {openCarInfo && (
                <CarData
                    cars={cars}
                    index={selectedIndex}
                    close={closeCarInformation}
                    carRepairs={carRepairs}
                />
            )}
        </div>
    );
}
