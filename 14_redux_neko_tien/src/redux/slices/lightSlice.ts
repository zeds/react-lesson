import { createSlice } from "@reduxjs/toolkit";

const initialState123 = {
    lightOn: false,
	test : "default",
};

const lightSlice = createSlice({
	name: "light",
	initialState: initialState123,
	reducers: {
		lightChange: (state, action) => {
			state.lightOn = action.payload;
			state.test = action.payload;
		},
	},
});

export const { lightChange } = lightSlice.actions;
export default lightSlice.reducer; //use from store
