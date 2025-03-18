import MACHINESDATA from "../util/machineData.js";
import REPAIRS from "../util/repairsByMachine.js";
import COMPANY from "../util/company.js";
import MOVEMENTS from "../util/movementsByMachine.js";

const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/machines.json"
            );

            if (!response.ok) {
                throw new Error("Cloud not fetch cart data!");
            }

            const data = await response.json();

            return data;
        };
    };
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
