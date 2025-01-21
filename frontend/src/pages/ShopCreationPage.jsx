import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";

function ShopCreationPage() {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`/shop/create-shop`, {
        name: shopName,
        description: shopDescription,
      });
      console.log(response);
      // navigate(`/shop/${shopName}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Shop
            </h2>
            <p className="text-gray-600 mb-8">
              Start your journey as a seller today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shop Name
              </label>
              <input
                id="shopName"
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                          shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition duration-150 ease-in-out"
                placeholder="Enter your shop name"
              />
            </div>
            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shop Description
              </label>
              <input
                id="shopDescription"
                type="text"
                value={shopDescription}
                onChange={(e) => setShopDescription(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                          shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition duration-150 ease-in-out"
                placeholder="Enter your shop description"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent 
                        rounded-lg shadow-sm text-sm font-medium text-white 
                        ${
                          loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        } transition duration-150 ease-in-out`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Shop"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShopCreationPage;
