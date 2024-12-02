import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducers/productsSlice";
export const store = configureStore({
  reducer: {
    products: productReducers,
  },
});
