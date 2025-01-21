import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiShoppingBag2Line,
  RiUserLine,
  RiUserFill,
  RiUser2Line,
  RiInstanceLine,
  RiLogoutBoxRLine,
} from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/userAction";

function Navbar({ setSearchQuery }) {
  const [hoveredOverHeart, setHoveredOverHeart] = useState(false);
  const [hoveredOverUser, setHoveredOverUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch fetchUser only when the component mounts
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="relative z-[9999] mx-auto w-[100%] h-[4.25rem] border-[1px] border-zinc-400 rounded-[16px] flex items-center justify-between px-6 py-2 mb-6 bg-white">
      {/* Left Section */}
      <Link to={`/`} id="left-section">
        <h2 className='text-2xl font-["Oddval"] tracking-tighter'>PUREM</h2>
        <h2 className='text-2xl font-["Oddval"] tracking-tighter mt-[-11px]'>
          ODA
        </h2>
      </Link>

      {/* Center Section with NavLinks */}
      <div id="center-section" className="flex gap-[2.75rem]">
        {["all", "womens-wear", "mens-wear", "kids", "sale"].map(
          (link, index) => (
            <NavLink
              key={index}
              to={`/products/${link}`}
              className={({ isActive }) =>
                `font-["SourceSans"] font-[600] tracking-tighter uppercase relative group ${
                  isActive ? "border-b-[1px] border-black" : ""
                }`
              }
            >
              {link.replace("-", "")}
              <span className="absolute left-0 bottom-[-1px] w-full h-[1px] bg-[#000] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
          )
        )}
      </div>

      {/* Right Section */}
      <div id="right-section" className="flex gap-2">
        <SearchBar setSearchQuery={setSearchQuery} />
        <Link
          to={"/wishlist"}
          onMouseEnter={() => setHoveredOverHeart(true)}
          onMouseLeave={() => setHoveredOverHeart(false)}
          className="translate-y-1"
        >
          {hoveredOverHeart ? (
            <RiHeart3Fill color={"#DE3163"} size={23} />
          ) : (
            <RiHeart3Line size={23} />
          )}
        </Link>
        <div className="relative translate-y-1">
          <RiShoppingBag2Line size={22} />
          {user.totalCartItems > 0 && (
            <div className="absolute rounded-full w-[0.8rem] h-[.8rem] bg-[#DC5739] flex items-center justify-center right-[-2px] top-[-5px]">
              <span className="inline-block text-[#FFFEFE] text-[.65rem]">
                {user.totalCartItems}
              </span>
            </div>
          )}
        </div>
        <div
          onMouseEnter={() => setHoveredOverUser(true)}
          onMouseLeave={() => setHoveredOverUser(false)}
          className="relative translate-y-1"
        >
          {hoveredOverUser ? (
            <RiUserFill size={23} />
          ) : (
            <RiUserLine size={23} />
          )}
        </div>
      </div>

      <motion.div
        id="user-menu"
        className="absolute right-[1.5%] top-[100%]"
        initial={{ opacity: 0, y: -20 }}
        animate={
          hoveredOverUser
            ? { opacity: 1, y: 0, display: "block" }
            : { opacity: 0, y: -20, display: "none" }
        }
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setHoveredOverUser(true)}
        onMouseLeave={() => setHoveredOverUser(false)}
      >
        <div
          className="w-7 h-7 bg-zinc-100 absolute -top-5 right-[1%]"
          style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        ></div>
        <div className="w-[13rem] bg-zinc-100 absolute right-[1%] top-[100%] rounded-xl p-5 pt-2">
          {!user && (
            <>
              <Link
                to={"/login"}
                className="flex gap-4 hover:-translate-y-1 transition-all duration-[.3s] ease-in-out"
              >
                <RiUser2Line /> Login
              </Link>
              <hr className="border-zinc-400 border-[.7px] my-3" />
            </>
          )}

          <Link
            to={"/login"}
            className="flex gap-4 mt-3 hover:-translate-y-1 transition-all duration-[.3s] ease-in-out"
          >
            <RiInstanceLine /> Orders
          </Link>
          <hr className="border-zinc-400 border-[.7px] my-3" />
          {user && (
            <>
              <Link
                to={"/login"}
                className="flex gap-4 mt-3 hover:-translate-y-1 transition-all duration-[.3s] ease-in-out"
              >
                <RiLogoutBoxRLine /> Logout
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
