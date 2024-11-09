import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loadProducts } = userSlice.action;
export default productsSlice.reducer;
