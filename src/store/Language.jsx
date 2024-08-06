import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: '/img/flag-usa.svg'
}

export const Language = createSlice({
    name: "specificLanguage",
    initialState,
    reducers: {
        changeLang: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const { changeLang } = Language.actions;
export default Language.reducer;

