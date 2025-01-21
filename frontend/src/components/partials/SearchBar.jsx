import { RiSearchLine } from "@remixicon/react";
import axios from "../../utils/axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadProducts } from "../../redux/reducers/productsSlice";

function SearchBar({ setSearchQuery }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const search = async (searchQuery) => {
    try {
      const response = await axios.get(
        `/products/search?searchQuery=${searchQuery}`
      );
      return response.data.products;
    } catch (error) {
      console.log("Error while searching: ", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      try {
        // Get search results directly
        const results = await search(searchInput);

        // Navigate with fresh results
        navigate("/products/all", {
          state: {
            hasSearched: true,
            searchedProducts: results, // Use direct results instead of state
          },
        });

        setSearchInput("");
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 py-[0.45rem] flex items-center gap-2 bg-[#F4F5F4] rounded-full w-[10rem]"
    >
      <button type="submit" className="cursor-pointer">
        <RiSearchLine
          size={18}
          className={searchInput ? "opacity-100" : "opacity-50"}
        />
      </button>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search"
        className='text-[0.9rem] font-["SourceSans"] bg-transparent border-none outline-none'
      />
    </form>
  );
}

export default SearchBar;
