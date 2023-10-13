import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //local storage

import { configureStore } from "@reduxjs/toolkit";
import lightSlice from "./lightSlice";
import locationSlice from "./locationSlice";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,

  }

  export const rootReducer = combineReducers({

    //   reducer: {
    //       //store.light đối chiếu đến slice
          light:lightSlice,
          location: locationSlice,
    //     }
    })

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    export const store = createStore(persistedReducer,applyMiddleware(thunk))
    
    export const persistor = persistStore(store)