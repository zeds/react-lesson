import { configureStore } from "@reduxjs/toolkit";
import houseSlice from "./slices/houseSlice";

export const store = configureStore({
	reducer: {
		house: houseSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
