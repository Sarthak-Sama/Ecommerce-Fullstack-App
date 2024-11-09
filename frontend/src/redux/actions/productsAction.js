import axios from "../../utils/axios";
import { loadProducts } from "../reducers/productsSlice";

export const fetchProducts = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`/products/${category}`);
    dispatch(loadProducts(response.data));
  } catch (error) {
    console.error("Error while fetching the products: ", error);
  }
};
