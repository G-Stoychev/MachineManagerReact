import { getDatabase, ref, set, push } from "firebase/database";

export const addMachineData = (machine) => {
    const db = getDatabase();
    const pushMachine = push(ref(db, `machines`));
    const machineKey = pushMachine.key;

    set(pushMachine, {
        ...machine,
        id: machineKey,
    });
};

export const addRepairData = (repair) => {
    const db = getDatabase();
    const pushRepair = push(ref(db, `repairs`));
    const repairKey = pushRepair.key;

    set(pushRepair, {
        ...repair,
        id: repairKey,
    });
};

export const changeRepairData = (id, repair) => {
    const db = getDatabase();
    set(ref(db, `repairs/` + id), repair);
};

export const addMoveData = (move) => {
    const db = getDatabase();
    const pushMove = push(ref(db, `movements`));
    const moveKey = pushMove.key;

    set(pushMove, {
        ...move,
        id: moveKey,
    });
};

export const changeCompanyData = (move) => {
    const db = getDatabase();
    set(ref(db, `company`), move);
};

export const changeUserInfo = (userInfo) => {
    const db = getDatabase();
    set(ref(db, `userInfo`), userInfo);
};
