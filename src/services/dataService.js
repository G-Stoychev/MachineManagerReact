import { getDatabase, ref, set, push, get } from "firebase/database";
import { app } from "../firebase.js";

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

export const addTaskData = async (task) => {
    const db = getDatabase();
    const pushTask = push(ref(db, `tasks`));
    const taskKey = pushTask.key;

    await set(pushTask, {
        ...task,
        id: taskKey,
    });

    return {
        ...task,
        id: taskKey,
    };
};

export const changeTaskData = (id, task) => {
    const db = getDatabase();
    set(ref(db, `tasks/` + id), task);
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

export const uploadPDFToRealtimeDB = async (pdfDataURL) => {
    try {
        const db = getDatabase(app);
        const newRef = push(ref(db, "repairsPDF"));
        const pdfKey = newRef.key;

        await set(newRef, {
            id: pdfKey,
            pdfData: pdfDataURL,
            date: new Date(formData.repairDate).toLocaleDateString("bg-BG"),
            name: `Ремонтен лист с ${formData.partner}`,
        });

        return { success: true, id: pdfKey };
    } catch (error) {
        console.error("Грешка при качване PDF в Firebase:", error);
        return { success: false, error };
    }
};

export const getPDFById = async (pdfId) => {
    try {
        const db = getDatabase(app);
        const pdfRef = ref(db, `repairsPDF/${pdfId}`);
        const snapshot = await get(pdfRef);

        if (snapshot.exists()) {
            return { success: true, data: snapshot.val() };
        } else {
            return { success: false, error: "PDF не е намерен" };
        }
    } catch (error) {
        return { success: false, error };
    }
};
