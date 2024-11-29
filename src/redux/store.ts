import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/authSlice";
import { infoReducer } from "./slices/info/infoSlice";
import { documentReducer } from "./slices/document/documentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    info: infoReducer,
    documents: documentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
