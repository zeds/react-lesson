import { createSlice } from "@reduxjs/toolkit";

interface chat {
    joined : boolean;
}

export const initialState: chat = {
    joined : false
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        showChat: (state, action) => {
            state.joined = action.payload;
        }
    }
})

export const { showChat } = chatSlice.actions;
export default chatSlice.reducer;