import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiShoppingBag2Fill,
  RiShoppingBag2Line,
} from "@remixicon/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

function ProductCard({ product }) {
  const [imageNumber, setImageNumber] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
  const [inCart, setInCart] = useState(product.isInCart);
  const [isWishListStatusLoading, setIsWishListStatusLoading] = useState(false);
  const [isCartStatusLoading, setIsCartStatusLoading] = useState(false);

  const addToWishlist = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishListStatusLoading) return;

    setIsWishListStatusLoading(true);

    try {
      if (!isWishlisted) {
        // Adding to wishlist
        setIsWishlisted(true);
        await axios.post("/wishlist/add", { productId: id });
      } else {
        // Removing from wishlist
        setIsWishlisted(false);
        await axios.delete("/wishlist/remove", { data: { productId: id } });
      }
    } catch (error) {
      // Revert changes if an error occurs
      setIsWishlisted((prev) => !prev);
    } finally {
      setIsWishListStatusLoading(false);
    }
  };

  const addToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCartStatusLoading) return;

    setIsCartStatusLoading(true);

    try {
      if (!inCart) {
        // ADding to cart
        setInCart(true);
        await axios.post("/cart/add", { productId: id });
      } else {
        // Removing from cart
        setInCart(false);
        await axios.delete("/cart/remove", { productId: id });
      }
    } catch (error) {
      // Revert changes if an error occurs
      setInCart((prev) => !prev);
    } finally {
      setIsCartStatusLoading(false);
    }
  };
  const navToRight = () => {
    if (imageNumber < product.images.length - 1) {
      setImageNumber(imageNumber + 1);
    }
  };
  const navToLeft = () => {
    if (imageNumber > 0) {
      setImageNumber(imageNumber - 1);
    }
  };

  console.log(product);

  return (
    <Link
      to={`/product/${product._id}`}
      className="rounded-xl w-[20rem] h-[25rem] relative overflow-hidden border-[1px] border-zinc-300 shadow-xl"
    >
      <div id="preview-div" className="w-full h-[80%] relative group">
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
      <div className="px-5 py-2 flex items-start justify-between">
        <div>
          <h2 className="text-2xl z-99 bottom-10 left-5 font-[900]">
            {product.name}
          </h2>
          {product.discount > 0 ? (
            <div className="flex items-center gap-3 text-2xl font-[900] ">
              <span className="custom-line-through text-zinc-400">
                {product.price}
              </span>
              <span>
                {product.price * (1 - product.discount / 100).toFixed(0)}
              </span>
            </div>
          ) : (
            <h3>{product.price}</h3>
          )}
        </div>
        <div className="flex items-center gap-2 translate-y-1">
          <div className="group" onClick={(e) => addToWishlist(e, product._id)}>
            <RiHeart3Fill
              color="#DE3163"
              size={32}
              className={isWishlisted ? "block" : "hidden group-hover:block"}
            />
            <RiHeart3Line
              size={32}
              className={isWishlisted ? "hidden" : "block group-hover:hidden"}
            />
          </div>
          <div className="group" onClick={(e) => addToCart(e, product._id)}>
            <RiShoppingBag2Fill
              className={inCart ? "block" : "hidden group-hover:block"}
              size={32}
            />
            <RiShoppingBag2Line
              className={inCart ? "hidden" : "block group-hover:hidden"}
              size={32}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
