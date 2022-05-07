import { createSlice } from '@reduxjs/toolkit';

export const activeTodoSlice = createSlice({
    name: 'activeTodo',
    initialState: {
        value: null
    },
    reducers: {
        setActiveTodo: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setActiveTodo } = activeTodoSlice.actions;

export default activeTodoSlice.reducer;
