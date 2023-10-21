// accountSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountId: localStorage.getItem("accountId") || null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountId: (state, action) => {
      state.accountId = action.payload;
      localStorage.setItem("accountId", action.payload);
    },
    clearAccountId: (state) => {
      state.accountId = null;
      localStorage.removeItem("accountId");
    },
  },
});

export const { setAccountId, clearAccountId } = accountSlice.actions;
export default accountSlice.reducer;
