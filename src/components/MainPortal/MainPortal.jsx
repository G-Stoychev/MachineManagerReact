import { useRef, useState, useEffect, lazy, useMemo } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { changeCompanyData } from "../../services/dataService.js";

import CarsComponent from "../CarsData/CarsComponent.jsx";
import ErrorModal from "../ErrorModal/ErrorModal.jsx";
import PortalMenu from "./PortalMenu.jsx";
import StickyMenu from "./StickyMenu.jsx";

const Container = lazy(() => import("../Container/Container.jsx"));
const ProtocolPlus = lazy(() => import("../ProtocolModal/ProtocolPlus.jsx"));
const CompanyInfoModal = lazy(() =>
    import("../CompanyInfoModal/CompanyInfoModal.jsx")
);
import ContractForm from "../ContractForm/ContractForm.jsx";
import RepairList from "../RepairList/RepairList.jsx";
import Organizer from "../Оrganizer/Оrganizer.jsx";

import { InputProvider } from "../../store/InputContext.jsx";
import { MachineProvider } from "../../store/MachineContext.jsx";

import { useTasks } from "../../store/TaskContext.jsx";
import Notifications from "../Notifications/Notifications.jsx";

export default function MainPortal({ userInfo, logout }) {
    const [selectedComponent, setSelectedComponent] = useState("menu");
    const [toDayTasks, setToDayTask] = useState([]);
    const [openNotifications, setOpenNotificatios] = useState(false);

    const [cars, setCars] = useState([]);

    const [error, setError] = useState(false);
    const errorModal = useRef();

    const [companyInfo, setCompanyInfo] = useState({});
    const CompanyDialog = useRef();
    const { listOfTask } = useTasks();

    const handleOpenCompanyModal = () => CompanyDialog.current.open();

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    //Company Data
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

    const handleCompanyChange = (newCompanyInfo) => {
        changeCompanyData(newCompanyInfo);
        setCompanyInfo(newCompanyInfo);
    };

    //Cars Data
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
                            `🚗 ${car.title}: ${labels[field]} изтича след ${daysLeft} дни (${car[field]})`
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
    const expiringMessages = useMemo(() => checkExpiringDates(), [cars]);

    useEffect(() => {
        if (cars.length > 0) {
            checkExpiringDates();
        }
    }, [cars.length]);

    const handleToogleCars = () => {
        setSelectedComponent((prev) => (prev === "cars" ? "menu" : "cars"));
    };

    const handleAddCar = () => {
        const newCar = {
            plate: "НОВ редактирай",
            insurance: "",
            vignette: "",
            inspection: "",
        };
        setCars((prev) => [...prev, newCar]);
    };
    //end Cars

    const handleToggleContainer = () => {
        setSelectedComponent((prev) =>
            prev === "container" ? "menu" : "container"
        );
    };
    const previousComponentRef = useRef("menu");

    const handleToggleProtocol = () => {
        setSelectedComponent((prev) => {
            if (prev === "protocol") {
                return previousComponentRef.current;
            } else {
                previousComponentRef.current = prev;
                return "protocol";
            }
        });
    };

    const handleReturnHome = () => {
        setSelectedComponent("menu");
    };

    const handleToggleContract = () => {
        setSelectedComponent((prev) =>
            prev === "contract" ? "menu" : "contract"
        );
    };
    const handleToggleRepairList = () => {
        setSelectedComponent((prev) => (prev === "repair" ? "menu" : "repair"));
    };

    const handleToggleOrganizer = () => {
        setSelectedComponent((prev) =>
            prev === "organizer" ? "menu" : "organizer"
        );
    };

    const checkForToDayTasks = () => {
        const todayDate = new Date();

        const toDayTasks = listOfTask.filter((task) => {
            if (!task.deadline) return false;

            const taskDate = new Date(task.deadline);

            return (
                taskDate.getDate() === todayDate.getDate() &&
                taskDate.getMonth() === todayDate.getMonth() &&
                taskDate.getFullYear() === todayDate.getFullYear()
            );
        });
        setToDayTask(toDayTasks);
        setOpenNotificatios(true);
    };

    useEffect(() => {
        checkForToDayTasks();
    }, [listOfTask]);

    const handleCloseNotificatios = () => {
        setOpenNotificatios(false);
    };

    return (
        <>
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

            {openNotifications && (
                <Notifications
                    toDayTasks={toDayTasks}
                    close={handleCloseNotificatios}
                />
            )}

            <CompanyInfoModal
                ref={CompanyDialog}
                company={companyInfo}
                onCompanyEdit={handleCompanyChange}
            />
            <InputProvider>
                {selectedComponent === "menu" && (
                    <PortalMenu
                        toggleCars={handleToogleCars}
                        toggleContainer={handleToggleContainer}
                        toggleProtocol={handleToggleProtocol}
                        handleToggleContract={handleToggleContract}
                        handleToggleRepairList={handleToggleRepairList}
                        handleToggleOrganizer={handleToggleOrganizer}
                    />
                )}

                <MachineProvider>
                    <StickyMenu
                        logout={logout}
                        handleReturnHome={handleReturnHome}
                        userInfo={userInfo}
                        company={companyInfo}
                        activeComponent={selectedComponent}
                        setSelectedComponent={setSelectedComponent}
                        closeContainer={handleToggleContainer}
                        companyInfoChange={handleCompanyChange}
                        handleOpenCompanyModal={handleOpenCompanyModal}
                        toggleProtocol={handleToggleProtocol}
                        handleToggleOrganizer={handleToggleOrganizer}
                    />

                    {selectedComponent === "container" && <Container />}
                    {selectedComponent === "protocol" && (
                        <ProtocolPlus
                            company={companyInfo}
                            toggleProtocol={handleToggleProtocol}
                            user={userInfo}
                        />
                    )}
                </MachineProvider>

                {selectedComponent === "cars" && (
                    <CarsComponent cars={cars} handleAddCar={handleAddCar} />
                )}
                {selectedComponent === "organizer" && <Organizer />}
            </InputProvider>

            {selectedComponent === "contract" && (
                <ContractForm company={companyInfo} user={userInfo} />
            )}
            {selectedComponent === "repair" && (
                <RepairList company={companyInfo} user={userInfo} />
            )}
        </>
    );
}
