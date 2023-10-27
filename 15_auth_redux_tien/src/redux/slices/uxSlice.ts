import { createSlice } from "@reduxjs/toolkit";

interface UxState {
	message_window: boolean;
	burger: boolean;
}

const initialState = { message_window: false } as UxState;

const uxSlice = createSlice({
	name: "ux",
	initialState,
	reducers: {
		showMessage: (state, action) => {
			state.message_window = action.payload;
		},
		showBurger: (state, action) =>{
			state.burger = action.payload;
		}
	},
});

export const { showMessage } = uxSlice.actions;
export default uxSlice.reducer; //use from store
