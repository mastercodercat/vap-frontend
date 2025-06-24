import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import developersReducer from "./slices/developersSlice";
import resumesReducer from "./slices/resumesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    developers: developersReducer,
    resumes: resumesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
