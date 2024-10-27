import { createSlice } from "@reduxjs/toolkit";

const searchFilterSlice = createSlice({
  name: "filter",
  initialState: { query: "" },
  reducers: {
    changeFilter: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const { changeFilter } = searchFilterSlice.actions;
export const selectNameFilter = (state) => state.filter.query;
export const filterReducer = searchFilterSlice.reducer;
