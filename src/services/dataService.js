import MACHINESDATA from "../util/machineData.js";
import REPAIRS from "../util/repairsByMachine.js";
import COMPANY from "../util/company.js";
import MOVEMENTS from "../util/movementsByMachine.js";

export const fetchtData = async (key) => {
    const response = await fetch(
        `https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`
    );

    if (!response.ok) {
        throw new Error("Cloud not fetch cart data!");
    }

    const data = await response.json();
    return data;
};

export const sendRequest = async (key, data) => {
    const response = await fetch(
        `https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    if (!response.ok) {
        throw new Error("Sending cart data failed");
    }
};

export const updateRepairRequest = async (key, updatedItem) => {
    const response = await fetch(
        `https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`
    );

    if (!response.ok) {
        throw new Error("Could not fetch data!");
    }

    let data = await response.json();

    if (!Array.isArray(data)) {
        data = data ? Object.values(data) : [];
    }

    console.log(data);

    // Намери индекса на обекта по ID
    const index = data.findIndex((item) => item.id === updatedItem.id);
    if (index === -1) {
        throw new Error("Item not found!");
    }

    // Заместване на стария обект с новата версия
    data[index] = updatedItem;

    // Изпращане на обновения масив обратно в Firebase
    const updateResponse = await fetch(
        `https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!updateResponse.ok) {
        throw new Error("Could not update data!");
    }
};

export function getMachines() {
    return MACHINESDATA;
}

export function getRepairsByMachineId(machineId) {
    return REPAIRS.filter((repair) => repair.machineId === machineId);
}

export function getMovementsByMachineId(machineId) {
    return MOVEMENTS.filter((move) => move.machineId === machineId);
}

export function getCompany() {
    return COMPANY;
}
