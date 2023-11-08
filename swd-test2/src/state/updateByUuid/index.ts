import { createSlice } from "@reduxjs/toolkit";

// const initialState: "";

const updateByUuidSlice = createSlice({
  name: "updateByUuid",
  initialState: { uuid: "" },
  reducers: {
    setUuid: (state, action) => {
      state.uuid = action.payload;
    },
  },
});

export const { setUuid } = updateByUuidSlice.actions;

export default updateByUuidSlice.reducer;
