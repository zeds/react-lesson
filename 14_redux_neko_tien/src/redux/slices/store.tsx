import { configureStore } from "@reduxjs/toolkit";
import lightSlice from "./lightSlice";

export const store = configureStore({
    reducer: {
        //store.light đối chiếu đến slice
        light:lightSlice,
    }
})