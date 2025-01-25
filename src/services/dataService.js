import MACHINESDATA from "../util/machineData.js";
import REPAIRS from "../util/repairsByMachine.js";

export function getMachines() {
    return MACHINESDATA;
}

export function getRepairsByMachineId(machineId) {
    return REPAIRS.filter((repair) => repair.machineId === machineId);
}

export function getMovementsByMachineId(machineId) {
    return REPAIRS.filter((move) => move.machineId === machineId);
}
