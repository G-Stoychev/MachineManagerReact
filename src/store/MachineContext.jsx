// MachineContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const MachineContext = createContext();
export const useMachines = () => useContext(MachineContext);

export const MachineProvider = ({ children }) => {
    const [originalMachineList, setOriginalMachineList] = useState([]);
    const [listOfMachines, setListOfMachines] = useState([]);
    const [movements, setMovements] = useState([]);

    // Fetch machines
    useEffect(() => {
        const db = getDatabase();
        const refMachines = ref(db, "machines");
        const unsubscribe = onValue(refMachines, (snapshot) => {
            if (snapshot.exists()) {
                const data = Object.values(snapshot.val());
                setOriginalMachineList(data);
                setListOfMachines(data);
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch movements
    useEffect(() => {
        const db = getDatabase();
        const refMovements = ref(db, "movements");
        const unsubscribe = onValue(refMovements, (snapshot) => {
            if (snapshot.exists()) {
                const data = Object.values(snapshot.val());
                setMovements(data);
            }
        });

        return () => unsubscribe();
    }, []);

    // Search logic
    const handleSearchMachine = (serial) => {
        if (!serial) {
            setListOfMachines(originalMachineList);
            return;
        }

        const result = originalMachineList.filter(
            (m) => m.serialNumber === serial
        );
        setListOfMachines(result);
    };

    const handleSearchBulstat = (bulstat) => {
        const moves = movements.filter((m) => m.bulstat === bulstat);
        const ids = moves.flatMap((m) => m.machineId);
        const filtered = originalMachineList.filter((m) => ids.includes(m.id));
        setListOfMachines(filtered);
    };

    const handleSelectMachine = (value) => {
        if (!value) {
            setListOfMachines(originalMachineList);
            return;
        }

        const byBrand = originalMachineList.filter((m) => m.brand === value);
        if (byBrand.length > 0) {
            setListOfMachines(byBrand);
        } else {
            const byModel = originalMachineList.filter(
                (m) => m.model === value
            );
            setListOfMachines(byModel);
        }
    };

    return (
        <MachineContext.Provider
            value={{
                originalMachineList,
                listOfMachines,
                handleSearchMachine,
                handleSearchBulstat,
                handleSelectMachine,
            }}
        >
            {children}
        </MachineContext.Provider>
    );
};
