// InputContext.jsx
import { createContext, useContext, useState } from "react";

const InputContext = createContext();
export const useInput = () => useContext(InputContext);

export const InputProvider = ({ children }) => {
    const [serialNumberInput, setSerialNumberInput] = useState("");
    const [bulstatNumberInput, setBulstatNumberInput] = useState("");

    return (
        <InputContext.Provider
            value={{
                serialNumberInput,
                setSerialNumberInput,
                bulstatNumberInput,
                setBulstatNumberInput,
            }}
        >
            {children}
        </InputContext.Provider>
    );
};
