import { createSlice } from "@reduxjs/toolkit";

import { getMachines } from "../services/dataService";

const machinesSlice = createSlice({
    name: "machines",
    initialState: {
        machines: getMachines(),
        repairs: [],
        movements: [],
    },
    reducers: {
        addMachine(state) {},
        addRepair(state) {},
        editRepair(state) {},
        addMovement(state) {},
    },
});

export const machineActions = machinesSlice.actions;

export default machinesSlice;
