import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiShoppingBag2Line,
  RiUserLine,
  RiUserFill,
} from "@remixicon/react";

function Navbar() {
  const [hoveredOverHeart, setHoveredOverHeart] = useState(false);
  const [hoveredOverUser, setHoveredOverUser] = useState(false);

  return (
    <div className="w-full h-[4.25rem] border-[1px] border-zinc-400 rounded-[16px] flex items-center justify-between px-6 py-2 mb-6">
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
        <SearchBar />
        <div
          onMouseEnter={() => setHoveredOverHeart(true)}
          onMouseLeave={() => setHoveredOverHeart(false)}
          className="translate-y-1"
        >
          {hoveredOverHeart ? (
            <RiHeart3Fill color={"#DE3163"} size={23} />
          ) : (
            <RiHeart3Line size={23} />
          )}
        </div>
        <div className="relative translate-y-1">
          <RiShoppingBag2Line size={22} />
          <div className="absolute rounded-full w-[0.8rem] h-[.8rem] bg-[#DC5739] flex items-center justify-center right-[-2px] top-[-5px]">
            <span className="inline-block text-[#FFFEFE] text-[.65rem]">4</span>
          </div>
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
    </div>
  );
}

export default Navbar;
