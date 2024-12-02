import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productsAction";
import { useParams } from "react-router-dom";
import ProductCard from "../components/partials/ProductCard";

function ProductsPage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  const { products } = useSelector((state) => state.products);
  console.log(products);
  return (
    <div className="">
      <div className="flex flex-wrap h-full w-screen gap-5">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
