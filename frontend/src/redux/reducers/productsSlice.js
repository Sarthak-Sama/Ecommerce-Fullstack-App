import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload.products;
    },
  },
});

export const { loadProducts } = productsSlice.actions;
export default productsSlice.reducer;
