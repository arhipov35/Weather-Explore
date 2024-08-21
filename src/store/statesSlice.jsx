import { createSlice } from '@reduxjs/toolkit';

const statesSlice = createSlice({
    name: 'states',
    initialState: {
        error: null,
        visible: true,
        hoverIndex: null,
        delet: null,
    },
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        setVisible(state, action) {
            state.visible = action.payload;
        },
        setHoverIndex(state, action) {
            state.hoverIndex = action.payload;
        },
        setDelete(state, action) {
            state.delet = action.payload;
        },
    },
});

export const { setError, setVisible, setHoverIndex, setDelete } = statesSlice.actions;
export default statesSlice.reducer;
