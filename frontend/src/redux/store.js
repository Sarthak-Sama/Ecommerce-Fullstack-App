import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducers/productsSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducers,
    user: userReducer,
  },
});
