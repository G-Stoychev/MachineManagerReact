import { getDatabase, ref, set, push } from "firebase/database";

export const addMachineData = async (machine) => {
    const db = getDatabase();
    const pushMachine = push(ref(db, `machines`));
    const machineKey = pushMachine.key;

    await set(pushMachine, {
        ...machine,
        id: machineKey,
    });

    return {
        ...machine,
        id: machineKey,
    };
};

export const addRepairData = async (repair) => {
    const db = getDatabase();
    const pushRepair = push(ref(db, `repairs`));
    const repairKey = pushRepair.key;

    await set(pushRepair, {
        ...repair,
        id: repairKey,
    });

    return {
        ...repair,
        id: repairKey,
    };
};

export const changeRepairData = (id, repair) => {
    const db = getDatabase();
    set(ref(db, `repairs/` + id), repair);
};

export const addMoveData = async (move) => {
    const db = getDatabase();
    const pushMove = push(ref(db, `movements`));
    const moveKey = pushMove.key;

    await set(pushMove, {
        ...move,
        id: moveKey,
    });

    return {
        ...move,
        id: moveKey,
    };
};

export const changeCompanyData = (move) => {
    const db = getDatabase();
    set(ref(db, `company`), move);
};

export const changeCarsData = (cars) => {
    const db = getDatabase();
    set(ref(db, `cars`), cars);
};

export const changeUserInfo = (userInfo) => {
    const db = getDatabase();
    set(ref(db, `userInfo`), userInfo);
};

export const changeThema = (thema, user) => {
    const db = getDatabase();
    set(ref(db, `thema/` + user), thema);
};

export const themeSets = [
    {
        name: "Зима",
        hoverColor: "--winterColor",
        bgImg: " url(/images/winter-bg.jpg)",
    },
    {
        name: "Пролет",
        hoverColor: "--springColor",
        bgImg: " url(/images/spring-bg.jpg)",
    },
    {
        name: "Лято",
        hoverColor: "--summerColor",
        bgImg: " url(/images/summer-bg.jpg)",
    },
    {
        name: "Есен",
        hoverColor: "--autumnColor",
        bgImg: " url(/images/autumn-bg.jpg)",
    },
];
