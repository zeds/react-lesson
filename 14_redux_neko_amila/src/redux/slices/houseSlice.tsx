import { createSlice } from "@reduxjs/toolkit";

const initialState = { house_light: false };

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
export default houseSlice.reducer;
