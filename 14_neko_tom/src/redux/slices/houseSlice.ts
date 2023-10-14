import { createSlice } from "@reduxjs/toolkit";

//typescript 型
interface HouseState {
	house_light: boolean;
}

const initialState = { house_light: false } as HouseState;

const houseSlice = createSlice({
	name: "house",
	initialState,
	reducers: {
		onoff: (state, action) => {
			console.log("state=", state.house_light);
			state.house_light = action.payload.on;
		},
	},
});

export const { onoff } = houseSlice.actions;
export default houseSlice.reducer; //use from store
