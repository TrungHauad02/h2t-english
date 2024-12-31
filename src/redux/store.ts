import { configureStore } from "@reduxjs/toolkit";
import * as reducers from "./slices";

export const store = configureStore({
  reducer: {
    theme: reducers.themeReducer,
    aq: reducers.aqReducer,
  },
});

export default store;
