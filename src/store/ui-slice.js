import { createSlice } from "@reduxjs/toolkit";
import ExpandedContainer from "../components/ExpandedContainer/ExpandedContainer";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        expandedContainerIsVisible: false,
        // repairsIsVisible: false,
        // movementsIsVisible: false,
        // errorModalIsVisible: false,
    },
    reducers: {
        openEpandedContainer(state) {},
        // openEpandedContainer(state) {},
        // openEpandedContainer(state) {},
        // openEpandedContainer(state) {},
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
