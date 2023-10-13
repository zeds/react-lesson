import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lightOn: false,
	// test : "default",
};

const lightSlice = createSlice({
	name: "light",
	initialState,
	reducers: {
		lightChange: (state, action) => {
			state.lightOn = action.payload;
			// state.test = action.payload;
		},
	},
});

export const { lightChange } = lightSlice.actions;
export default lightSlice.reducer; //use from store
