import { configureStore } from "@reduxjs/toolkit";
import activeTodoReducer from "./features/activeTodo/activeTodoSlice";

export default configureStore({
    reducer: {
        activeTodo: activeTodoReducer,
    }
})