import MACHINESDATA from "../util/machineData.js";
import REPAIRS from "../util/repairsByMachine.js";
import COMPANY from "../util/company.js";
import MOVEMENTS from "../util/movementsByMachine.js";

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
