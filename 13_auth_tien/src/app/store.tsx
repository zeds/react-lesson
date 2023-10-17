// import { configureStore } from "@reduxjs/toolkit";
import asadsadsadsadsadds from "../redux/slice/navbarSlice";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  navbar: asadsadsadsadsadds,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer,applyMiddleware(thunk))

export const persistor = persistStore(store)

// export const store = configureStore({
//   reducer: {
// 		navbar: asadsadsadsadsadds,
//   }
// });
