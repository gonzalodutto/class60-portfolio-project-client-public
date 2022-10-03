import { createSlice } from "@reduxjs/toolkit";

const initialState = { allShops: [] };

export const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    fetchShopsSuccess: (state, action) => {
      state.allShops = [...state.allShops, ...action.payload];
      // console.log(action.payload);
      // console.log("hola");
    },
  },
});

export const { fetchShopsSuccess } = shopsSlice.actions;

export default shopsSlice.reducer;
