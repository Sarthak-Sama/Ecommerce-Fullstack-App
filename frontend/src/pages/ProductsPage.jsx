import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productsAction";
import { useParams } from "react-router-dom";

function ProductsPage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  return <div>ProductsPage</div>;
}

export default ProductsPage;
