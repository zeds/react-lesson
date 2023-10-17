import { createSlice } from "@reduxjs/toolkit";

interface HouseState {
	house_light: boolean;
}

const initialState = { house_light: true } as HouseState;

const houseSlice = createSlice({
	name: "house",
	initialState,
	reducers: {
		onoff: (state, action) => {
			state.house_light = action.payload.on;
		},
	},
});

export const { onoff } = houseSlice.actions;
export default houseSlice.reducer; //use from store
