import { configureStore } from "@reduxjs/toolkit";
import statesReduc from "./statesSlice";
import uiSlice from "./colorSet";

export const store = configureStore({
    reducer: {
        states: statesReduc,
        ui: uiSlice, 
    },
});
