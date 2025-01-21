import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchWishlist();
    } else {
      navigate("/login");
    }
  }, []);
  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(`/wishlist`);
      console.log(data);
      setWishlist(data.wishlist.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/wishlist/remove`, {
        data: { productId },
      });
      setWishlist(wishlist.filter((item) => item._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>loading</div>;
  if (error) return <div className="text-red-600 text-center p-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl mb-8 text-gray-800">
        My Wishlist ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center p-16 text-gray-500">
          <h2 className="text-2xl">Your wishlist is empty</h2>
          <p className="text-lg">
            Add items to your wishlist to save them for later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-200 transform hover:translate-y-[-5px]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-blue-600 font-bold text-lg mb-4">
                  ${product.price}
                </p>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="w-full py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
