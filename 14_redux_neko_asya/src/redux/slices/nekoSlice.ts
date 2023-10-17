import { createSlice } from "@reduxjs/toolkit";

interface NekoState {
	location: string;
}

const initialState = { location: "outside" } as NekoState;

const nekoSlice = createSlice({
	name: "neko",
	initialState,
	reducers: {
		gohome: (state, action) => {
			state.location = action.payload.location;
		},
	},
});

export const { gohome } = nekoSlice.actions;
export default nekoSlice.reducer; //use from store
