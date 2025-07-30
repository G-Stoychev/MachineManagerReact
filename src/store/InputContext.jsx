import { createContext, useContext, useState, useRef } from "react";
import { addMachineData } from "../services/dataService";

const InputContext = createContext();
export const useInput = () => useContext(InputContext);

export const InputProvider = ({ children }) => {
    const [serialNumberInput, setSerialNumberInput] = useState("");
    const [bulstatNumberInput, setBulstatNumberInput] = useState("");
    const dialog = useRef();

    const handleOpenAddItemModal = () => dialog.current.open();

    const handleAddNewMachine = async (newMachineData) => {
        try {
            const savedMachine = await addMachineData(newMachineData);
        } catch (error) {
            console.error("Грешка при запис на новата машина:", error);
        }
    };

    return (
        <InputContext.Provider
            value={{
                serialNumberInput,
                setSerialNumberInput,
                bulstatNumberInput,
                setBulstatNumberInput,
                handleAddNewMachine,
                dialog,
                handleOpenAddItemModal,
            }}
        >
            {children}
        </InputContext.Provider>
    );
};
