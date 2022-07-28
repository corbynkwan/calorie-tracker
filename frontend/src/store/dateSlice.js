import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: new Date().toISOString(),
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
      return state;
    },
  },
});

export const {setDate} = dateSlice.actions;

export default dateSlice.reducer;
