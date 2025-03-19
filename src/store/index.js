import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import machinesSlice from "./machines-slice";

const store = configureStore({
    reducer: {
        machine: machinesSlice.reducer,
        ui: uiSlice.reducer,
    },
});

export default store;
