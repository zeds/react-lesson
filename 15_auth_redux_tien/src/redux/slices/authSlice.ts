import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	jwt: string;
}

const initialState = { jwt: "" } as AuthState;

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoginSuccess: (state, action) => {
			// console.log("action=", action);
			state.jwt = action.payload;
		},
		clear: (state, action) => {
			console.log(action);
			state.jwt = "";
		},
	},
});

export const { userLoginSuccess, clear } = authSlice.actions;
export default authSlice.reducer; //use from store
