// skillSlice.js

import { createSlice } from "@reduxjs/toolkit";

const localStorageSkillId = localStorage.getItem("id_skill");

const initialState = {
  id_skill: localStorageSkillId ? JSON.parse(localStorageSkillId) : null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkillId: (state, action) => {
      state.id_skill = action.payload;
      localStorage.setItem("id_skill", JSON.stringify(action.payload));
    },
  },
});

export const { setSkillId } = skillSlice.actions;

// Perbarui properti yang diakses di sini sesuai dengan nama yang ada di backend
export const selectSkillId = (state) => state.skill.id_skill;

export default skillSlice.reducer;
