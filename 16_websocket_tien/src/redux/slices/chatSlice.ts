import { createSlice } from "@reduxjs/toolkit";

interface chat {
    joined : boolean;
    name : string;
}

export const initialState: chat = {
    joined : false,
    name: ""
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        showChat: (state, action) => {
            state.joined = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const { showChat,setName } = chatSlice.actions;
export default chatSlice.reducer;