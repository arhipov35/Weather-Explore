import { createSlice } from "@reduxjs/toolkit";
import colors from '../data/color.json';

// Завантаження збереженого кольору з localStorage або використання першого кольору з JSON
const savedColor = JSON.parse(localStorage.getItem('selectedColor')) || colors[0] || {
    color: 'white',
    'text-color': 'White',
    svg: '/img/img-color/white.svg'
};

const initialState = {
    colorSvg: savedColor.svg,
    backgrnd: savedColor.color,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setColorSvg: (state, action) => {
            state.colorSvg = action.payload;
            localStorage.setItem('selectedColor', JSON.stringify({ color: state.backgrnd, svg: state.colorSvg })); // Збереження в localStorage
        },
        setBackgrnd: (state, action) => {
            state.backgrnd = action.payload;
            localStorage.setItem('selectedColor', JSON.stringify({ color: state.backgrnd, svg: state.colorSvg })); // Збереження в localStorage
        }
    }
});

export const { setColorSvg, setBackgrnd } = uiSlice.actions;
export default uiSlice.reducer;
