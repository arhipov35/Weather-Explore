import { configureStore } from "@reduxjs/toolkit";
import Language from "./Language";
import statesReduc from "./statesSlice";
import uiSlice from "./colorSet";

export const store = configureStore({
    reducer: {
        specificLanguage: Language,
        states: statesReduc,
        ui: uiSlice, // Оновлення ключа з uiSlice на ui
    },
});
