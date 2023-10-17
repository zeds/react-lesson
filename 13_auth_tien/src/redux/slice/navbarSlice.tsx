import { createSlice } from "@reduxjs/toolkit";

// const initialState123 = {
// 	isLoginOpen: false,
// 	isRegisterOpen: false,
// };
const token = localStorage.getItem('token');

const initialState1234 = {
	token: token ? token : "",

}


const navbar = createSlice({
	name: "navBar",
	initialState: initialState1234,
	reducers: {
		login: (state, action) => {
			state.token = action.payload;
		},
		logout: (state) => {
			state.token = "";
		},
	},
});

export const { login, logout } = navbar.actions;
export default navbar.reducer; //use from store
