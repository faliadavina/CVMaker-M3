import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import skillReducer from "../features/skillSlice";
import accountReducer from "../features/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skill: skillReducer,
    account: accountReducer,
  },
});