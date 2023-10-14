import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import skillReducer from "../features/skillSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skill: skillReducer,

  },
});