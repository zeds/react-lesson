import { configureStore, combineReducers } from "@reduxjs/toolkit";
import houseSlice from "./slices/houseSlice";
import nekoSlice from "./slices/nekoSlice";

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

// localStorageを使う
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({ house: houseSlice, neko: nekoSlice });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);
export { persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
