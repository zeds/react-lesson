import { createSlice } from "@reduxjs/toolkit";
interface NekoState {
  location: string;
}
const initialState = {
  location: "outSide",
} as NekoState; 

const catLocation = createSlice({
  name: "catLocation",
  initialState,
  reducers: {
    locationChange: (state, action) => {
      state.location = action.payload;
      // state.test = action.payload;
    },
  },
});

export const { locationChange } = catLocation.actions;
export default catLocation.reducer; //use from store
