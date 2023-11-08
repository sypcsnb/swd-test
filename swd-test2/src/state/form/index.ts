import { createSlice } from "@reduxjs/toolkit";
import { FormType } from "./types";

const initialState: FormType[] = [];

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action) => {
      state.push(action.payload);
    },

    updateForm: (state, action) => {
      const { uuid, data } = action.payload;
      return state.map((item) => (item.uuid === uuid ? data : item));
    },
    deleteForm: (state, action) => {
      return state.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const { addForm, updateForm, deleteForm } = formSlice.actions;

export default formSlice.reducer;
