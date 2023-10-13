import { configureStore } from "@reduxjs/toolkit";
import lightSlice from "./lightSlice";

  export const rootReducer = combineReducers({

    //   reducer: {
    //       //store.light đối chiếu đến slice
          light:lightSlice,
    }
})