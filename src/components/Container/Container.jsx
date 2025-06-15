import { useRef, useState, useEffect, lazy, useMemo } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import {
    addMachineData,
    changeCompanyData,
} from "../../services/dataService.js";

const Menu = lazy(() => import("../Menu/Menu.jsx"));
const MachineTable = lazy(() => import("../MachineTable/MachineTable.jsx"));
const AddItemModal = lazy(() => import("../AddItemModal/AddItemModal.jsx"));
const CompanyInfoModal = lazy(() =>
    import("../CompanyInfoModal/CompanyInfoModal.jsx")
);
const ProtocolPlus = lazy(() => import("../ProtocolModal/ProtocolPlus.jsx"));

import CarsData from "../Menu/CarsData.jsx";

import classes from "./Container.module.css";
import ErrorModal from "../ErrorModal/ErrorModal.jsx";

export default function Container({ userInfo, logout }) {
    const [originalMachineList, setOriginalMachineList] = useState([]);
    const [listOfMachines, setListOfMachines] = useState([]);
    const [movements, setMovements] = useState([]);
    const [companyInfo, setCompanyInfo] = useState({});
    const dialog = useRef();
    const CompanyDialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();
    const handleOpenCompanyModal = () => CompanyDialog.current.open();

    const [openCars, setOpenCars] = useState(false);
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(false);
    const errorModal = useRef();
    const [protocolState, setProtocolState] = useState(false);

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useEffect(() => {
        const database = getDatabase();
        const carsRef = ref(database, "cars");
        const unsubscribe = onValue(carsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setCars(Object.values(data));
            }
        });

        return () => unsubscribe();
    }, []);

    const labels = {
        insurance: "ЗАСТРАХОВКА",
        vignette: "ВИНЕТКА",
        inspection: "ПРЕГЛЕД",
    };

    const checkExpiringDates = () => {
        const today = new Date();
        let expiringList = [];

        cars.forEach((car) => {
            ["insurance", "vignette", "inspection"].forEach((field) => {
                if (car[field]) {
                    const expirationDate = new Date(car[field]);
                    const timeDiff = expirationDate - today;
                    const daysLeft = Math.ceil(
                        timeDiff / (1000 * 60 * 60 * 24)
                    );

                    if (daysLeft === 10 || (daysLeft < 10 && daysLeft >= 0)) {
                        expiringList.push(
                            `🚗 ${car.plate}: ${labels[field]} изтича след ${daysLeft} дни (${car[field]})`
                        );
                    }
                }
            });
        });

        if (expiringList.length > 0) {
            setError(true);
            // alert(
            //     "⚠️ Внимание! Следните срокове изтичат скоро:\n\n" +
            //         expiringList.join("\n")
            // );
        }
        return expiringList.join("\n");
    };

    useEffect(() => {
        if (cars.length > 0) {
            checkExpiringDates();
        }
    }, [cars.length]);

    const handleToogleCars = () => {
        setOpenCars(!openCars);
    };

    useEffect(() => {
        const database = getDatabase();
        const machinesRef = ref(database, "machines");
        const unsubscribe = onValue(
            machinesRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const machinesArray = Object.values(data);
                    setOriginalMachineList(machinesArray);
                    setListOfMachines(machinesArray);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const database = getDatabase();
        const companyRef = ref(database, "company");
        const unsubscribe = onValue(
            companyRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCompanyInfo(data);
                }
            },
            {
                onlyOnce: true,
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const database = getDatabase();
        const movementsRef = ref(database, "movements");
        const unsubscribe = onValue(
            movementsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const movementsArray = Object.values(data);
                    setMovements(movementsArray);
                }
            },
            {
                onlyOnce: false,
            }
        );

        return () => unsubscribe();
    }, []);

    const handleAddNewMachine = async (newMachineData) => {
        try {
            const savedMachine = await addMachineData(newMachineData);
        } catch (error) {
            console.error("Грешка при запис на новата машина:", error);
        }
    };

    const handleSearchMachine = (filterInput) => {
        const findedMachine = originalMachineList.filter(
            (m) => m.serialNumber === filterInput
        );
        setListOfMachines(findedMachine);
    };

    const handleSearchBulstat = (bulstatValues) => {
        const findedMovements = movements.filter(
            (m) => m.bulstat === bulstatValues
        );
        const selectedIds = findedMovements
            .map((move) => move.machineId)
            .flat();
        const filteredMachines = originalMachineList.filter((machine) =>
            selectedIds.includes(machine.id)
        );
        setListOfMachines(filteredMachines);
    };

    const handleSelectMachine = (selectedMachine) => {
        if (selectedMachine !== "") {
            const findedMachineByBrand = originalMachineList.filter(
                (m) => m.brand === selectedMachine
            );
            if (findedMachineByBrand.length > 0) {
                setListOfMachines(findedMachineByBrand);
            } else {
                const findedMachineByModel = originalMachineList.filter(
                    (m) => m.model === selectedMachine
                );
                setListOfMachines(findedMachineByModel);
            }
        } else {
            setListOfMachines(originalMachineList);
        }
    };

    const handleResetTable = () => {
        setListOfMachines(originalMachineList);
    };

    const handleCompanyChange = (newCompanyInfo) => {
        changeCompanyData(newCompanyInfo);
        setCompanyInfo(newCompanyInfo);
    };
    const expiringMessages = useMemo(() => checkExpiringDates(), [cars]);

    const toggleProtocol = () => {
        setProtocolState(!protocolState);
    };
    return (
        <div className={classes.container}>
            {openCars && <CarsData toggle={handleToogleCars} cars={cars} />}

            {protocolState && (
                <ProtocolPlus
                    company={companyInfo}
                    toggleProtocol={toggleProtocol}
                />
            )}
            {error && (
                <ErrorModal
                    title="⚠️ Внимание! Следните срокове изтичат скоро:"
                    text={expiringMessages.split("\n").map((line, index) => (
                        <span key={index}>{line}</span>
                    ))}
                    setError={setError}
                    ref={errorModal}
                />
            )}
            <Menu
                userInfo={userInfo}
                logout={logout}
                openModal={handleOpenAddItemModal}
                openCompanyModal={handleOpenCompanyModal}
                onSearch={handleSearchMachine}
                onReset={handleResetTable}
                company={companyInfo}
                machines={originalMachineList}
                onSelect={handleSelectMachine}
                onSearchBulsat={handleSearchBulstat}
                openCars={handleToogleCars}
                toggleProtocol={toggleProtocol}
            />
            <AddItemModal
                ref={dialog}
                onAddNewMachine={handleAddNewMachine}
                company={companyInfo}
            />
            <CompanyInfoModal
                ref={CompanyDialog}
                company={companyInfo}
                onCompanyEdit={handleCompanyChange}
            />
            <MachineTable machines={listOfMachines} company={companyInfo} />
        </div>
    );
}
