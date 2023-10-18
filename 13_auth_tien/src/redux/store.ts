// // import { store } from './../../../15_auth_redux_tom/src/redux/store';
// import { store } from "../app/store";
// import { combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore,persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import loginSlice from "./slice/navbarSlice"

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

// const reducer = combineReducers({
//     login: loginSlice,
// })

// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//     reducer: persistedReducer
// })