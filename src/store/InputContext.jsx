import { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export const InputContext = createContext();

export const useInput = () => useContext(InputContext);

export const InputProvider = ({ children }) => {
    const [serialNumberInput, setSerialNumberInput] = useState("");
    const [bulstatNumberInput, setBulstatNumberInput] = useState("");

    const [originalMachineList, setOriginalMachineList] = useState([]);
    const [listOfMachines, setListOfMachines] = useState([]);

    const [movements, setMovements] = useState([]);

    //Machines Data
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

    //Movements Data
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

    const handleSearchMachine = (filterInput) => {
        if (!filterInput) {
            setListOfMachines(originalMachineList);
            return;
        }
        const foundMachines = originalMachineList.filter(
            (m) => m.serialNumber === filterInput
        );
        setListOfMachines(foundMachines);
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

    return (
        <InputContext.Provider
            value={{
                serialNumberInput,
                setSerialNumberInput,
                bulstatNumberInput,
                setBulstatNumberInput,
                handleSearchMachine,
                handleSearchBulstat,
                handleSelectMachine,
                listOfMachines,
                originalMachineList,
            }}
        >
            {children}
        </InputContext.Provider>
    );
};
