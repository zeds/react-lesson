import { createSlice } from "@reduxjs/toolkit";

interface UxState {
	message_window: boolean;
}

const initialState = { message_window: false } as UxState;

const uxSlice = createSlice({
	name: "ux",
	initialState,
	reducers: {
		showMessage: (state, action) => {
			state.message_window = action.payload;
		},
	},
});

export const { showMessage } = uxSlice.actions;
export default uxSlice.reducer; //use from store
