import { createSlice } from "@reduxjs/toolkit";

interface UxState {
	show: boolean;
	animation: boolean;
	button: boolean;
	message: string;
	current_page_url: string;
}

export const initialState: UxState = {
	show: false,
	animation: false,
	button: false,
	message: "",
	current_page_url: "/",
};

const uxSlice = createSlice({
	name: "ux",
	initialState,
	reducers: {
		showMessage: (state, action) => {
			state.show = action.payload.show;
			state.animation = action.payload.animation;
			state.button = action.payload.button;
			state.message = action.payload.message;
		},
	},
});

export const { showMessage } = uxSlice.actions;
export default uxSlice.reducer; //use from store
