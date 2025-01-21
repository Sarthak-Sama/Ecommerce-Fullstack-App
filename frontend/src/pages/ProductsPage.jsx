import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productsAction";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/partials/ProductCard";
import { loadProducts } from "../redux/reducers/productsSlice";

function ProductsPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const hasSearched = location.state?.hasSearched;
  const searchedProducts = location.state?.searchedProducts;

  useEffect(() => {
    if (!hasSearched) {
      dispatch(fetchProducts(category));
    } else {
      dispatch(loadProducts(searchedProducts));
    }
  }, [dispatch, category, hasSearched]);

  const { products } = useSelector((state) => state.products);
  return (
    <div className="">
      {products ? (
        <div className="flex flex-wrap sm:justify-start justify-center h-full w-screen gap-5">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default ProductsPage;
