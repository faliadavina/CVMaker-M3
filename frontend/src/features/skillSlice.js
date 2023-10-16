import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id_skill: null,  // Ganti menjadi sesuai dengan nama properti yang ada di backend
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkillId: (state, action) => {
      state.id_skill = action.payload;  // Ganti menjadi sesuai dengan nama properti yang ada di backend
    },
  },
});

export const { setSkillId } = skillSlice.actions;

// Perbarui properti yang diakses di sini sesuai dengan nama yang ada di backend
export const selectSkillId = (state) => state.skill.id_skill;

export default skillSlice.reducer;
