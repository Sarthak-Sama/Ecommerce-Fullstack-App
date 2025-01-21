import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiShoppingBag2Fill,
  RiShoppingBag2Line,
} from "@remixicon/react";

function ProductDetsPage() {
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState(null);
  const [imageNumber, setImageNumber] = useState(0);
  const navigate = useNavigate();

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data.product);
      console.log(response.data.product);
    } catch (error) {
      console.error("Error while fetching the product:", error);
      navigate("/404");
    }
  };

  const navToRight = () => {
    if (product && imageNumber < product.images.length - 1) {
      setImageNumber((prev) => prev + 1);
    }
  };

  const navToLeft = () => {
    if (product && imageNumber > 0) {
      setImageNumber((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  return (
    <>
      {product ? (
        <>
          <main className="flex gap-10 w-screen">
            {/* Image Carousel */}
            <div
              id="preview-div"
              className="w-[39%] h-[80%] relative group overflow-x-hidden rounded-[1rem]"
            >
              <div
                id="images"
                className="flex transition-all duration-[0.5s] ease-in-out"
                style={{ transform: `translateX(-${imageNumber * 100}%)` }}
              >
                {product.images.map((imgSrc) => (
                  <img
                    src={imgSrc}
                    className="inset-0 w-full h-full object-cover z-9"
                    alt={product.name}
                  />
                ))}
              </div>
              {product.discount > 0 && (
                <div className="bg-[#D2042D] h-12 w-12 mt-2 mr-3 text-sm text-white font-[900] text-['Oddval'] rounded-full flex items-center justify-center absolute top-0 right-0">
                  {product.discount}%
                </div>
              )}
              {imageNumber > 0 && (
                <div
                  id="nav-left-btn"
                  className="absolute top-1/2 ml-2"
                  onClick={navToLeft}
                >
                  <RiArrowLeftSLine size={38} />
                </div>
              )}

              {imageNumber < product.images.length - 1 && (
                <div
                  id="nav-right-btn"
                  className="absolute top-1/2 right-0 mr-2"
                  onClick={navToRight}
                >
                  <RiArrowRightSLine size={38} />
                </div>
              )}
            </div>
            {/* Details Div */}
            <div id="details-div" className="p-4">
              <h1 className="text-5xl font-bold">{product.name}</h1>
              <p className="text-gray-700 mt-10">{product.description}</p>
            </div>
          </main>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}
    </>
  );
}

export default ProductDetsPage;
